from flask import Flask, render_template, request
import cv2
import pytesseract
import numpy as np
import os
import re

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    return render_template('upload.html')

@app.route('/u', methods=["POST"])
def upload():
    if 'image' not in request.files:
        return render_template('upload.html', summary="❌ Tidak ada file gambar.")

    file = request.files['image']
    if file.filename == '':
        return render_template('upload.html', summary="❌ Nama file kosong.")

    filepath = os.path.join(app.config['UPLOAD_FOLDER'], 'struk.jpg')
    file.save(filepath)
    return render_template('upload.html', summary="✅ Gambar berhasil di-upload.")

@app.route('/r', methods=["POST"])
def run_script():
    return render_template('upload.html', summary="✅ Python script dijalankan (dummy).")

@app.route('/sum', methods=["POST"])
def summarize():
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], 'struk.jpg')
    image = cv2.imread(image_path)
    
    if image is None:
        return render_template('upload.html', summary="❌ Gagal membaca gambar.")

    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    kernel = np.ones((5, 5), dtype=int)
    image = cv2.erode(image, kernel, iterations=1)
    image = cv2.dilate(image, kernel, iterations=1)
    image = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
    image = cv2.bitwise_not(image)

    text = pytesseract.image_to_string(image, lang='eng+ind')

    match = re.search(r'Total\s*[:\-]?\s*Rp[^\d]*(\d+[.,]?\d*)', text, re.IGNORECASE)
    if match:
        total = match.group(1).replace(".", "").replace(",", "")
        summary = f"Pengeluaranmu sebesar Rp {int(total):,}".replace(",", ".")
    else:
        summary = "❌ Total pengeluaran tidak ditemukan."

    return render_template('upload.html', summary=summary)

if __name__ == '__main__':
    app.run(debug=True)
