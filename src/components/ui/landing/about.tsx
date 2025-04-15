import React from "react";
import image1 from "@public/img/landing/image1.png";
import image2 from "@public/img/landing/image2.png";
import image3 from "@public/img/landing/image3.png";

const data = [
  {
    title: "Analisis Pengeluaran",
    description: "menggunakan grafik & laporan bulanan, serta prediksi untuk bulan depan.",
    img: image1,
  },
  {
    title: "Penatatan Transaksi",
    description: "menggunakan fitur scan OCR yang dapat secara otomatis mencatat transaksi.",
    img: image2,
  },
  {
    title: "Edukasi Finansial",
    description: "menghadirkan konten edukatif, tips, dan kuis harian interaktif terkait pengelolaan uang.",
    img: image3,
  },
];

export default function About() {
  return (
    <div className="mt-14">
      <section className="max-w-6xl mx-auto px-4 py-16" id="about">
        <h2 className="text-4xl font-superbold text-center mb-6 font-Nunito">
          Mengapa Harus Menggunakan KEPO?
        </h2>

        <p className="text-center max-w-3xl mx-auto mb-16 text-gray-700">
          Karena website kami dilengkapi dengan fitur-fitur yang dirancang
          khusus untuk membantu anak muda menabung dengan lebih efektif dan
          terencana.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-6">
                <img src={item.img.src} alt="Koin" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-700 text-lg">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
