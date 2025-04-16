import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
import joblib

# Contoh data pelatihan kategori
training_data = [
    ("kopi kapal api", "Minuman"),
    ("mie ayam jumbo", "Makanan"),
    ("ayam geprek pedas", "Makanan"),
    ("teh kotak", "Minuman"),
    ("Fruit Tea Apple", "Minuman"),
    ("Indomie Goreng", "Makanan"),
    ("paket indihome", "Internet"),
    ("xl kuota bulanan", "Internet"),
    ("aqua botol 600ml", "Minuman"),
    ("nasi padang rendang", "Makanan")
    ("Belfood Sosis Bakar", "Makanan")
]

# Ubah ke DataFrame
texts, labels = zip(*training_data)
df = pd.DataFrame({"text": texts, "label": labels})

# Buat pipeline: CountVectorizer + Naive Bayes
model = make_pipeline(CountVectorizer(), MultinomialNB())
model.fit(df["text"], df["label"])

# Simpan model ke file
joblib.dump(model, "model.pkl")

print("✅ Model berhasil dilatih dan disimpan sebagai model.pkl")
