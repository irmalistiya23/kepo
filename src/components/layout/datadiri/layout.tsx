"use client";

import Image from "next/image";
import { ReactNode } from "react";
import Datadiri from "@/components/ui/datadiri/datadiri";
import Kelola from "@/components/ui/datadiri/kelola";

interface LayoutProps {
  children?: ReactNode;
  type: "datadiri" | "kelola";
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Layout(props: LayoutProps) {
  return (
    <>
      <div className="container mx-auto px-4 relative overflow-hidden">
        <div className="flex justify-between items-center relative z-10">
          <Image src="/img/logo.png" alt="logo" width={224} height={64} />

          <div className="space-x-4 md:space-x-8 hidden sm:flex">
            <div className="flex items-center">
              <div
                className={`${
                  props.type === "datadiri" ? "bg-[#FFB22C]" : "bg-gray-200"
                } w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-black font-bold`}
              >
                1
              </div>
              <span className="ml-2 text-xs md:text-sm">Data Diri</span>
            </div>
            <div className="flex items-center">
              <div
                className={`${
                  props.type === "kelola" ? "bg-[#FFB22C]" : "bg-gray-200"
                } w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-black font-bold`}
              >
                2
              </div>
              <span className="ml-2 text-xs md:text-sm">Anggaran</span>
            </div>
          </div>
        </div>

        <div className="pt-6 pb-10 flex flex-col md:flex-row">
          <section className="w-full">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {props.type === "datadiri"
                ? "Buat Profil Keuangan"
                : "Kelola Anggaran dengan Bijak"}
            </h1>

            <form id="fr" onSubmit={props.onSubmit}>
              {props.type === "datadiri" ? <Datadiri /> : <Kelola />}
            </form>
          </section>

          <section>
            <Image
              src="/img/datadiri/Group249.png"
              alt="Illustration"
              width={400}
              height={400}
              className="mt-6 hidden md:block"
            />
          </section>
        </div>
      </div>

      <div className="flex justify-between items-center px-4">
        <div className="h-10 w-10">
          <Image
            src="/img/datadiri/gambarkoin.png"
            alt="coin"
            width={40}
            height={40}
            className="scale-150"
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-2 rounded-full transition duration-300 h-10"
          form="fr"
        >
          {props.type === "datadiri" ? "Berikutnya" : "Selesai"}
        </button>
      </div>
    </>
  );
}
