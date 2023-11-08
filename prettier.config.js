module.exports = { 
  extends: ["@commitlint/config-conventional"],
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: 'tailwind.config.js'
};