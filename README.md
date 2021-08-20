# lx-pages

> 一款轻量级基于Gulp的构建工具

> 快速实现将开发阶段中代码自动转换为生产环境代码
> 支持转换less/sass
> 支持压缩html、js、css
> 支持swag模版转换
> 支持开发阶段开启本地服务器调试和热更新
## 1. Installation
```npm
$ npm install lx-pages --save-dev

# or yarn
$ yarn add lx-pages --dev
```

## 2. 在项目根目录创建pages-config.js
######demo项目目录如下：
![Snip20210820_5.png](https://upload-images.jianshu.io/upload_images/8811014-e1bbdc8abe570a32.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
######pages-config.js中需要配置的文件路径：
```
module.exports = {
  //默认配置  
  build : {
    src : 'src', //项目根路径                       
    dist : 'dist', //输出路径
    temp : '.temp', //临时路径,可不做修改
    public : 'public', //静态资源，打包后复制在dist目录
    paths : { //各个src下的文件存放路径-结合自己项目修改
      styles : 'csss/**',
     scripts : 'js/*.js',
      pages : '*.html',
      images : 'images/*.{jpg,jpeg,png,gif,svg}',
      fonts : 'fonts/**'
    }
  }
}
```
## 3. 在package.json中配置scripts
```
  "scripts": {
    "build": "lx-pages build",
    "serve": "lx-pages serve"
  },
```

## 4. 开发阶段运行

>npm serve  

## 生产阶段运行
>npm build

## github
https://github.com/XuanLee/lx-pages
## gitee
https://gitee.com/li-XuAn-lx/lx-pages
## npm
https://www.npmjs.com/package/lx-pages
## License
[MIT](LICENSE) &copy; [李徐安](https://www.jianshu.com/u/a5418700ca16)
