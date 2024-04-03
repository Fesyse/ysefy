/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  semi: false,
  useTabs: false,
  tabWidth: 2,
  editor: {
    formatOnSave: true,
  },
  jsxSingleQuote: true,
  arrowParens: "avoid",
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
