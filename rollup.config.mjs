import postcss from 'rollup-plugin-postcss'
import copy from 'rollup-plugin-copy'
import terser from '@rollup/plugin-terser';
import postcssImport from 'postcss-import'


const config = [
  {
    input: 'src/css/index.css',
    output: {
      file: 'assets/css/index.css',
      format: 'es'
    },
    plugins: [
      postcss({
        modules: false,
        extract: true,
        minimize: true,
        plugins: [postcssImport()]
      })
    ]
  },
  {
    input: 'src/css/about.css',
    output: {
      file: 'assets/css/about.css',
      format: 'es'
    },
    plugins: [
      postcss({
        modules: false,
        extract: true,
        minimize: true,
        plugins: [postcssImport()]
      })
    ]
  },
  {
    input: 'src/css/base.css',
    output: {
      file: 'assets/css/main.css',
      format: 'es'
    },
    plugins: [
      postcss({
        modules: false,
        extract: true,
        minimize: true,
        plugins: [postcssImport()]
      }),
    ]
  },
  {
    input: 'src/css/base.css',
    output: {
      file: 'assets/css/main.css',
      format: 'es'
    },
    plugins: [
      postcss({
        modules: false,
        extract: true,
        minimize: true,
        plugins: [postcssImport()]
      }),
      copy({
        targets: [
          { src: ['node_modules/@awesome.me/kit-ef683a2718/icons/webfonts/*'], dest: 'assets/webfonts' },
          { src: ['node_modules/@fontsource-variable/open-sans/files/open-sans-latin-standard-normal.woff2'], dest: 'assets/webfonts' },
        ]
      }),
    ]
  },
  {
    input: 'src/js/dynamic_background.js',
    output: {
      file: 'assets/js/dynamic_background.js',
      format: 'es'
    },
    plugins: [terser()]
  }
];

export default config
