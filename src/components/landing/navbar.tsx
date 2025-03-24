// Navbar.tsx
import { createSignal, onMount, onCleanup } from "solid-js";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);
  let navbarRef: HTMLElement | undefined;

  const toggleMenu = (e: MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen());
  };

  const closeMenu = (e: MouseEvent) => {
    if (navbarRef && !navbarRef.contains(e.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  onMount(() => {
    document.addEventListener("click", closeMenu);

    onCleanup(() => {
      document.removeEventListener("click", closeMenu);
    });
  });

  return (
    <nav ref={navbarRef} class="fixed left-0 w-full z-50 top-0">
      <div class="container mx-auto px-2 sm:px-4 backdrop-blur-md bg-white/15 shadow-md rounded-b-2xl">
        <div class="hidden md:flex items-center justify-between">
          <div class="flex-shrink-0">
            <img src="/img/logo.png" alt="Logo" class="w-32 sm:w-48" />
          </div>

          <div class="flex justify-center space-x-4 lg:space-x-10 mx-auto">
            <a
              href="#hero"
              class="hover:bg-yellow-400 text-black px-4 sm:px-6 lg:px-8 py-2 lg:py-3 rounded-full font-bold text-sm lg:text-base"
            >
              HOME
            </a>
            <a
              href="#about"
              class="hover:bg-yellow-400 text-black px-4 sm:px-6 lg:px-8 py-2 lg:py-3 rounded-full font-bold text-sm lg:text-base"
            >
              ABOUT
            </a>
            <a
              href="#contact"
              class="hover:bg-yellow-400 text-black px-4 sm:px-6 lg:px-8 py-2 lg:py-3 rounded-full font-bold text-sm lg:text-base"
            >
              CONTACT
            </a>
          </div>

          <div class="relative">
            <div class="absolute h-10 w-28 sm:w-40 bg-black flex justify-center items-center rounded-full border-2 border-black text-black transform translate-x-1 translate-y-1">
              <p>Login</p>
            </div>
            <a href="/login">
            <button class="relative h-10 w-28 sm:w-40 bg-yellow-400 flex justify-center items-center rounded-full border-2 border-black text-black active:transform active:translate-x-1 active:translate-y-1">
              <p>Login</p>
            </button>
            </a>
          </div>
        </div>

        <div class="md:hidden">
          <div
            class={`flex items-center justify-between pt-10 ${
              isMenuOpen() ? "bg-white" : ""
            }`}
          >
            <img src="/img/logo.png" alt="Logo" class="w-32" />

            <button on:click={toggleMenu} class="text-black focus:outline-none">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>

          <div
            class={`py-4 ${
              isMenuOpen() ? "" : "hidden"
            } bg-white rounded-b-2xl shadow-md px-10`}
            on:click={(e) => e.stopPropagation()}
          >
            <div class="flex flex-col space-y-3">
              <a
                href="#hero"
                class="hover:bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-center"
              >
                HOME
              </a>
              <a
                href="#about"
                class="hover:bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-center"
              >
                ABOUT
              </a>
              <a
                href="#contact"
                class="hover:bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-center"
              >
                CONTACT
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
