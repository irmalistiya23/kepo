'use client';
import auth from "@/lib/api/auth";
import { useEffect, useState } from "react";

const sidebarData1: { title: string; link: string }[] = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Catatan Keuangan", link: "/dashboard/keuangan" },
  { title: "Analisis Keuangan", link: "/dashboard/analisis" },
];
const sidebarData2: { title: string; link: string }[] = [
  { title: "Goal", link: "/dashboard/goal" },
  { title: "Edukasi Keuangan", link: "/dashboard/education" },
];

export default (props: { children: Element | any }) => {
  const [username, setUsername] = useState<string>("");
  const [Active, setActive] = useState(false);
  const navigate = (url: string) => {
    window.location.href = url;
  };
  useEffect(() => {
    (async () => {
      const raw = await auth.user();
      console.log(raw);

      if (raw.message) {
        const data = raw.data.userId;
        setUsername(data.name);
      }
    })();
  }, []);
  return (
    <>
      <button
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="separator-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#FFB22C] rounded-r-3xl rounded-br-3xl flex flex-col justify-between">
          <section>
            <button
              className="hover:bg-gray-700 hover:text-white rounded-lg w-full p-2 flex items-center justify-start gap-x-4"
              onClick={() => navigate("/dashboard/profile")}
            >
              <div className="flex items-center justify-start gap-x-4">
                <div className="bg-gray-600 rounded-full  border-gray-400 border-2 w-12 h-12 flex justify-center items-center">
                  <p className="text-sm">img</p>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm">
                    <p>Selamat Datang 🎉</p>
                  </span>
                  <span className="text-lg font-bold">
                    <p>{username ? username : "Strangers"}</p>
                  </span>
                </div>
              </div>
            </button>

            <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
              {sidebarData1.map((item, index) => (
                <li key={index}>
                  <a
                    onClick={() => navigate(item.link)}
                    className="flex items-center py-2 px-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      className="w-5 text-gray-700 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 21"
                    >
                      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                    </svg>
                    <span className="ms-3 text-base text-gray-700 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white font-bold">
                      {item.title}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
              {sidebarData2.map((item, index) => (
                <li key={index}>
                  <a
                    onClick={() => navigate(item.link)}
                    className="flex items-center py-2 px-4 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                  >
                    <svg
                      className="shrink-0 w-5 text-gray-700 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 17 20"
                    >
                      <path d="M7.958 19.393a7.7 7.7 0 0 1-6.715-3.439c-2.868-4.832 0-9.376.944-10.654l.091-.122a3.286 3.286 0 0 0 .765-3.288A1 1 0 0 1 4.6.8c.133.1.313.212.525.347A10.451 10.451 0 0 1 10.6 9.3c.5-1.06.772-2.213.8-3.385a1 1 0 0 1 1.592-.758c1.636 1.205 4.638 6.081 2.019 10.441a8.177 8.177 0 0 1-7.053 3.795Z" />
                    </svg>
                    <span className="ms-3 text-base text-gray-700 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white font-bold">
                      {item.title}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="flex items-center justify-center mt-4">
              <button
                onClick={async () => {
                  await fetch("http://localhost:5000/api/logout", {
                    method: "POST",
                    credentials: "include",
                  });
                  window.open("http://localhost:3000/login", "_self");
                }}
                className="flex items-center py-2 px-4 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <svg
                  className="shrink-0 w-5 text-gray-700 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.5 3.5a1 1 0 0 1 .117 1.993L10.5 5.5H6a4 4 0 0 0-.117 7.993L6 13.5h4.5a1 1 0 0 1 .117 1.993L10.5 15.5H6a6 6 0 0 1-.117-11.993L6 3.5h4.5ZM14.707 8.293a1 1 0 0 1 .083 1.32l-.083.094L12.414 12l2.293 2.293a1 1 0 0 1-1.32 1.497l-.094-.083L10.414 12l2.293-2.293a1 1 0 0 1 .999-.001Z" />
                </svg>
                <span className="ms-3 text-base text-gray-700 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white font-bold">
                  Logout
                </span>
              </button>
            </div>
          </section>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">{props.children}</div>
    </>
  );
};
