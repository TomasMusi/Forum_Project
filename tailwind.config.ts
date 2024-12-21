import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    // extend znamená že rozšiřujeme tailwind o v tomto případě nové barvy, kdybychom to dali do theme, tak nám to bude pouze nabízet to co je v extends.
    extend: {
      // Sem dáme barvy které chceme použít 
      colors: {
        'text': '#140d1c',
        'background': '#efe8f7',
        'primary': '#492173',
        'secondary': '#a975e1',
        'accent': '#6b20bc',
      },
      gridTemplateColumns: {
        // nastavení vlastního parametru pro grid Template Columns
        nav: "1fr auto 1fr",
      },
      // sice to tady nepoužíváme, ale chtěl jsem jen ukázat, že si můžeme i nastavit reponsivitu na přesné parametry v configu.
      screens: {
        'mobile': '470'
      }

    }
  },

  plugins: []
} satisfies Config;
