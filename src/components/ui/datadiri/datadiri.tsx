import { useState } from "react";

export default function Datadiri() {
  const [penghasilan, setPenghasilan] = useState("");
  const [penghasilanError, setPenghasilanError] = useState("");

  const handlePenghasilanInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPenghasilan(val);

    if (val !== "" && isNaN(Number(val))) {
      setPenghasilanError("Penghasilan harus berupa angka!");
    } else {
      setPenghasilanError("");
    }
  };

  return (
    <>
      {/* Nama */}
      <div className="mb-4">
        <label htmlFor="nama" className="block text-lg font-semibold mb-1">
          Nama:
        </label>
        <input
          type="text"
          name="nama"
          placeholder="Masukkan nama"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-lg font-semibold mb-1">
          Email:
        </label>
        <input
          type="email"
          name="email"
          placeholder="Masukkan email"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Penghasilan Bulanan */}
      <div className="mb-4">
        <label htmlFor="penghasilan" className="block text-lg font-semibold mb-1">
          Penghasilan Bulanan:
        </label>
        <input
          type="text"
          name="penghasilan"
          value={penghasilan}
          onChange={handlePenghasilanInput}
          placeholder="Masukkan penghasilan bulanan"
          className={`w-full px-4 py-3 border ${
            penghasilanError ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 ${
            penghasilanError ? "focus:ring-red-500" : "focus:ring-yellow-500"
          }`}
        />
        {penghasilanError && (
          <p className="text-red-500 text-sm mt-1">{penghasilanError}</p>
        )}
      </div>

      {/* Sumber Penghasilan */}
      <div className="mb-8">
        <label htmlFor="sumber" className="block text-lg font-semibold mb-1">
          Sumber Penghasilan:
        </label>
        <input
          type="text"
          name="sumber"
          placeholder="Masukkan sumber penghasilan"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>
    </>
  );
}
