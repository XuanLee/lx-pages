// 当前执行node命令时候的文件夹地址
const cwd = process.cwd()
// 读取使用者传来的配置文件
let config = {
  // defalut config
  build: {
    src: 'src',
    dist: 'dist',
    temp: '.temp',
    public: 'public',
    paths: {
      styles: 'assets/styles/*.scss',
      scripts: 'assets/scripts/*.js',
      pages: '*.html',
      images: 'assets/images/*.{jpg,jpeg,png,gif,svg}',
      fonts: 'assets/fonts/*.{eot,svg,ttf,woff,woff2}'
    }
  }
}
try {
  const loadConfig = require(`${cwd}/pages-config.js`)
  config = Object.assign({}, config, loadConfig)
} catch (e) {}

module.exports = config
