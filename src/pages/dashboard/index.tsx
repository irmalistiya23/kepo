import { createSignal } from 'solid-js';

export default function Home() {
  const [count, setCount] = createSignal(0);

  return (
<>
<div class='container mx-auto flex justify-center items-center h-screen'>
  <h1 class="text-2xl font-bold">Hello World</h1>
</div>
</>
  );
}
