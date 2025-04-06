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
      dropShadow: {
        yellow: '6px 6px 0px #facc15', // warna kuning (yellow-400)
      }
    },
  },
  plugins: [],
};

export default config;
