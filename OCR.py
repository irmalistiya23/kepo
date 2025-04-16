import cv2
import pytesseract
import numpy as np
from model_inference import klasifikasi_kategori 

image_path = 'test.jpeg'

image = cv2.imread(image_path)
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

kernel = np.ones((5,5), dtype=int)
image = cv2.erode(image, kernel, iterations=1)
image = cv2.dilate(image, kernel, iterations=1)
image = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
image = cv2.bitwise_not(image)

cv2.imshow('test', image)
cv2.waitKey(0)

text = pytesseract.image_to_string(image, lang='eng+ind', config=f"--oem 1 --psm 11")
print("=== HASIL OCR ===")
print(text)

print("\n=== HASIL KATEGORI ITEM ===")
lines = text.split('\n')

for line in lines:
    line = line.strip()
    if len(line) > 3 and any(char.isalpha() for char in line):
        kategori = klasifikasi_kategori(line)
        print(f"{line} → {kategori}")
