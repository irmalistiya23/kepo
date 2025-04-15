"use client";
import profileIMG from "@public/img/dashboard/pfp.png";
import phoneIcon from "@public/svg/62.svg";
import currencyIcon from "@public/svg/Rp.svg";
import Image from "next/image";

export default function Profile() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Atur Profile</h1>
      <div className="relative">
        <div className="absolute rounded-2xl w-full h-full bg-yellow-400 transform translate-x-2 translate-y-2"></div>
        <div className="relative bg-[#f2f2f2] flex flex-col items-center rounded-2xl w-full h-full">
          <h1 className="text-2xl font-bold text-center mb-6 mt-3">Profile</h1>

          <div className="flex flex-col justify-center mb-6 items-center relative">
            <Image
              src={profileIMG.src}
              alt="Profile picture"
              className="w-20 h-20 rounded-full object-cover bg-transparent"
              width={500}
              height={500}
            />
            <form className="profile-form">
              <input
                type="file"
                id="file-upload"
                name="file-upload"
                hidden
                accept=".png,.jpg,.jpeg"
              />
              <label
                htmlFor="file-upload"
                className="bg-yellow-400 text-black font-medium py-2 px-4 rounded-lg mt-3 w-full inline-block text-center cursor-pointer"
              >
                Choose File
              </label>
            </form>
          </div>

          <form
            className="space-y-4 w-3/4 px-5 profile-form"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <div className="flex items-center bg-gray-300 rounded-lg px-5 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-gray-500 mr-2">|</span>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  className="bg-transparent focus:outline-none w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <div className="flex items-center bg-gray-300 rounded-lg px-3 py-2">
                  <Image src={phoneIcon} alt="" className="w-7 h-7 opacity-80" />
                  <span className="text-gray-500 mx-2">|</span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Your Number"
                    className="bg-transparent focus:outline-none w-full"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  className="w-full bg-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="flex items-center bg-gray-300 rounded-lg px-3 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-gray-600 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-gray-500 mr-2">|</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  className="bg-transparent focus:outline-none w-full"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Jumlah Tanggungan
              </label>
              <div className="flex items-center bg-gray-300 rounded-lg px-3 py-2">
                <Image
                  src={currencyIcon}
                  alt=""
                  className="w-5 h-5 opacity-80"
                />
                <span className="text-gray-500 mr-2 ml-4"> |</span>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  placeholder="Enter ur price"
                  className="bg-transparent focus:outline-none w-full"
                />
              </div>
            </div>
          </form>

          <div className="mt-6 flex justify-center">
            <button
              className="bg-yellow-400 text-black font-medium py-2 px-8 rounded-lg mb-3"
              type="submit"
              onClick={() => {
                const forms = document.querySelectorAll(
                  ".profile-form"
                ) as NodeListOf<HTMLFormElement>;
                forms.forEach((form) => {
                  form.dispatchEvent(new Event("submit", { cancelable: true }));
                });
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
