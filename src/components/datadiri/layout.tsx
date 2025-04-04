import logo from "@public/img/logo.png";
import main from "@public/img/datadiri/Group249.png";
import coin from "@public/img/datadiri/gambarkoin.png";
import { Switch, Match } from "solid-js";

export default (props:{
  children:Element|any,
  type: "datadiri"|"kelola",
  onSubmit: (e:Event) => void
}) => {
  return (
    <>
      <div class="container mx-auto px-4 relative overflow-hidden">
        <div class="flex justify-between items-center relative z-10">
          <img src={logo} alt="logo" class="w-56" />

          <div class="space-x-4 md:space-x-8 hidden sm:flex">
            <div class="flex items-center">
              <div class={`${(props.type === "datadiri") ? "bg-[#FFB22C]":"bg-gray-200"} w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-black font-bold`}>
                1
              </div>
              <span class="ml-2 text-xs md:text-sm">Data Diri</span>
            </div>
            <div class="flex items-center">
              <div class={`${(props.type === "datadiri") ? "bg-gray-200": (props.type === "kelola") ? "bg-[#FFB22C]":"bg-gray-200"} w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-black font-bold`}>
                2
              </div>
              <span class="ml-2 text-xs md:text-sm">Anggaran</span>
            </div>
          </div>
        </div>

        <div class="pt-6 pb-10 flex ">
          <section class="w-full">
            <h1 class="text-4xl md:text-6xl font-bold mb-6">
              {(props.type === "datadiri") ? "Buat Profil Keuangan" : (props.type === "kelola") ? "Kelola Anggaran dengan Bijak" : ""}
            </h1>
            <form action="" id="fr">
            {props.children}
            </form>
          </section>
          <section>
            <img src={main} alt="" class="mt-6 hidden md:block" />
          </section>
        </div>
      </div>
      <div class="flex justify-between">
        <div class="h-10 w-10">
        <img src={coin} alt="" class="scale-150" />
        </div>
        <button
          type="submit"
          class="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-2 rounded-full transition duration-300 h-10 mr-6"
          form="fr"
          onClick={(e) => {
            e.preventDefault();
            props.onSubmit(e);
          }}
        >
          {(props.type === "datadiri") ? "Berikutnya" : (props.type === "kelola") ? "Selesai" : ""}
        </button>
      </div>
    </>
  );
};
