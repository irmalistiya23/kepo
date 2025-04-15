"use client";

import loginImg from "@public/img/login.jpg";
import logo from "@public/img/logo.png";
import Link from 'next/link';
import Image from "next/image";
type AuthAction = "login" | "register";

const isAuthAction = (props: { type: AuthAction }) => {
  if (props.type === "login") {
    return (
      <>
        <div className="my-6 flex items-center justify-center">
          <span className="border-t border-gray-300 flex-grow mr-3"></span>
          <span className="text-gray-500">OR</span>
          <span className="border-t border-gray-300 flex-grow ml-3 "></span>
        </div>
        <button
          type="button"
          className="w-full border border-gray-300 flex items-center justify-center py-3 px-4 rounded-lg hover:bg-gray-50 transition duration-300 mb-5"
          onClick={() => {
            window.open("http://localhost:5000/api/auth/google", "_self");
          }}
        >
          <img
            src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
            alt="Google logo"
            className="w-5 h-5 mr-2"
          />
          <span>Login with Google account</span>
        </button>
        <button
          type="button"
          className="w-full border border-gray-300 flex items-center justify-center py-3 px-4 rounded-lg hover:bg-gray-50 transition duration-300 mb-10"
          onClick={() => {
            window.open("http://localhost:5000/api/auth/github", "_self");
          }}
        >
          <Image
            src="/svg/github-mark.svg"
            width={500}
            height={500}
            alt="Github logo"
            className="w-5 h-5 mr-2"
          />
          <span>Login with Github account</span>
        </button>
        <p className="text-gray-700">
          Belum memiliki akun? 
          <Link className="text-black font-semibold hover:underline" href="/register">
            Register ke KEPO
          </Link>
        </p>
      </>
    );
  } else if (props.type === "register") {
    return (
      <>
        <div className="my-6 flex items-center justify-center">
          <span className="border-t border-gray-300 flex-grow mr-3"></span>
          <span className="text-gray-500">OR</span>
          <span className="border-t border-gray-300 flex-grow ml-3"></span>
        </div>
        <button
          type="button"
          className="w-full border border-gray-300 flex items-center justify-center py-3 px-4 rounded-lg hover:bg-gray-50 transition duration-300 mb-10"
          onClick={() => {
            window.open("http://localhost:5000/api/auth/google", "_self");
          }}
        >
          <img
            src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
            alt="Google logo"
            className="w-5 h-5 mr-2"
          />
          <span>Register with Google account</span>
        </button>
        <p className="text-gray-700">
          Sudah memiliki akun? 
          <Link className="text-black font-semibold hover:underline" href="/login">
            Login ke KEPO
          </Link>
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
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex items-center justify-center min-h-[300px] md:min-h-[500px] overflow-hidden">
            <img
              src={loginImg.src}
              alt="Login Image"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 p-8">
            <div className="flex justify-start mb-8">
              <img src={logo.src} alt="" className="w-40"/>
            </div>
            <h1 className="text-3xl font-bold mb-2">{props.title}</h1>
            <p className="text-gray-700 mb-6">{props.description}</p>
            {props.children}

            <div className="mt-6 text-center">
              {isAuthAction({ type: props.type })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
