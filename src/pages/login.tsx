import { createSignal } from "solid-js";
import Cookies from "js-cookie";
import { useNavigate } from "@solidjs/router";
export default function login() {const [email, setEmail] = createSignal<string>("");
  const [password, setPassword] = createSignal<string>("");
  const [showPassword, setShowPassword] = createSignal<boolean>(false);
  const [loading, setLoading] = createSignal<boolean>(false);
  const [error, setError] = createSignal<string>("");
  const navigate=useNavigate();
  
  const togglePassword = () => setShowPassword(prev => !prev);
  
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email(), password: password() }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
  
      const data = await response.json();
      Cookies.set("token", data.data.token, { expires: 3 });
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <div class="min-h-screen flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
          <div class="w-full md:w-1/2 flex items-center justify-center overflow-hidden">
            <img
              src="public/img/login.jpg"
              alt="Login Image"
              class="w-full h-full object-cover"
              width={"55"}
            />
          </div>

          <div class="w-full md:w-1/2 p-8">
            <div class="flex justify-start mb-8">
                <img src="public/img/logo.png" alt=""  class="w-40"/>
            </div>

            <h1 class="text-3xl font-bold mb-2">Welcome to KEPO</h1>
            <p class="text-gray-700 mb-6">Masuk dengan Email dan Password</p>

            <form on:submit={handleSubmit}>
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
                    on:input={(e: Event) => setEmail((e.target as HTMLInputElement).value)}
                  />
                </div>
              </div>

              <div class="mb-4">
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
                    type={showPassword()? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    class="w-full py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    on:input={(e: Event) => setPassword((e.target as HTMLInputElement).value)}
                    // value={password()}
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
                      <path d={showPassword() ? "M4.318 4.318a1 1 0 011.414 0L10 8.586l4.268-4.268a1 1 0 111.464 1.364l-4.268 4.268 4.268 4.268a1 1 0 01-1.464 1.364L10 11.414l-4.268 4.268a1 1 0 01-1.464-1.364l4.268-4.268-4.268-4.268a1 1 0 010-1.414z" : "M10 3C5 3 1 10 1 10s4 7 9 7 9-7 9-7-4-7-9-7zm0 12a5 5 0 110-10 5 5 0 010 10z"} />
                    </svg>
                  </button>
                </div>
              </div>
              <p class="text-red-600">{error()}</p>

              <div class="mb-6 text-right">
                <a href="#" class="text-black hover:underline text-sm">
                  Lupa Password?
                </a>
              </div>

              <button
                type="submit"
                class="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-4 rounded-lg transition duration-300"
              >
                LOG IN
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
                <span>Enter with Google account</span>
              </button>
            </form>

            <div class="mt-6 text-center">
              <p class="text-gray-700">
                Belum memiliki akun? 
                <a
                  href="/register"
                  class="text-black font-semibold hover:underline"
                >
                  Registrasi ke KEPO
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
