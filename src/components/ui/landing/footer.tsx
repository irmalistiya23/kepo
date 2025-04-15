export default () => {
  return(
    <footer className="bg-gray-800 py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">

          <div className="text-center md:text-left">
            <img src="/img/logo.png" alt="Logo" className="w-32 sm:w-48" />
            <p className="text-gray-400 mt-4">
            <span className="font-bold">KEPO </span>Kelola Uangmu, <br />
            Wujudkan Impianmu!
            </p>
          </div>

          <div>
            <h6 className="text-amber-500 text-2xl font-bold mb-4">About</h6>
            <ul>
              <li>
                <a href="#" className="my-2 block text-gray-400 hover:text-white">-------</a>
              </li>
              <li>
                <a href="#" className="my-2 block text-gray-400 hover:text-white">-------</a>
              </li>
            </ul>

          </div>

          <div>
          <h6 className="text-amber-500 text-2xl font-bold mb-4">Contact Us</h6>
            <ul>
              <li>
                <span className="my-2 block text-gray-400 hover:text-white">INDONESIA</span>
              </li>
              <li>
                <span  className="my-2 block text-gray-400 hover:text-white">8003010108</span>
              </li>
              <li>
                <span  className="my-2 block text-gray-400 hover:text-white">kepo@gmail.com</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl">
            <form action="" className="flex flex-col md:flex-row items-center p-2"> 
              <input type="text" className="text-sm w-full px-3 py-2 border-b-2 border-white bg-white focus:outline-none placeholder:text-gray-800" placeholder="Your email address"/>
              <div className="relative">
              <button className="absolute bg-black text-black text-sm w-40 font-bold py-2 px-2 rounded-lg transform translate-x-1 translate-y-1" disabled>Send Email</button>
              <button className="relative bg-[#FFB22C] text-black text-sm w-40 font-bold py-2 px-2 rounded-lg transition duration-300 ">Send Email</button>
              </div>
            </form>
          </div>

          </div>
        <hr />
        <div className="flex justify-center items-center mt-5">
          <p className="text-gray-400">copyright @ 2025 KEPO. All right reserved</p>
        </div>

      </div>
    </footer>
  )
}