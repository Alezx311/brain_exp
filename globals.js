const fs = require("fs")
const path = require("path")
const { log, warn } = console
const { random, min: _min, max: _max } = Math
const { now } = Date

//* Process Paths
const PATH_DIRNAME = __dirname
const PATH_FILENAME = __filename
const PATH_CWD = process.cwd()
const LOG_FILE = "/files/log.txt"

//* Folders
const FILES_PATH = path.join(__dirname, "./files/")
const RESULTS_PATH = path.join(__dirname, "./results/")
const NETWORKS_PATH = path.join(__dirname, "./networks/")
const TRAINING_PATH = path.join(__dirname, "./training/")

const FILES_CONTENT = fs.readdirSync(FILES_PATH)
const RESULTS_CONTENT = fs.readdirSync(RESULTS_PATH)
const NETWORKS_CONTENT = fs.readdirSync(NETWORKS_PATH)
const TRAINING_CONTENT = fs.readdirSync(TRAINING_PATH)

//* Files
const OUTPUT_PATH = path.join(FILES_PATH, "output.txt")
const INPUT_PATH = path.join(FILES_PATH, "input.txt")
const BOOK_PATH = path.join(FILES_PATH, "book.txt")
const POETS_PATH = path.join(FILES_PATH, "poetry.txt")
const LOG_PATH = path.join(FILES_PATH, "log.txt")

const OUTPUT_CONTENT = fs.readFileSync(OUTPUT_PATH, "utf-8")
const INPUT_CONTENT = fs.readFileSync(INPUT_PATH, "utf-8")
const BOOK_CONTENT = fs.readFileSync(BOOK_PATH, "utf-8")
const POETS_CONTENT = fs.readFileSync(POETS_PATH, "utf-8")
const LOG_CONTENT = fs.readFileSync(POETS_PATH, "utf-8")

//* Chars
const CHARS_NUM = "0123456789"
const CHARS_ENG = "abcdefghijklmnopqrstuvwxyz"
const CHARS_RUS = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
const CHARS_SPECIAL = [`\s`, `\n`, `\t`, `\,`, `\.`].join("")
const CHARS_LETTERS = CHARS_ENG + CHARS_RUS
const CHARS_VALID = CHARS_LETTERS + CHARS_NUM + CHARS_SPECIAL

//* Dividers
const DIV_JOIN = "\n"
const DIV_SEP = "\t"
const DIV_LINE = `\n${"#".repeat(20)}\n`
const DIV_TITLE = `\t${"*".repeat(5)}\t`

//* Constants
const MIN = 1
const MAX = 100
const INPUT_SIZE = 1
const HIDDEN_SIZE = 3
const OUTPUT_SIZE = 1
const RANGE = [MIN, MAX]
const ARRAY_SIZE = 10
const TRAIN_SET_SIZE = 1000
const LEARNING_RATE = 0.05
const LIKE_DIFF = 0.1
const VALUES_NOT_DEFINED = [null, undefined]
const VALUES_NOT_TRUTHY = [...VALUES_NOT_DEFINED, false, 0, "", {}, []]

//* Options
const OPTIONS_BRAIN_LSTM = { learningRate: LEARNING_RATE, log: true }
const OPTIONS_BRAIN_TRAIN = {
	...OPTIONS_BRAIN_LSTM,
	iterations: 1000,
	errorThresh: 0.005,
	logPeriod: 10,
	momentum: 0.1,
	callback: console.log,
	callbackPeriod: 10
}

//* File System Helpers
const filePath = (s = "./") => path.join(__dirname, s)
const fileList = (dir = "./") => fs.readdirSync(dir)
const fileRead = (file = LOG_FILE) => fs.readFileSync(filePath(file), "utf-8")
const fileWrite = (data = null, file = LOG_FILE) => fs.writeFileSync(filePath(file), data, "utf-8")
const fileAppend = (data = null, file = LOG_FILE) => fs.appendFileSync(filePath(file), data, "utf-8")

//* Generate Value Helpers
const genFloat = (max = 1) => random() * max
const genInt = (max = MAX) => ~~(genFloat(max) - max) + max
const genBool = () => random() > 0.5
const genCoin = (v1 = true, v2 = false) => (genBool(v1) ? v1 : v2)
const genId = () => `${parseInt((`${genInt(1000000)}`, 36))}`
const genKey = () => "_" + genId().replace(/[a-z]/gim, "")
const genArr = (l = ARRAY_SIZE, fn = genFloat) => Array(l).map(() => fn())
const genSort = (v = null) => isLen(v, 2) && v.sort(() => genCoin(1, -1))
const genIndex = (v = null) => isLen(v, 2) && genInt(getIndexLast(v), 0)
const genElement = (v = null) => isLen(v, 2) && v?.[genIndex(v)]
const genElementsMany = (v = null, size = 3) => genArr(size).map(() => genElement(v))
const genObjectKey = (v) => genElement(Object.keys(v) || [])
const genObjectValue = (v) => genElement(Object.values(v) || [])
const genObjectEntry = (v) => genElement(Object.entries(v) || [])

//* Get Value Helpers
const getIndexLast = ({ length = false }) => length && (length > 0 ? length - 1 : length)
const getElementLast = (a = null) => isLen(a, 2) && a[getIndexLast(a)]
const getPart = (v = null, start = 0, end = getIndexLast(v)) => isLen(v, 2) && v.slice(start, end).filter(Boolean)
const getPartNeighbours = (a = null, i = 0, l = 1) => getPart(a, i - l, i + l)
const getPartNext = (a = null, i = 0, l = 1) => getPart(a, i, i + l)
const getSplitted = (s = null, ch = null, l = 0) => (isStr(s) ? s.split(ch).filter((v) => v?.length >= l) : [])
const getChars = (s = null) => getSplitted(s, "")
const getWords = (s = null, l = 3) => getSplitted(s, " ")
const getPhrases = (s = null, l = 3) => getSplitted(s, ".")
const getLines = (s = null, l = 3) => getSplitted(s, "\n")
const getWordFirst = (text = null) => getWords(text)[0]
const getWordLast = (text = null) => getWords(text).reverse()[0]
const getWordsSequence = (s = null, w = null, size = 3) => s.match(new RegExp(w + `.\\w+.`.repeat(size)))
const getWordNextNeigbours = (s = null, w, size = 3) => s.match(new RegExp(w + `.\\w+.`.repeat(size)))
const getWordPrevNeigbours = (s = null, w, size = 3) => s.match(new RegExp(`.\\w+.`.repeat(size) + w))
const getPhraseFromWords = (v = null) => isLen(v, 2) && reduceText(genElementsMany(v, genInt(15, 5)))
const getPhrasesWithWord = (w = null, v = null) => isLen(v, 2) && v.filter((p) => p.includes(w))
const getPhrasesStartsWith = (w = null, v = null) => isLen(v, 2) && v.filter((p) => p.startsWith(w))
const getPhrasesEndsWith = (w = null, v = null) => isLen(v, 2) && v.filter((p) => p.endsWith(w))

//* Array Reducers
const reduceText = (v = null) => isLen(v, 2) && v.reduce((a, el) => `${a} ${el}`, "")
const reduceSum = (v = null) => isLen(v, 2) && v.filter(Number).reduce((a, el) => a + el, 0)
const reduceMult = (v = null) => isLen(v, 2) && v.filter(Number).reduce((a, el) => a + el * 2, 0)
const reduceAverage = (v = null) => isLen(v, 2) && reduceSum(v) / v.length
const reduceDiff = (v = null) => isLen(v, 2) && _max(...v) - _min(...v)
const reduceObj = (v = null) => isLen(v, 2) && v.reduce((acc, value, index) => [...acc, { value, index }], [])

//* Converters
const toArray = (v = null) => (isArr(v) ? v : [v])
const toObj = (value = null) => (isObj(value) ? value : { value })
const toText = (v = null) => (isObj(v) ? toJson(v) : isArr(v) ? v.join("\n") : `${v}`)
const toKeys = (v = null) => (isDefined(v) ? Object.getOwnPropertyNames(v) : [])
const toNumRange = (...v) => [_min(...v), _max(...v)]
const toNumLike = (v = 0, coff = LIKE_DIFF) => [v - coff, v + coff]
const toTrim = (v = null) => (typeof v === "string" ? v : `${v}`).trim()
const toJoin = (...v) => [DIV_SEP, ...v, DIV_SEP].join(DIV_JOIN)
const toUnical = (v = null) => isLen(v, 2) && [...new Set([...v])]
const toRepeat = (v = null, r = 2) => (isStr(v) ? v : toText(v)).repeat(r)
const toReversed = (v = null) => (isArr(v) ? v.reverse() : isStr(v) ? v.split().reverse().join() : null)
const toBuffer = (v = null) => v && Buffer.from(v)
const toFloatFixed = (v, l = 2) => Number((typeof v === "number" ? v : ~~v).toFixed(l))
const toTrainingData = (input = null, output = null) => ({ input, output })
const toFormatted = (text = null, replacer = null) => `${text}`.trim().replace(/[^а-я\s\n]+/gim, replacer)
const toRangeWithDiff = (v = 0, c = LIKE_DIFF) => [v + c, v - c]
const toPercent = (v1 = 100, v2 = 1) => ~~(v2 / (~~v1 / 100))
const toInput = (l = INPUT_SIZE) => genArr(l, genArr)
const toResultStats = (v = null) => `Expected: ${v?.output}, Received: ${v?.result}, Values: ${v?.input}`.trim()
const toResultProps = (v = null) => isObj(v) && { ...v, ...isTruthy(v), desc: toResultStats(v) }
const toTitleCase = (s = null) => isStr(s) && s[0].toUpperCase() + s.slice(1).toLowerCase().trim()
const toJson = (value = null) => JSON.stringify({ value }, null, 2)

//* Validators
const isTruthy = (v = null) => !!v
const isDefined = (v = false) => v !== undefined && v !== null
const isNum = (v = null) => typeof v === "number"
const isStr = (v = null) => typeof v === "string"
const isFunc = (fn = null) => typeof fn === "function"
const isArr = (v = null) => isDefined(v) && typeof v === "object" && Array.isArray(v)
const isObj = (v = null) => isDefined(v) && typeof v === "object" && !Array.isArray(v) && Object.keys(v).length > 0
const isLen = (v = null, l = 0) => isDefined(v?.length) && v?.length >= l
const isKey = (v = null, p = null) => isDefined(v) && toKeys(v).includes(p)
const isType = (v1 = null, v2 = null) => typeof v1 === v2
const isEqual = (v1 = null, v2 = null) => isType(v1, v2) && toText(v1) === toText(v2)
const isNumBetween = (v = null, range = RANGE) => isDefined(v) && !!v && v > _min(...range) && v < _max(...range)

//* Regular Expressions
const toRxp = (...v) => new RegExp(...v)
const toRxpNext = (w = "", t = 1) => toRxp(w + `[^а-яa-z]{0,}[а-яa-z]{0,}`.repeat(t), "i")
const toMatchLineWithWord = (s = "", w = "") => isStr(s) && s.match(toRxp(`^.{0,}${w}[^$]+$`))
const toMatchWordSequence = (s = "", w = "", l = 1) => isStr(s) && s.match(toRxpNext(w, l))
const toMatchWordLast = (s = "") => isStr(s) && s.match(/(\B[а-яa-z]+\B)$/i)
const toMatchChars = (s = "") => isStr(s) && s.match(/\B([а-яa-z])\B/gim)
const toMatchWords = (s = "") => isStr(s) && s.match(/\B([а-яa-z]+)\B/gim)
const toMatchPhrases = (s = "") => isStr(s) && s.match(/.+\.|.+$/gim)
const toMatchLines = (s = "") => isStr(s) && s.match(/.+\n|^.+$/gim)
