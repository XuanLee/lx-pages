const { src, dest, parallel, series, watch } = require('gulp')
const del = require('del')
// 自动将gulp插件放到plugins里，不需要require。使用时直接plugins.
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()
const browserSync = require('browser-sync')
// 创建热更新服务器
const bs = browserSync.create()
const config = require('./config')

const clean = () => {
  return del([config.build.dist, config.build.temp])
}

const style = () => {
  return src(config.build.paths.styles, { base: config.build.src, cwd: config.build.src })
        .pipe(plugins.if(/\.scss*/,plugins.sass({ outputStyle: 'expanded' })))
        .pipe(plugins.if(/\.less*/,plugins.less()))
        .pipe(dest(config.build.temp))
        .pipe(bs.reload({ stream: true }))// 浏览器重新请求，并且关闭任务
}
const script = () => {
  return src(config.build.paths.scripts, { base: config.build.src, cwd: config.build.src })
    .pipe(plugins.babel({ presets: [require('@babel/preset-env')] }))
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({ stream: true }))
}

const page = () => {
  return src(config.build.paths.pages, { base: config.build.src, cwd: config.build.src })
    .pipe(plugins.swig({ data: config.data, defaults: { cache: false } }))
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({ stream: true }))
}

const image = () => {
  return src(config.build.paths.images, { base: config.build.src, cwd: config.build.src })
    // .pipe(imagemin())
    .pipe(dest(config.build.dist))
}

const font = () => {
  return src(config.build.paths.fonts, { base: config.build.src, cwd: config.build.src })
    // .pipe(imagemin())
    .pipe(dest(config.build.dist))
}

const extra = () => {
  return src('**', { base: config.build.public, cwd: config.build.public })
    .pipe(dest(config.build.dist))
}

const server = () => {
  watch(config.build.paths.styles, { cwd: config.build.src }, style)
  watch(config.build.paths.scripts, { cwd: config.build.src }, script)
  watch(config.build.paths.pages, { cwd: config.build.src }, page)

  watch([
    config.build.paths.images,
    config.build.paths.fonts
  ], { cwd: config.build.src }, bs.reload)
  watch([
    '**'
  ], { cwd: config.build.public }, bs.reload)

  bs.init({
    notify: false,
    port: 2080,
    open: true,
    server: {
      baseDir: [config.build.temp, config.build.src, config.build.public], // 请求过来，寻找目录文件，第一个找不到就找第二个
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
}

const compress = () => {
  return src(`${config.build.temp}/**/**`,
    {
      base: config.build.temp
    })
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

const compile = parallel(style, script, page)

// 创建串行任务组，先执行清除在转换文件
// 上线之前执行的任务
const build = series(
  clean,
  parallel(
    series(compile, compress),
    image, font, extra
  )
)

// 开发阶段任务，转化样式，js，页面模版，然后打开本地服务器调试。
const serve = series(compile, server)

module.exports = {
  clean,
  build,
  serve
}
