from flask import Flask, render_template, request, redirect, url_for
import os
import cv2
import pytesseract
import numpy as np
from transformers import pipeline
import requests

app = Flask(_name_)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.static_folder = 'static'

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
def run_script():
    try:
        image_path = "uploads/struk.jpg"
        image = cv2.imread(image_path)
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        kernel = np.ones((5, 5), dtype=int)
        image = cv2.erode(image, kernel, iterations=1)
        image = cv2.dilate(image, kernel, iterations=1)
        image = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
        image = cv2.bitwise_not(image)

        text = pytesseract.image_to_string(image, lang='eng+ind')

        return render_template('web.html', output=text)
    except Exception as e:
        return render_template('web.html', output=f"Error: {str(e)}")

@app.route('/summ', methods=["POST"])
def summarize():
    try:
        image_path = "uploads/upload.jpg"
        image = cv2.imread(image_path)
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        kernel = np.ones((5, 5), dtype=int)
        image = cv2.erode(image, kernel, iterations=1)
        image = cv2.dilate(image, kernel, iterations=1)
        image = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
        image = cv2.bitwise_not(image)

        text = pytesseract.image_to_string(image, lang='eng+ind')

        # Kirim teks ke API eksternal
        api_url = "https://kepo-backend-production-353b.up.railway.app"
        response = requests.post(api_url, json={"text": text})

        if response.status_code == 200:
            result = response.json()
            # Misalnya API mengembalikan {"summary": "..."}
            summary_text = result.get("summary", "No summary returned.")
        else:
            summary_text = f"API Error: {response.status_code}"

        return render_template('web.html', summary=summary_text)
    except Exception as e:
        return render_template('web.html', summary=f"Error: {str(e)}")

if _name_ == '_main_':
    app.run(debug=True)