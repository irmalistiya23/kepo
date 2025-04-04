import Layout from "@/components/datadiri/layoutMaster.tsx";
import { createSignal } from "solid-js";

type PageType = "datadiri" | "kelola";

interface FormResult {
  [key: string]: FormDataEntryValue; // string | File
}

export default () => {
  const [type, setType] = createSignal<PageType>("datadiri");
  const [formData, setFormData] = createSignal<FormResult[]>([]);

  return (
    <>
      <Layout
        type={type()}
        onSubmit={(e: Event) => {
          e.preventDefault();
          const form = document.getElementById("fr") as HTMLFormElement;

          if (!form) {
            console.error("Form tidak ditemukan!");
            return;
          }

          const formdata = new FormData(form);
          const entries = Object.fromEntries(formdata.entries());

          // Optional: casting as FormResult
          const data = entries as FormResult;

          setFormData((prev) => [...prev, data]);
          console.log("Data baru:", formData());

          // Pindah step
          type() === "datadiri" ? setType("kelola") : setType("datadiri");
        }}
      />
    </>
  );
};
