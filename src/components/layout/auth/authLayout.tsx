import loginImg from "@public/img/login.jpg";
import logo from "@public/img/logo.png";
import { A } from "@solidjs/router";
import githubLogo from "@public/svg/github-mark.svg"
type AuthAction = "login" | "register";

const isAuthAction = (props: { type: AuthAction }) => {
  if (props.type === "login") {
    return (
      <>
        <div class="my-6 flex items-center justify-center">
          <span class="border-t border-gray-300 flex-grow mr-3"></span>
          <span class="text-gray-500">OR</span>
          <span class="border-t border-gray-300 flex-grow ml-3 "></span>
        </div>
        <button
          type="button"
          class="w-full border border-gray-300 flex items-center justify-center py-3 px-4 rounded-lg hover:bg-gray-50 transition duration-300 mb-5"
          onClick={() => {
            window.open("http://localhost:5000/api/auth/google", "_self");
          }}
        >
          <img
            src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
            alt="Google logo"
            class="w-5 h-5 mr-2"
          />
          <span>Login with Google account</span>
        </button>
        <button
          type="button"
          class="w-full border border-gray-300 flex items-center justify-center py-3 px-4 rounded-lg hover:bg-gray-50 transition duration-300 mb-10"
          onClick={() => {
            window.open("http://localhost:5000/api/auth/github", "_self");
          }}
        >
          <img
            src={githubLogo}
            alt="Github logo"
            class="w-5 h-5 mr-2"
          />
          <span>Login with Github account</span>
        </button>
        <p class="text-gray-700">
          Belum memiliki akun? 
          <A class="text-black font-semibold hover:underline" href="/register">
            Register ke KEPO
          </A>
        </p>
      </>
    );
  } else if (props.type === "register") {
    return (
      <>
        <div class="my-6 flex items-center justify-center">
          <span class="border-t border-gray-300 flex-grow mr-3"></span>
          <span class="text-gray-500">OR</span>
          <span class="border-t border-gray-300 flex-grow ml-3"></span>
        </div>
        <button
          type="button"
          class="w-full border border-gray-300 flex items-center justify-center py-3 px-4 rounded-lg hover:bg-gray-50 transition duration-300 mb-10"
          onClick={() => {
            window.open("http://localhost:5000/api/auth/google", "_self");
          }}
        >
          <img
            src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
            alt="Google logo"
            class="w-5 h-5 mr-2"
          />
          <span>Register with Google account</span>
        </button>
        <p class="text-gray-700">
          Sudah memiliki akun? 
          <A class="text-black font-semibold hover:underline" href="/login">
            Login ke KEPO
          </A>
        </p>
      </>
    );
  }
};

export default (props: {
  children: Element | any;
  title?: string;
  description?: string;
  type: AuthAction;
}) => {
  return (
    <>
      <div class="min-h-screen flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
          <div class="w-full md:w-1/2 flex items-center justify-center min-h-[300px] md:min-h-[500px] overflow-hidden">
            <img
              src={loginImg}
              alt="Login Image"
              class="w-full h-full object-cover"
            />
          </div>

          <div class="w-full md:w-1/2 p-8">
            <div class="flex justify-start mb-8">
              <img src={logo} alt="" class="w-40" />
            </div>
            <h1 class="text-3xl font-bold mb-2">{props.title}</h1>
            <p class="text-gray-700 mb-6">{props.description}</p>
            {props.children}

            <div class="mt-6 text-center">
              {isAuthAction({ type: props.type })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
