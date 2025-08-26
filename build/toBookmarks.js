const fs = require('fs-extra')
const globby = require('globby')
const path = require('path')
const config = require('./config').toBookmarks

const root = process.cwd()


const entris = globby.sync(config.src)
const outPut = path.resolve(root, config.outPut)


function buildJsToBookMarks (str) {
    return `javascript:${encodeURIComponent(str)}`.replace(/(\\n|\t)/g, '')
}




function run () {
    entris.forEach(filePath => {
      let content = fs.readFileSync(filePath, {encoding: 'utf8'})
      content = buildJsToBookMarks(content)
      const outputPath = path.join(outPut, path.relative(root, filePath))
      console.log(outputPath)
      fs.outputFileSync(outputPath, content, { encoding: 'utf-8'})
    })
}


run()



