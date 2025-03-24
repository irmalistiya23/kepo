import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily:{
        Nunito: ['Nunito', 'sans-serif'],
      },
      fontWeight: {
        superbold: "900",
      },
    },
  },
  plugins: [],
};

export default config;
