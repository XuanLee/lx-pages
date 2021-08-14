# lx-pages

[![Build Status][actions-img]][actions-url]
[![Coverage Status][codecov-img]][codecov-url]
[![License][license-img]][license-url]
[![NPM Downloads][downloads-img]][downloads-url]
[![NPM Version][version-img]][version-url]
[![Dependency Status][dependency-img]][dependency-url]
[![devDependency Status][devdependency-img]][devdependency-url]
[![Code Style][style-img]][style-url]

> static web app workflow

## Installation

```shell
$ npm install lx-pages --dev

# or yarn
$ yarn add lx-pages --dev
```

## Usage

<!-- TODO: Introduction of Usage -->

```javascript
const lxPages = require('lx-pages')
const result = lxPages('w')
// result => 'w@zce.me'
```

## API

<!-- TODO: Introduction of API -->

### lxPages(input, options?)

#### input

- Type: `string`
- Details: name string

#### options

##### host

- Type: `string`
- Details: host string
- Default: `'zce.me'`

## Related

- [zce/caz](https://github.com/zce/caz) - A simple yet powerful template-based Scaffolding tools.

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; [李徐安](https://www.4399.com)



[actions-img]: https://img.shields.io/github/workflow/status/ /lx-pages/CI
[actions-url]: https://github.com/ /lx-pages/actions
[codecov-img]: https://img.shields.io/codecov/c/github/ /lx-pages
[codecov-url]: https://codecov.io/gh/ /lx-pages
[license-img]: https://img.shields.io/github/license/ /lx-pages
[license-url]: https://github.com/ /lx-pages/blob/master/LICENSE
[downloads-img]: https://img.shields.io/npm/dm/lx-pages
[downloads-url]: https://npm.im/lx-pages
[version-img]: https://img.shields.io/npm/v/lx-pages
[version-url]: https://npm.im/lx-pages
[dependency-img]: https://img.shields.io/david/ /lx-pages
[dependency-url]: https://david-dm.org/ /lx-pages
[devdependency-img]: https://img.shields.io/david/dev/ /lx-pages
[devdependency-url]: https://david-dm.org/ /lx-pages?type=dev
[style-img]: https://img.shields.io/badge/code_style-standard-brightgreen
[style-url]: https://standardjs.com
