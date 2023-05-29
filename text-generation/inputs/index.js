const { readFileSync, readdirSync, rmSync, existsSync, mkdirSync } = require('fs')

module.exports = {
  INPUT_SOURCES,
  resolveInputFile,
  resolveOutputDir,
  filenameToTitle,
}

const resolveInputFile = file => resolve(__dirname, file)
const resolveOutputDir = name => resolve(__dirname, '../output', name)
const filenameToTitle = file =>
  file
    .replace(/\.txt$/im, '')
    .replace(/\s+/gim, ' ')
    .trim()

const INPUT_SOURCES = readdirSync(__dirname, { withFileTypes: false, encoding: 'utf-8' })
  .filter(String)
  .filter(file => file.endsWith('.txt'))
  .map((filename, index) => {
    try {
      const filepath = resolveInputFile(filename)
      const title = filenameToTitle(filename)
      const text = readFileSync(filepath, { encoding: 'utf-8' }).toString().trim()

      const output = resolveOutputDir(title)
      if (!existsSync(output)) {
        mkdirSync(output)
      }

      return { index, filename, filepath, title, text, output }
    } catch (error) {
      console.error({ description: 'Error on create output directory!', filename, index, error })
      return false
    }
  })
  .filter(Boolean)
