import eslintPluginAstro from 'eslint-plugin-astro'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'

export default [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    plugins: {
      'better-tailwindcss': eslintPluginBetterTailwindcss,
    },
    rules: {
      ...eslintPluginBetterTailwindcss.configs.recommended,
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    },
  },
]
