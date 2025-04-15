import { useState } from "react";

export default function Kelola() {
  const [anggaran, setAnggaran] = useState("");
  const [anggaranError, setAnggaranError] = useState("");

  const [pengeluaran, setPengeluaran] = useState("");
  const [pengeluaranError, setPengeluaranError] = useState("");

  const handleAnggaranInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAnggaran(val);

    if (val !== "" && isNaN(Number(val))) {
      setAnggaranError("Input harus berupa angka!");
    } else {
      setAnggaranError("");
    }
  };

  const handlePengeluaranInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPengeluaran(val);

    if (val !== "" && isNaN(Number(val))) {
      setPengeluaranError("Input harus berupa angka!");
    } else {
      setPengeluaranError("");
    }
  };

  return (
    <>
      {/* Input Anggaran */}
      <div className="mb-4">
        <label htmlFor="anggaran" className="block text-lg font-semibold mb-1">
          Total anggaran:
        </label>
        <input
          type="text"
          name="anggaran"
          id="anggaran"
          value={anggaran}
          onChange={handleAnggaranInput}
          placeholder="Masukkan Total anggaran"
          className={`w-full px-4 py-3 border ${
            anggaranError ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 ${
            anggaranError ? "focus:ring-red-500" : "focus:ring-yellow-500"
          }`}
        />
        {anggaranError && (
          <p className="text-red-500 text-sm mt-1">{anggaranError}</p>
        )}
      </div>

      {/* Input Kategori */}
      <div className="mb-4">
        <label htmlFor="kategori" className="block text-lg font-semibold mb-1">
          Kategori anggaran:
        </label>
        <input
          type="text"
          name="kategori"
          id="kategori"
          placeholder="Masukkan Kategori anggaran"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Input Pengeluaran */}
      <div className="mb-4">
        <label htmlFor="pengeluaran" className="block text-lg font-semibold mb-1">
          Batas pengeluaran:
        </label>
        <input
          type="text"
          name="pengeluaran"
          id="pengeluaran"
          value={pengeluaran}
          onChange={handlePengeluaranInput}
          placeholder="Masukkan Batas pengeluaran"
          className={`w-full px-4 py-3 border ${
            pengeluaranError ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 ${
            pengeluaranError ? "focus:ring-red-500" : "focus:ring-yellow-500"
          }`}
        />
        {pengeluaranError && (
          <p className="text-red-500 text-sm mt-1">{pengeluaranError}</p>
        )}
      </div>
    </>
  );
}
