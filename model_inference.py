import joblib

# Buka file otak & cara bacanya
model = joblib.load("model_kategori.pkl")
vectorizer = joblib.load("vectorizer.pkl")

def klasifikasi_kategori(nama_item):
    X = vectorizer.transform([nama_item])
    pred = model.predict(X)
    return pred[0]
