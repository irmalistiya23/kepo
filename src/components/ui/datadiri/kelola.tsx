import { createSignal } from "solid-js";

export default function Kelola() {
  const [anggaran, setAnggaran] = createSignal("");
  const [anggaranError, setAnggaranError] = createSignal("");

  const [pengeluaran, setPengeluaran] = createSignal("");
  const [pengeluaranError, setPengeluaranError] = createSignal("");

  const handleAnggaranInput = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;
    setAnggaran(val);
    if (val !== "" && isNaN(Number(val))) {
      setAnggaranError("Input harus berupa angka!");
    } else {
      setAnggaranError("");
    }
  };

  const handlePengeluaranInput = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;
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
      <div class="mb-4">
        <label for="anggaran" class="block text-lg font-semibold mb-1">
          Total anggaran:
        </label>
        <input
          type="text"
          name="anggaran"
          id="anggaran"
          value={anggaran()}
          onInput={handleAnggaranInput}
          placeholder="Masukkan Total anggaran"
          class={`w-full px-4 py-3 border ${
            anggaranError() ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 ${
            anggaranError() ? "focus:ring-red-500" : "focus:ring-yellow-500"
          }`}
        />
        {anggaranError() && (
          <p class="text-red-500 text-sm mt-1">{anggaranError()}</p>
        )}
      </div>

      {/* Input Kategori */}
      <div class="mb-4">
        <label for="kategori" class="block text-lg font-semibold mb-1">
          Kategori anggaran:
        </label>
        <input
          type="text"
          name="kategori"
          id="kategori"
          placeholder="Masukkan Kategori anggaran"
          class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Input Pengeluaran */}
      <div class="mb-4">
        <label for="pengeluaran" class="block text-lg font-semibold mb-1">
          Batas pengeluaran:
        </label>
        <input
          type="text"
          name="pengeluaran"
          id="pengeluaran"
          value={pengeluaran()}
          onInput={handlePengeluaranInput}
          placeholder="Masukkan Batas pengeluaran"
          class={`w-full px-4 py-3 border ${
            pengeluaranError() ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 ${
            pengeluaranError() ? "focus:ring-red-500" : "focus:ring-yellow-500"
          }`}
        />
        {pengeluaranError() && (
          <p class="text-red-500 text-sm mt-1">{pengeluaranError()}</p>
        )}
      </div>
    </>
  );
}
