import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    // extend znamená že rozšiřujeme tailwind o v tomto případě nové barvy, kdybychom to dali do theme, tak nám to bude pouze nabízet to co je v extends.
    extend: {
      // Sem dáme barvy které chceme použít 
      colors: {
        'text': '#eae3f2',
        'background': '#0f0817',
        'primary': '#b48cde',
        'secondary': '#521e8a',
        'accent': '#8f43df',
      },

    }
  },

  plugins: []
} satisfies Config;
