import { createSignal } from "solid-js";

export default function register() {
  const [showPassword, setShowPassword] = createSignal(false);
  const togglePassword = () => setShowPassword(!showPassword());
  const handleRegister = () => {};
  return (
    <>
      <div class="min-h-screen flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
          <div class="w-full md:w-1/2 flex items-center justify-center min-h-[300px] md:min-h-[500px] overflow-hidden">
            <img
              src="public/img/login.jpg"
              alt="Login Image"
              class="w-full h-full object-cover"
            />
          </div>

          <div class="w-full md:w-1/2 p-8">
            <div class="flex justify-start mb-8">
              <img src="public/img/logo.png" alt="" class="w-40" />
            </div>

            <h1 class="text-3xl font-bold mb-2">Welcome to KEPO</h1>
            <p class="text-gray-700 mb-6">Register dengan Email dan Password</p>

            <form>
              <div class="mb-4">
                <label for="name" class="block text-gray-700 mb-2">
                  Name:
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    class="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>

              <div class="mb-4">
                <label for="email" class="block text-gray-700 mb-2">
                  Email:
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    class="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>

              <div class="mb-8">
                <label for="password" class="block text-gray-700 mb-2">
                  Password:
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type={showPassword() ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    class="w-full py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <button
                    type="button"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                    on:click={togglePassword}
                  >
                    <svg
                      id="eye-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d={
                          showPassword()
                            ? "M4.318 4.318a1 1 0 011.414 0L10 8.586l4.268-4.268a1 1 0 111.464 1.364l-4.268 4.268 4.268 4.268a1 1 0 01-1.464 1.364L10 11.414l-4.268 4.268a1 1 0 01-1.464-1.364l4.268-4.268-4.268-4.268a1 1 0 010-1.414z"
                            : "M10 3C5 3 1 10 1 10s4 7 9 7 9-7 9-7-4-7-9-7zm0 12a5 5 0 110-10 5 5 0 010 10z"
                        }
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                class="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-4 rounded-lg transition duration-300"
                on:click={handleRegister}
              >
                REGISTER
              </button>

              <div class="my-6 flex items-center justify-center">
                <span class="border-t border-gray-300 flex-grow mr-3"></span>
                <span class="text-gray-500">OR</span>
                <span class="border-t border-gray-300 flex-grow ml-3"></span>
              </div>

              <button
                type="button"
                class="w-full border border-gray-300 flex items-center justify-center py-3 px-4 rounded-lg hover:bg-gray-50 transition duration-300"
              >
                <img
                  src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
                  alt="Google logo"
                  class="w-5 h-5 mr-2"
                />
                <span>Register with Google account</span>
              </button>
            </form>

            <div class="mt-6 text-center">
              <p class="text-gray-700">
                Sudah memiliki akun?
                <a
                  href="/login"
                  class="text-black font-semibold hover:underline"
                >
                  Login ke KEPO
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
