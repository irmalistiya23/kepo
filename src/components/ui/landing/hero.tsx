export default function hero() {
  return(
    <>
        <section class="container mx-auto px-6 py-12" id="hero">
        <div class="flex flex-col md:flex-row items-center">
            <div class="md:w-1/2 mb-10 md:mb-0">
                <h1 class="text-5xl font-superbold leading-tight mb-6 font-Nunito">
                    <span class="text-yellow-400">Kontrol</span> Ekonomi
                    <br/>Pribadi Online
                </h1>
                <p class="text-lg mb-8">
                    Keuangan yang sehat, hidup lebih tenang. Yuk, mulai
                    <br/>atur ekonomimu dengan lebih mudah!
                </p>
                <button class="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-full transition duration-300">
                    Mulai Menabung!
                </button>
            </div>
            <div class="md:w-1/2">
                <img src="public/img/landing/image-Photoroom.png" alt="Financial App Illustration" class="w-full"/>
            </div>
        </div>
    </section>
    </>
  )
}