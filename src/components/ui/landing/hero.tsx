import image from "@public/img/landing/image-Photoroom.png"

export default function hero() {
  return(
    <>
        <section className="container mx-auto px-6 py-12" id="hero">
        <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-5xl font-superbold leading-tight mb-6 font-Nunito">
                    <span className="text-yellow-400">Kontrol</span> Ekonomi
                    <br/>Pribadi Online
                </h1>
                <p className="text-lg mb-8">
                    Keuangan yang sehat, hidup lebih tenang. Yuk, mulai
                    <br/>atur ekonomimu dengan lebih mudah!
                </p>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-full transition duration-300">
                    Mulai Menabung!
                </button>
            </div>
            <div className="md:w-1/2">
                <img src={image.src} alt="Financial App Illustration" className="w-full"/>
            </div>
        </div>
    </section>
    </>
  )
}