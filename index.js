const fs = require('fs').promises
const path = require('path')
const { version } = require('@jscad/cli/package.json')
const generateOutputData = require('@jscad/cli/src/generateOutputData')

class OpenJSCADWebpackPlugin {
    constructor({
        addMetaData = false,
        format = 'stl',
        params = {},
    }){
        if(typeof format === 'string') format = [format]

        this.options = {
            addMetaData,
            format,
            params
        }
    }

    async hook(compilation){
        const { options: { output: { path: dir, filename } } } = compilation
        const target = path.resolve(dir, filename)
        const source = await fs.readFile(target, 'utf-8')

        const { addMetaData, format, params } = this.options

        await Promise.all(
            format.map(format => {
                const name = path.basename(filename, '.js')
                const outpath = path.resolve(dir, `${name}.${format}`)

                return generateOutputData(source, params, {
                    outputFile: outpath,
                    outputFormat: format,
                    inputFile: target,
                    inputFormat: 'js',
                    version,
                    addMetaData,
                })
                    .then(data => fs.writeFile(outpath, data.asBuffer()))
                    .catch(error => console.error(error))
            })
        )
        
        delete require.cache[target]
    }
    
    apply(compiler){
        compiler.hooks.afterEmit.tapPromise(
            this.constructor.name,
            this.hook.bind(this)
        )
     }
}

module.exports = { OpenJSCADWebpackPlugin }