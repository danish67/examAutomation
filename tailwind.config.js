/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'sl': {'max':'855px'},

      'nl': {'min':'856px','max': '1050px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '1051px', 'max': '1735px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      // 'xl': {'min': '1280px', 'max': '1535px'},
      // // => @media (min-width: 1280px and max-width: 1535px) { ... }

      // '2xl': {'min': '1536px'},
      // // => @media (min-width: 1536px) { ... }
    },
    extend: {
      height: {
        '506': '32rem',
      },
      colors: {
        loginbackground: "#F0F4FB",
        aliceblue: "#f0f4fb",
        mediumslateblue: {
          "100": "#5f6ef1",
          "200": "#4154f1",
          "300": "#3c4ef1",
        },
        gray: "#212529",
        white: "#fff",
        lightgray: "#ced4da",
        slategray: {
          "100": "#757f8e",
          "200": "#6c757d",
        },
        darkslateblue: "#012970",
      },
      fontFamily: {
        roboto: "Roboto",
        nunito: "Nunito",
      },
      fontSize: {
        mini: "15px",
        base: "16px",
        "13xl": "50px",
        smi: "13px",
        "45xl": "64px",
        "7xl": "30px",
        "Iphone":"14px",
        
        
        sm: "14px",
        inherit: "inherit",
      },
    },
  },
  plugins: [],
};

