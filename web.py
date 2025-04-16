from flask import Flask, render_template, request, redirect, url_for
import os
import cv2
import pytesseract
import numpy as np
import pickle

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.static_folder = 'static'

# Load model dan vectorizer sekali di awal
with open("model.pkl", "rb") as f:
    model_data = pickle.load(f)
model = model_data["model"]
vectorizer = model_data["vectorizer"]

def predict_category(text):
    X = vectorizer.transform([text])
    prediction = model.predict(X)
    return prediction[0]

@app.route('/upload')
def index():
    return render_template('web.html')

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' in request.files:
        image = request.files['image']
        if image.filename != '':
            image_name = 'struk.jpg'  
            image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
            image.save(image_path)
            message = "Uploaded Successfully"
            return render_template('web.html', message=message)
    return redirect(url_for("index"))

@app.route('/', methods=['POST'])
def run_ocr_and_classify():
    try:
        image_path = "uploads/struk.jpg"
        image = cv2.imread(image_path)
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        kernel = np.ones((5, 5), dtype=int)
        image = cv2.erode(gray_image, kernel, iterations=1)
        image = cv2.dilate(image, kernel, iterations=1)
        image = cv2.threshold(image, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
        image = cv2.bitwise_not(image)

        text = pytesseract.image_to_string(image, lang='eng+ind')
        predicted_category = predict_category(text)

        return render_template('web.html', output=text, category=predicted_category)
    except Exception as e:
        return render_template('web.html', output=f"Error: {str(e)}")

if __name__ == '__main__':
    app.run()
