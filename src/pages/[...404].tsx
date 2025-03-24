import { A } from "@solidjs/router";

export default function notFound() {
  return(
    <>
    <div class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p class="mt-2 text-gray-600">Halaman yang lu cari nggak ada, bro! 😵</p>
      <A href="/" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Balik ke Home
      </A>
    </div>
    </>
  )
}