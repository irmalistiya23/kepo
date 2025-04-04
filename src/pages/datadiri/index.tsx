import Layout from "@/components/datadiri/layout.tsx";

export default () => {
  return (
    <>
      <Layout
        type="datadiri"
        onSubmit={(e) => {
          e.preventDefault();
          
          const form = document.getElementById("fr") as HTMLFormElement;
          
          if (!form) {
            console.error("Form tidak ditemukan!");
            return;
          }
        
          const formdata = new FormData(form);
          const data = Object.fromEntries(formdata.entries());
        
          console.log("Data Form:", data);
        }}
        
      >
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

        <div class="mb-4">
          <label for="penghasilan" class="block text-lg font-semibold mb-1">
            Penghasilan Bulanan:
          </label>
          <input
            type="text"
            name="penghasilan"
            placeholder="Masukkan penghasilan bulanan"
            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

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
      </Layout>
    </>
  );
};
