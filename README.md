# lx-pages

[![Build Status][actions-img]][actions-url]
[![Coverage Status][codecov-img]][codecov-url]
[![License][license-img]][license-url]
[![NPM Downloads][downloads-img]][downloads-url]
[![NPM Version][version-img]][version-url]
[![Dependency Status][dependency-img]][dependency-url]
[![devDependency Status][devdependency-img]][devdependency-url]
[![Code Style][style-img]][style-url]

> 一款轻量级基于Gulp的构建工具
> 快速实现将开发阶段中代码自动转换为生产环境代码
> 支持转换swig,sass,js,image,font

## Installation

```npm
$ npm install lx-pages --save-dev

# or yarn
$ yarn add lx-pages --dev
```

## 在项目根目录创建pages-config.js

```
module.exports = {
  //默认配置  
  build : {
    src : 'src', //项目根路径                       
    dist : 'dist', //输出路径
    temp : '.temp', //临时路径,可不做修改
    public : 'public', //静态资源，打包后复制在dist目录
    paths : { //各个文件存放路径-结合自己项目修改
      styles : 'assets/styles/*.scss',
      scripts : 'assets/scripts/*.js',
      pages : '*.html',
      images : 'assets/images/**',
      fonts : 'assets/fonts/**'
    }
  }
}
```

##开发阶段运行
>lx-pages develop 

##生产阶段运行
>lx-pages build

## License

[MIT](LICENSE) &copy; [李徐安](https://www.jianshu.com/u/a5418700ca16)


