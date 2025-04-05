import { For } from "solid-js"

const data = [
  {
    title: "Analisis Pengeluaran",
    description: "menggunakan grafik & laporan bulanan, serta prediksi untuk bulan depan.",
    img : "public/img/landing/image1.png"
  },
  {
    title: "Penatatan Transaksi",
    description: "menggunakan fitur scan OCR yang dapat secara otomatis mencatat transaksi.",
    img : "public/img/landing/image2.png"
  },
  {
    title: "Edukasi Finansial",
    description: "menghadirkan konten edukatif, tips, dan kuis harian interaktif terkait pengelolaan uang.",
    img : "public/img/landing/image3.png"
  }
]

export default function about() {
  return (
    <>
    <div class="mt-14">
      <section class="max-w-6xl mx-auto px-4 py-16" id="about">
        <h2 class="text-4xl font-superbold text-center mb-6 font-Nunito">
          Mengapa Harus Menggunakan KEPO?
        </h2>

        <p class="text-center max-w-3xl mx-auto mb-16 text-gray-700">
          Karena website kami dilengkapi dengan fitur-fitur yang dirancang
          khusus untuk membantu anak muda menabung dengan lebih efektif dan
          terencana.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <For each={data}>{(item) => 
            <div class="flex flex-col items-center text-center">
            <div class="w-24 h-24 mb-6">
              <img src={item.img} alt="Koin" class="w-full h-full object-contain" />
            </div>
            <h3 class="text-2xl font-bold mb-3">{item.title}</h3>
            <p class="text-gray-700 text-lg">
              {item.description}
            </p>
          </div>
            }
          </For>
        </div>
      </section>
    </div>
    </>
  );
}
