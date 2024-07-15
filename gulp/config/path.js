import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./deploy`;
const srcFolder = `./src`;
const srcHome = `./`

export const path = {
  build: {
    js: `${buildFolder}/js/`,
    html: `${buildFolder}/`,
    css: `${buildFolder}/css/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
  },
  src: {
    jsSwiper: `${srcFolder}/js/swiper.bundle.js`,
    js: `${srcFolder}/js/main.js`,
    images: `${srcFolder}/img/*.{jpeg,jpg,png,svg,webp,mp4}`,
    svg: `${srcFolder}/sprite/**/*.svg`,
    html: `${srcFolder}/**/*.html`,
    scss: `${srcFolder}/scss/style.scss`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    html: `${srcFolder}/**/*.html`,
    scss: `${srcFolder}/scss/**/*.scss`,
    images: `${srcFolder}/img/*{jpeg,jpg,svg,png,webp,mp4,ogv,webm}`,
    sprite: `${srcFolder}/sprite/**/*.svg`
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: 'test.yowa.ru'
}