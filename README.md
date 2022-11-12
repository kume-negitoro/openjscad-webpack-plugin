# OpenJSCAD Webpack Plugin

**Plugin that generates 3D models from bundled JS file for OpenJSCAD**

This is my hobby project and provisional version.

Issues and RP are welcome! ;)

## Install

`npm i -D @jscad/cli kume-negitoro/openjscad-webpack-plugin`

or

`yarn add -D @jscad/cli kume-negitoro/openjscad-webpack-plugin`

## Usage

A basic structure is:

```
.
├── dest
│   ├── mymodel.js
│   └── mymodel.stl
├── node_modules
├── package.json
├── src
│   └── mymodel.js
├── webpack.config.js
└── yarn.lock
```

**src/mymodel.js**

```js
const { primitives } = require('@jscad/modeling')
const { cuboid } = primitives

const main = () => {
    return cuboid({
        size: [10, 10, 10],
        center: [0, 0, 0],
    })
}

module.exports = { main }
```

**webpack.config.js**

```js
const path = require('path')
const { OpenJSCADWebpackPlugin } = require('openjscad-webpack-plugin')

module.exports = {
    entry: {
        mymodel: path.join(__dirname, 'src', 'mymodel.js'),
    },
    output: {
        path: path.join(__dirname, 'dest'),

        // Model will be generated as mymodel.stl
        filename: 'mymodel.js',

        // This is important (generate as a cjs module using module.exports)
        libraryTarget: 'commonjs2',
    },
    plugins: [
        new OpenJSCADWebpackPlugin({
            // Multiple type is OK: ['stl', 'aml']
            format: 'stl',
        }),
    ],
}
```

## Options

| Name | Type | Default | Description |
| :--: | :--: | :--: | :--: |
| **`format`** | `FormatType` \| `FormatType[]` | `'stl'` | Output format type. For example: 'amf', 'dxf', 'json', 'stl', 'svg', 'x3d'. |

## Why this plugin

You can use Balel or TypeScript or other languages in writing models. And you can write codes with your favorite editors.

## License

MIT