import profileIMG from "@public/img/dashboard/pfpTest.png";
import phoneIcon from "@public/svg/62.svg";
import currencyIcon from "@public/svg/Rp.svg";
import emailIcon from "@public/img/dashboard/email_4546924.png"
export default function Profile() {
    const handleSubmit = (e: Event) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
    }
  return (
    <>
      <h1 class="text-3xl font-bold mb-6">Atur Profile</h1>
      <div class="relative">
        <div class="absolute rounded-2xl w-full h-full bg-yellow-400 transform translate-x-2 translate-y-2"></div>
        <div class="relative bg-[#f2f2f2] flex flex-col items-center rounded-2xl w-full h-full">
            <h1 class="text-2xl font-bold text-center mb-6 mt-3">Profile</h1>

            <div class="flex flex-col justify-center mb-6 items-center relative">
            <img
                src={profileIMG}
                alt="Profile picture"
                class="w-20 h-20 rounded-full object-cover bg-green-200"
            />
            <button class="bg-yellow-400 text-black font-medium py-2 px-4 rounded-lg mt-3 w-full">
                Choose Photo
            </button>
            </div>

            <form class="space-y-4 w-3/4 px-5" id="profile-form" onSubmit={handleSubmit}>
            <div>
                <label
                for="username"
                class="block text-sm font-medium text-gray-700 mb-1"
                >
                Username
                </label>
                <div class="flex items-center bg-gray-300 rounded-lg px-5 py-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-600 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                </svg>
                <span class="text-gray-500 mr-2">|</span>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    class="bg-transparent focus:outline-none w-full"
                />
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                <label
                    for="phone"
                    class="block text-sm font-medium text-gray-700 mb-1"
                >
                    Phone Number
                </label>
                <div class="flex items-center bg-gray-300 rounded-lg px-3 py-2">
                    <img src={phoneIcon} alt="" class="w-7 h-7 opacity-80"/>
                    <span class="text-gray-500 mx-2">|</span>
                    <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Your Number"
                    class="bg-transparent focus:outline-none w-full"
                    />
                </div>
                </div>

                <div>
                <label
                    for="dob"
                    class="block text-sm font-medium text-gray-700 mb-1"
                >
                    Date of Birth
                </label>
                <input
                    type="date"
                    id="dob"
                    name="dob"
                    class="w-full bg-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                />
                </div>
            </div>

            <div>
                <label
                for="email"
                class="block text-sm font-medium text-gray-700 mb-1"
                >
                Email
                </label>
                <div class="flex items-center bg-gray-300 rounded-lg px-3 py-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-7 w-7 text-gray-600 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    class="w-10 h-10 opacity-80"
                    />
                </svg>
                <span class="text-gray-500 mr-2">|</span>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@gmail.com"
                    class="bg-transparent focus:outline-none w-full"
                />
                </div>
            </div>

            <div>
                <label
                for="amount"
                class="block text-sm font-medium text-gray-700 mb-1"
                >
                Jumlah Tanggungan
                </label>
                <div class="flex items-center bg-gray-300 rounded-lg px-3 py-2">
                <img src={currencyIcon} alt="" class="w-5 h-5 opacity-80"/>
                <span class="text-gray-500 mr-2 ml-4"> |</span>
                <input
                    type="text"
                    id="amount"
                    name="amount"
                    placeholder="Enter ur price"
                    class="bg-transparent focus:outline-none w-full"
                />
                </div>
            </div>
            </form>

            <div class="mt-6 flex justify-center">
            <button
                class="bg-yellow-400 text-black font-medium py-2 px-8 rounded-lg mb-3"
                type="submit"
                form="profile-form"
            >
                Save
            </button>
            </div>
        </div>
      </div>
    </>
  );
}
