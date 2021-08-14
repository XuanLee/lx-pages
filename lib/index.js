const { src, dest, parallel, series, watch } = require('gulp')
const del = require('del')

// 自动将gulp插件放到plugins里，不需要require。使用时直接plugins.
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()
// const sass = require('gulp-sass')
const babel = require('gulp-babel')
const swig = require('gulp-swig')
const imagemin = require('gulp-imagemin')
const browserSync = require('browser-sync')
// 创建热更新服务器
const bs = browserSync.create()

// 当前执行node命令时候的文件夹地址
const cwd = process.cwd()
// 读取使用者传来的配置文件
let config = {
  // defalut config
  build: {
    src: 'src',
    dist: 'dist',
    temp: 'temp',
    public: 'public',
    paths: {
      styles: 'assets/styles/*.scss',
      scripts: 'assets/scripts/*.js',
      pages: '*.html',
      images: 'assets/images/**',
      fonts: 'assets/fonts/**'
    }
  }
}
try {
  const loadConfig = require(`${cwd}/pages-config.js`)
  config = Object.assign({}, config, loadConfig)
} catch (e) {}

// 删除之前的文件
const clean = () => {
  return del([config.build.dist, config.build.temp])
}

// 将sass转换为css
const style = () => {
  /*
    通过观察这样输出的文件在dist目录下就是几个scss文件，而没有目录结构。
    可以给src插件下，添加参数base，让输出的目录，保持原有结构

    sass不会压缩文件名为_开头的
    .pipe(sass({ outputStyle: 'expanded' }))
    通过给sass指定属性，将 } 放在空行上

    cwd : 指定在那个路径下查找。默认是项目根路径
    */
  return src(config.build.paths.styles, { base: config.build.src, cwd: config.build.src })
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({ stream: true }))// 浏览器重新请求，并且关闭任务
}

// 转换js，向下兼容
const script = () => {
  // babel只是一个平台，不做转换，具体转换得用到里面的插件
  // 使用babel还需要手动安装@babel/core @babel/preset-env
  return src(config.build.paths.scripts, { base: config.build.src, cwd: config.build.src })
    .pipe(babel({ presets: [require('@babel/preset-env')] }))
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({ stream: true }))
}

// 解析模版
const page = () => {
  // src/*.html 找到src根目录下的.html文件
  // src/**/*.html 找到src下子目录的.html 文件
  return src(config.build.paths.pages, { base: config.build.src, cwd: config.build.src })
    // 在模板语法中会用到外面动态生成的值,可以作为参数传递进去
    .pipe(swig({ data: config.data, defaults: { cache: false } }))
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({ stream: true }))
}

// 压缩图片
const image = () => {
  // src/assets/images/** 找到目录下的所有文件
  return src(config.build.paths.images, { base: config.build.src, cwd: config.build.src })
    .pipe(imagemin())
    .pipe(dest(config.build.dist))
}

// 压缩字体
const font = () => {
  // src/assets/images/** 找到目录下的所有文件
  return src(config.build.paths.fonts, { base: config.build.src, cwd: config.build.src })
    .pipe(imagemin())
    .pipe(dest(config.build.dist))
}

// 复制public中的文件
const extra = () => {
  return src('**', { base: config.build.public, cwd: config.build.public })
    .pipe(dest(config.build.dist))
}

const serve = () => {
  watch(config.build.paths.styles, { cwd: config.build.src }, style)
  watch(config.build.paths.scripts, { cwd: config.build.src }, script)
  watch(config.build.paths.pages, { cwd: config.build.src }, page)
  // watch('src/assets/fonts/**',font)

  // 当这三个文件发生变化时，浏览器重新发请求寻找，配合baseDir : ['dist','src','public']使用
  watch([
    config.build.paths.images,
    config.build.paths.fonts
  ], { cwd: config.build.src }, bs.reload)
  watch([
    '**'
  ], { cwd: config.build.public }, bs.reload)

  bs.init({
    notify: false, // 取消提示
    port: 2080, // 修改端口号
    open: true, // 取消开启服务器自动打开浏览器
    // file : 'dict/**', //将dist目录下文件开启热更新
    server: {
      baseDir: [config.build.temp, config.build.src, config.build.public], // 请求过来，寻找目录文件，第一个找不到就找第二个
      routes: { // 将代码中的/node_modules，映射到项目的根路径中
        '/node_modules': 'node_modules'
      }
    }
  })
}

// useref插件：将构建注释中的引入的资源，合并到同一个文件当中
// 合并过程会创建文件，可以对css或者js文件进行压缩
/*
src(config.build.paths.pages,{base : config.build.temp,cwd:config.build.temp})
    .pipe(uf({ searchPath : [config.build.temp,'.'] }))
*/
const useref = () => {
  return src(`${config.build.temp}/*.html`, { base: config.build.temp })
    .pipe(plugins.useref({ searchPath: [config.build.temp, '.'] }))
    .pipe(plugins.if(/\.js*/, plugins.uglify()))
    .pipe(plugins.if(/\.css*/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html*/, plugins.htmlmin(
      {
        collapseWhitespace: true, // 压缩空格和换行
        minifyCSS: true, // 压缩导入的css和js
        minifyJS: true
      }
    )))
    .pipe(dest(config.build.dist))
}

// 并行任务组:parallel
// 串行任务组:series
// 未引入图片和字体，在开发阶段不需要实时转化
const compile = parallel(style, script, page)

// 创建串行任务组，先执行清除在转换文件
// 上线之前执行的任务
const build = series(
  clean,
  parallel(
    series(compile, useref),
    image, font, extra
  )
)

// 开发阶段任务，转化样式，js，页面模版，然后打开服务器调试。
const develop = series(compile, serve)

module.exports = {
  clean,
  build,
  develop
}
