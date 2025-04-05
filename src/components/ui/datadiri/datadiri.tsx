import { createSignal } from "solid-js";

export default function Datadiri() {
  const [penghasilan, setPenghasilan] = createSignal("");
  const [penghasilanError, setPenghasilanError] = createSignal("");

  const handlePenghasilanInput = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;
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
      <div class="mb-4">
        <label for="nama" class="block text-lg font-semibold mb-1">
          Nama:
        </label>
        <input
          type="text"
          name="nama"
          placeholder="Masukkan nama"
          class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Email */}
      <div class="mb-4">
        <label for="email" class="block text-lg font-semibold mb-1">
          Email:
        </label>
        <input
          type="email"
          name="email"
          placeholder="Masukkan email"
          class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Penghasilan Bulanan */}
      <div class="mb-4">
        <label for="penghasilan" class="block text-lg font-semibold mb-1">
          Penghasilan Bulanan:
        </label>
        <input
          type="text"
          name="penghasilan"
          value={penghasilan()}
          onInput={handlePenghasilanInput}
          placeholder="Masukkan penghasilan bulanan"
          class={`w-full px-4 py-3 border ${
            penghasilanError() ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 ${
            penghasilanError() ? "focus:ring-red-500" : "focus:ring-yellow-500"
          }`}
        />
        {penghasilanError() && (
          <p class="text-red-500 text-sm mt-1">{penghasilanError()}</p>
        )}
      </div>

      {/* Sumber Penghasilan */}
      <div class="mb-8">
        <label for="sumber" class="block text-lg font-semibold mb-1">
          Sumber Penghasilan:
        </label>
        <input
          type="text"
          name="sumber"
          placeholder="Masukkan sumber penghasilan"
          class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>
    </>
  );
}
