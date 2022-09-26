const textTable = require("text-table")
const fs = require("fs")
const { join: _join } = require("path")
const util = require("util")
const gradient = require("gradient-string")
const chalk = require("chalk")
const O = require("json-stringify-safe")
const S = require("string")
const A = require("arr")
const { say, think } = require("cowsay")
const { print: lolcat, rainbow } = require("lolcats")
const { vice, instagram, atlas } = require("gradient-string")

const { now: _now } = Date
const { cwd, env } = process
const { parse } = JSON
const { format: _format, isDeepStrictEqual: _isDeepEqual } = util
const { log: _log, info: _info, warn: _warn, error: _error, debug: _debug, timeLog: _timeLog } = console
const { random: rand, min: _min, max: _max, abs: _abs, round: _round } = Math
const {
	keys: _keys,
	values: _values,
	entries: _entries,
	assign: _assign,
	getOwnPropertyNames: _names,
	fromEntries: _from
} = Object
const { isArray } = Array
const { fromCharCode: _fromCharCode } = String
const { MAX_SAFE_INTEGER: _MAX_SAFE, MIN_SAFE_INTEGER: _MIN_SAFE, MAX: _MAX_VALUE, MIN: _MIN_VALUE } = Number

const UND = undefined
const SYM = Symbol("Example Symbol")
const BIG = _MAX_VALUE
const NULL = null
const STR = "Some string value"
const ERR = new Error("Example Error")
const RND = rand()
const NUM = ~~(rand() * 1000)
const BLN = RND > 0.5
const ARR = [STR, NUM]
const OBJ = { STR, NUM }
const FUNC = (...values) => values
const VALUES_SOURCES = [
	{ value: NULL, desc: "NULL" },
	{ value: STR, desc: "STR" },
	{ value: ERR, desc: "ERR" },
	{ value: RND, desc: "RND" },
	{ value: NUM, desc: "NUM" },
	{ value: BLN, desc: "BLN" },
	{ value: ARR, desc: "ARR" },
	{ value: OBJ, desc: "OBJ" },
	{ value: FUNC, desc: "FUNC" }
].map((src, index) => {
	const obj = { ...src, index, type: typeof src.value, callback: () => src.value }
	const entries = _entries(obj)
	const text = entries.map(([k, v]) => [k, v].map(S))
	return { ...obj, text }
})
const VALUES = VALUES_SOURCES.reduce((acc, v) => [...acc, v.value], [])
const TYPEOF = ["string", "number", "function", "object", "boolean", "bigint", "symbol", "undefined"]
const DECORATE_SOURCES = [
	{ desc: "console log", func: (text) => _log(text) },
	{ desc: "console info", func: (text) => _info(text) },
	{ desc: "console warn", func: (text) => _warn(text) },
	{ desc: "console error", func: (text) => _error(text) },
	{ desc: "console debug", func: (text) => _debug(text) },
	{ desc: "atlas gradient", func: (text) => _log(gradient.atlas(text)) },
	{ desc: "cristal gradient", func: (text) => _log(gradient.cristal(text)) },
	{ desc: "teen gradient", func: (text) => _log(gradient.teen(text)) },
	{ desc: "mind gradient", func: (text) => _log(gradient.mind(text)) },
	{ desc: "morning gradient", func: (text) => _log(gradient.morning(text)) },
	{ desc: "vice gradient", func: (text) => _log(gradient.vice(text)) },
	{ desc: "passion gradient", func: (text) => _log(gradient.passion(text)) },
	{ desc: "fruit gradient", func: (text) => _log(gradient.fruit(text)) },
	{ desc: "instagram gradient", func: (text) => _log(gradient.instagram(text)) },
	{ desc: "retro gradient", func: (text) => _log(gradient.retro(text)) },
	{ desc: "summer gradient", func: (text) => _log(gradient.summer(text)) },
	{ desc: "rainbow gradient", func: (text) => _log(gradient.rainbow(text)) },
	{ desc: "pastel gradient", func: (text) => _log(gradient.pastel(text)) },
	{ desc: "red color", func: (text) => _log(chalk.red(text)) },
	{ desc: "blue color", func: (text) => _log(chalk.blue(text)) },
	{ desc: "underline color", func: (text) => _log(chalk.underline(text)) },
	{ desc: "green color", func: (text) => _log(chalk.green(text)) },
	{ desc: "yellow color", func: (text) => _log(chalk.yellow(text)) },
	{ desc: "rainbow color", func: (text) => _log(rainbow(text)) },
	{ desc: "cow say", func: (text) => _log(say({ text })) },
	{ desc: "cow think", func: (text) => _log(think({ text })) },
	{ desc: "cow random say", func: (text) => _log(say({ text, r: true })) },
	{ desc: "cow random think", func: (text) => _log(think({ text, r: true })) }
]
const DECORATE_METHODS = _from(DECORATE_SOURCES.reduce((acc, { desc, func }) => [...acc, [desc, func]], []))
const CHAR_LINE = "\n"
const CHAR_TAB = "\t"
const CHAR_SPACE = " "
const CHAR_COMMA = ","
const CHAR_DOT = "."
const CHAR_DIV = "#"
const CHARS_ENG = "abcdefghijklmnopqrstuvwxyz"
const CHARS_RUS = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
const CHARS_NUM = "0123456789"
const CHARS_SIMPLE = CHARS_ENG + CHARS_RUS + CHARS_NUM
const CHARS_SPECIAL = CHAR_LINE + CHAR_TAB + CHAR_SPACE + CHAR_COMMA + CHAR_DOT + CHAR_DIV
const CHARS_VALID = CHARS_SIMPLE + CHARS_SPECIAL
const DIV_CONTENT = `\n${CHAR_DIV.repeat(30)}\n`
const DIV_LINE = `\n${CHAR_DIV.repeat(20)}\n`
const DIV_TITLE = `\t${CHAR_DIV.repeat(5)}\t`
const MIN = 1
const MAX = 2000
const RANGE = [MIN, MAX]
const RANGE_LENGTH = [MIN, MAX]
const ARRAY_SIZE = 10
const LIKE_DIFF = 0.1
const OPTIONS_FS = { encoding: "utf-8" }
const INPUT_SIZE = 1
const HIDDEN_SIZE = 3
const OUTPUT_SIZE = 1
const TRAIN_SET_SIZE = 1000
const LEARNING_RATE = 0.05
const ITERATIONS = 1000
const ERROR_THRESHOLD = 0.005
const LOG_PERIOD = 100
const OPTIONS_BRAIN_LSTM = { log: true }
const OPTIONS_BRAIN_TRAIN = {
	log: true,
	learningRate: LEARNING_RATE,
	iterations: ITERATIONS,
	errorThresh: ERROR_THRESHOLD,
	logPeriod: LOG_PERIOD,
	callback: _log
}

const ROOT = cwd()
const DIR = __dirname
const FILE = __filename
const TIME = new Date().toLocaleString()
const LOG_DIR = _join(__dirname, "logs")
const LOG_FILE = _join(LOG_DIR, "logs.log")
const CHAR_CODE_MULT = 256
const MAX_ENCODED_SIZE = 100

class Constants {
	static UND = UND
	static SYM = SYM
	static BIG = BIG
	static NULL = NULL
	static STR = STR
	static ERR = ERR
	static RND = RND
	static NUM = NUM
	static BLN = BLN
	static ARR = ARR
	static OBJ = OBJ
	static FUNC = FUNC
	static VALUES_SOURCES = VALUES_SOURCES
	static VALUES = VALUES
	static TYPEOF = TYPEOF
	static DECORATE_SOURCES = DECORATE_SOURCES
	static DECORATE_METHODS = DECORATE_METHODS
	static CHAR_LINE = CHAR_LINE
	static CHAR_TAB = CHAR_TAB
	static CHAR_SPACE = CHAR_SPACE
	static CHAR_COMMA = CHAR_COMMA
	static CHAR_DOT = CHAR_DOT
	static CHAR_DIV = CHAR_DIV
	static CHARS_ENG = CHARS_ENG
	static CHARS_RUS = CHARS_RUS
	static CHARS_NUM = CHARS_NUM
	static CHARS_SIMPLE = CHARS_SIMPLE
	static CHARS_SPECIAL = CHARS_SPECIAL
	static CHARS_VALID = CHARS_VALID
	static DIV_CONTENT = DIV_CONTENT
	static DIV_LINE = DIV_LINE
	static DIV_TITLE = DIV_TITLE
	static MIN = MIN
	static MAX = MAX
	static RANGE = RANGE
	static RANGE_LENGTH = RANGE_LENGTH
	static ARRAY_SIZE = ARRAY_SIZE
	static LIKE_DIFF = LIKE_DIFF
	static OPTIONS_FS = OPTIONS_FS
	static INPUT_SIZE = INPUT_SIZE
	static HIDDEN_SIZE = HIDDEN_SIZE
	static OUTPUT_SIZE = OUTPUT_SIZE
	static TRAIN_SET_SIZE = TRAIN_SET_SIZE
	static LEARNING_RATE = LEARNING_RATE
	static ITERATIONS = ITERATIONS
	static ERROR_THRESHOLD = ERROR_THRESHOLD
	static LOG_PERIOD = LOG_PERIOD
	static OPTIONS_BRAIN_LSTM = OPTIONS_BRAIN_LSTM
	static OPTIONS_BRAIN_TRAIN = OPTIONS_BRAIN_TRAIN
	static ROOT = ROOT
	static DIR = DIR
	static FILE = FILE
	static TIME = TIME
	static LOG_DIR = LOG_DIR
	static LOG_FILE = LOG_FILE
	static CHAR_CODE_MULT = CHAR_CODE_MULT
	static MAX_ENCODED_SIZE = MAX_ENCODED_SIZE
}

const getLogExamples = () => DECORATE_SOURCES.map(({ desc, func }) => func(`Example of ${desc} log message.`))
const getTimestamp = () => new Date().toLocaleString()
const getSource = (msg = "") => `\n\t${__filename}\n\t${getTimestamp()}\n\t${msg}\n`

const toStr = (...v) => v.map(S)
const toArr = (v) => (isArr(v) ? v : [v])
const toObj = (v) => (isObj(v) ? v : { value: v })
const toNum = (v) => (isNum(v) ? v : ~~v)
const toJson = (...v) => O(v, null, 2)
const toFunc = (v) => (typeof v === "function" ? v : () => v)
const toType = (v) => (TYPEOF.includes(v) ? v : typeof v)

const showLog = (...values) => _log(toJson({ values, level: "Log" }))
const showInfo = (...values) => _info(toJson({ values, level: "Info" }))
const showWarn = (...values) => _warn(toJson({ values, level: "Warn" }))
const showError = (...values) => _error(toJson({ values, level: "Error" }))
const showDebug = (...values) => _debug(toJson({ values, level: "Debug" }))
const showTime = (...values) => _timeLog(toJson({ values, level: "Time" }))

const is = (...a) => a.every((v) => !!v)
const isLen = (...a) => a.every((v) => typeof v?.length === "number")
const isLenMin = (v, l = MIN) => isLen(v) && v.length >= l
const isLenMax = (v, l = MAX) => isLen(v) && v.length <= l
const isLenRange = (v, min = MIN, max = MAX) => isLenMin(v, min) && isLenMax(v, max)
const isNum = (...a) => a.every((v) => typeof v === "number")
const isStr = (...a) => a.every((v) => typeof v === "string")
const isFunc = (...a) => a.every((v) => typeof v === "function")
const isBool = (...a) => a.every((v) => typeof v === "boolean")
const isBig = (...a) => a.every((v) => typeof v === "bigint")
const isSym = (...a) => a.every((v) => typeof v === "symbol")
const isUnd = (...a) => a.every((v) => typeof v === "undefined")
const isArr = (...a) => a.every((v) => typeof v === "object" && !!v && isArray(v))
const isObj = (...a) => a.every((v) => typeof v === "object" && !!v && !isArray(v))
const isRxp = (v) => v instanceof RegExp
const isExist = (...a) => a.every((v) => v !== null && v !== undefined)
const isEqualType = (v1, v2) => typeof v1 === typeof v2
const isEqualStrict = (v1, v2) => _isDeepEqual(v1, v2)
const isEvery = (a1, ...a2) => isArr(a1, a2) && a1.every((v1) => a2.includes(v1))
const isSome = (a1, ...a2) => isArr(a1, a2) && a1.some((v1) => a2.includes(v1))

const strHumanize = (v) => isStr(v) && S(v).humanize().s
const strLines = (v) => isStr(v) && S(v).lines().s
const strCollapseWhitespace = (v) => isStr(v) && S(v).collapseWhitespace().s
const strTitleCase = (v) => isStr(v) && S(v).titleCase().s
const strTrim = (v) => isStr(v) && S(v).trim().s
const strSay = (v) => isStr(v) && say({ text })
const strThink = (v) => isStr(v) && think({ text })
const strSayRandom = (v) => isStr(v) && say({ text, r: true })
const strThinkRandom = (v) => isStr(v) && think({ text, r: true })
const strRainbow = (v) => isStr(v) && rainbow(text)
const strAtlas = (v) => isStr(v) && atlas(text)
const strInstagram = (v) => isStr(v) && instagram(text)
const strVice = (v) => isStr(v) && vice(text)
const strTable = (...v) => textTable(v, { align: ["l", "c"] })

const arrUnical = (v) => (isArr(v) ? [...new Set([...v])] : [v])
const arrLastIndex = (v) => isArr(v) && A.lastIndex(v)
const arrFindLast = (v) => isArr(v) && A.findLast(v)
const arrNumbers = (v) => isArr(v) && A.numbers(v)
const arrStrings = (v) => isArr(v) && A.strings(v)
const arrObjects = (v) => isArr(v) && A.objects(v)
const arrFunctions = (v) => isArr(v) && A.functions(v)
const arrArrays = (v) => isArr(v) && A.arrays(v)
const arrFirst = (v) => isArr(v) && A.first(v)
const arrLast = (v) => isArr(v) && A.last(v)
const arrFindFirst = (v) => isArr(v) && A.findFirst(v)
const arrHasType = (v) => isArr(v) && A.hasType(v)

const strToMaxLen = (v, max = MAX) => isStr(v) && (v.length > max ? v.slice(0, min) : v)
const strToMinLen = (v, min = MIN) => isStr(v) && (v.length < min ? v.padEnd(min, " ") : v)
const strToMatchLen = (v, l) => isStr(v) && strToMinLen(strToMaxLen(v, l), l)

const toCharCode = (char) => isStr(char) && char.charAtInt(0) / CHAR_CODE_MULT
const toCharFromCode = (code) => isNum(code) && _fromCharCode(code) * CHAR_CODE_MULT
const toCharCodeFromText = (text, size = MAX_ENCODED_SIZE) => {
	if (!isStr(text)) return false
	const values = text.split("").reduce((acc, v) => [...acc, toCharCode(v)], [])
	return strToMaxLen(values, size)
}

const filePath = (...paths) => _join(__dirname, ...paths)
const fileList = (dir = LOG_DIR) => isStr(dir) && fs.readdirSync(filePath(dir))
const fileRead = (file = LOG_FILE) => isStr(file) && fs.readFileSync(filePath(file), OPTIONS_FS).toString()
const fileWrite = (file, data = "") => isStr(file, data) && fs.writeFileSync(filePath(file), data, OPTIONS_FS)
const fileAppend = (file, data = "") => isStr(file, data) && fs.appendFileSync(filePath(file), data, OPTIONS_FS)
const fileCheck = (p = "") => isStr(p) && fs.existsSync(filePath(p))
const fileStats = (p = "") => isStr(p) && fs.statSync(filePath(p))
const fileMkdir = (p = "") => isStr(p) && !fileCheck(p) && fs.mkdirSync(filePath(p))

const randStr = () => rand().toString(36).substring(7)
const randBool = () => rand() > 0.5
const randInt = (max = MAX, min = MIN) => ~~(rand() * max - min) + min
const randCoin = (v1 = true, v2 = false) => (randBool() ? v1 : v2)
const randId = () => `${parseInt(`${randInt()}`, 36)}`
const randKey = () => randId().repeat(5).replace(/[a-z]/gim, "")
const randArr = (l = ARRAY_SIZE, v = 1) => Array(~~l).fill(v)
const randObj = (size = ARRAY_SIZE) => _from(randArr(size).map(() => [randStr(), rand()]))
const randMany = (l = ARRAY_SIZE, cb = rand) => randArr(l).map(isFunc(cb) ? cb : () => cb)
const randSort = (arr) => isArr(arr) && arr.sort(() => randCoin(1, -1))
const randIndex = (v) => (isLen(v) && v.length > 2 ? randInt(v.length - 1, 0) : randCoin(1, 0))
const randElement = (v) => isLen(v) && v[randIndex(v)]
const randElementsMany = (v, l = ARRAY_SIZE) => randMany(l, () => randElement(v))
const randObjKey = (v) => isObj(v) && randElement(_keys(v))
const randObjValue = (v) => isObj(v) && randElement(_values(v))
const randObjEntry = (v) => isObj(v) && randElement(_entries(v))
const randCharCodeLatin = () => randInt(122, 97)
const randCharCodeKyrillic = () => randInt(1103, 1072)

const slice = (arr, i1 = 0, i2 = null) => {
	if (!isLenMin(arr, 1)) return false
	const start = isNum(i1) ? i1 : randInt(arrLastIndex(arr))
	const end = isNum(i2) ? i2 : randInt(arrLastIndex(arr), start)
	return arr.slice(start, end)
}
const arrNeigbours = (arr, el, size = 1) => {
	if (!isLenMin(arr, 1) || !arr.includes(el)) return false
	const i = arr.indexOf(el)
	const last = arrLastIndex(arr)
	const start = i - size > 0 ? i - size : 0
	const end = i + size < last ? i + size : last
	return arr.slice(start, end)
}

const arrElementNext = (arr, el = 0) => {
	if (!isLen(arr) || !arr.includes(el)) return false
	const i = arr.indexOf(el)
	const last = arrLastIndex(arr)
	return i < last ? arr[i + 1] : arrFirst(arr)
}
const arrElementPrev = (arr, el = 0) => {
	if (!isLen(arr) || !arr.includes(el)) return false
	const i = arr.indexOf(el)
	return i > 0 ? arr[i - 1] : arrLast(arr)
}

const strSplit = (str, ch = "", min = false) => {
	if (!isStr(str, ch)) return false
	const arr = str.split(ch)
	return isNum(min) ? arr.filter((el) => isLenMin(el, min)) : arr
}
const strChars = (s) => strSplit(s, "")
const strWords = (s, min = 3) => strSplit(s, " ", min).map((s) => s.trim())
const strPhrases = (s, min = 3) => strSplit(s, ".", min).map((s) => s.replace(".", "").trim())
// const strLines = (s, min = 3) => strSplit(s, "\n", min).map((s) => s.replace("\n", "").trim())
const strCharsUnical = (s) => arrUnical(strChars(s))
const strWordsUnical = (s, min = 3) => arrUnical(strWords(s, min))
const strPhrasesUnical = (s, min = 3) => arrUnical(strPhrases(s, min))
const strLinesUnical = (s, min = 3) => arrUnical(strLines(s, min))
const strWordFirst = (str) => isStr(str) && strWords(str)?.[0]
const strWordLast = (str) => isStr(str) && strWords(str).reverse()?.[0]

const randPhraseFromWords = (words, size = ARRAY_SIZE) => {
	if (!isArr(words, 1)) return false
	return randElementsMany(words, size).join(" ")
}
const getPhrasesWithWord = (arr, word) =>
	isArr(arr) && isStr(word) && arr.filter((el) => isStr(el) && el.includes(word))
const getPhrasesWithoutWord = (arr, word) =>
	isArr(arr) && isStr(word) && arr.filter((el) => isStr(el) && !el.includes(word))
const getPhrasesEndsWith = (arr, str) => isArr(arr) && isStr(str) && arr.filter((el) => isStr(el) && el.endsWith(str))
const getPhrasesStartsWith = (arr, str) =>
	isArr(arr) && isStr(str) && arr.filter((el) => isStr(el) && el.startsWith(str))
const getPhrasesByLength = (arr, l) => {
	if (!isArr(arr)) return false
	if (isNum(l)) return arr.filter((el) => el === l)
	if (isArr(l)) return arr.filter((el) => isLenRange(el, _min(...l), _max(...l)))
	return arr.filter(String)
}
const getPhrasesByIndex = (arr, l) => {
	if (!isArr(arr)) return false
	if (isArr(l)) return arr.filter((el, i) => isLenRange(i, _min(...l), _max(...l)))
	if (isNum(l)) return arr.filter((el, i) => i === l)
	return arr.filter(String)
}
const reduceText = (a, v) => a + toJson(v)
const reduceSum = (a, v) => a + v
const reduceElements = (a, v, i) => [...a, { value: v, index: i }]

const strToTitleCase = (s) => {
	if (!isStr(s, 1)) return false
	const str = s.trim().toLowerCase()
	return str.slice(0, 1).toUpperCase() + str.slice(1)
}

// Create log dir and file if it not exists
if (!fs.existsSync(LOG_DIR)) {
	fs.mkdirSync(LOG_DIR)
}
if (!fs.existsSync(LOG_FILE)) {
	fs.writeFileSync(LOG_FILE, getSource())
}

class Helpers extends Constants {
	static arrArrays = arrArrays
	static arrElementNext = arrElementNext
	static arrElementPrev = arrElementPrev
	static arrFindFirst = arrFindFirst
	static arrFindLast = arrFindLast
	static arrFirst = arrFirst
	static arrFunctions = arrFunctions
	static arrHasType = arrHasType
	static arrLast = arrLast
	static arrLastIndex = arrLastIndex
	static arrNumbers = arrNumbers
	static arrObjects = arrObjects
	static arrStrings = arrStrings
	static arrUnical = arrUnical
	static arrNeigbours = arrNeigbours

	static fileAppend = fileAppend
	static fileCheck = fileCheck
	static fileList = fileList
	static fileMkdir = fileMkdir
	static filePath = filePath
	static fileRead = fileRead
	static fileStats = fileStats
	static fileWrite = fileWrite

	static getLogExamples = getLogExamples
	static getPhrasesByIndex = getPhrasesByIndex
	static getPhrasesByLength = getPhrasesByLength
	static getPhrasesEndsWith = getPhrasesEndsWith
	static getPhrasesStartsWith = getPhrasesStartsWith
	static getPhrasesWithoutWord = getPhrasesWithoutWord
	static getPhrasesWithWord = getPhrasesWithWord
	static getSource = getSource
	static getTimestamp = getTimestamp

	static is = is
	static isArr = isArr
	static isBig = isBig
	static isBool = isBool
	static isEqualStrict = isEqualStrict
	static isEqualType = isEqualType
	static isEvery = isEvery
	static isExist = isExist
	static isFunc = isFunc
	static isLen = isLen
	static isLenMax = isLenMax
	static isLenMin = isLenMin
	static isLenRange = isLenRange
	static isNum = isNum
	static isObj = isObj
	static isRxp = isRxp
	static isSome = isSome
	static isStr = isStr
	static isSym = isSym
	static isUnd = isUnd

	static randArr = randArr
	static randBool = randBool
	static randCharCodeKyrillic = randCharCodeKyrillic
	static randCharCodeLatin = randCharCodeLatin
	static randCoin = randCoin
	static randElement = randElement
	static randElementsMany = randElementsMany
	static randId = randId
	static randIndex = randIndex
	static randInt = randInt
	static randKey = randKey
	static randMany = randMany
	static randObj = randObj
	static randObjEntry = randObjEntry
	static randObjKey = randObjKey
	static randObjValue = randObjValue
	static randPhraseFromWords = randPhraseFromWords
	static randSort = randSort
	static randStr = randStr
	static reduceElements = reduceElements
	static reduceSum = reduceSum
	static reduceText = reduceText

	static showDebug = showDebug
	static showError = showError
	static showInfo = showInfo
	static showLog = showLog
	static showTime = showTime
	static showWarn = showWarn

	static strAtlas = strAtlas
	static strChars = strChars
	static strCharsUnical = strCharsUnical
	static strCollapseWhitespace = strCollapseWhitespace
	static strHumanize = strHumanize
	static strInstagram = strInstagram
	static strLines = strLines
	static strLinesUnical = strLinesUnical
	static strPhrases = strPhrases
	static strPhrasesUnical = strPhrasesUnical
	static strRainbow = strRainbow
	static strSay = strSay
	static strSayRandom = strSayRandom
	static strSplit = strSplit
	static strTable = strTable
	static strThink = strThink
	static strThinkRandom = strThinkRandom
	static strTitleCase = strTitleCase
	static strToMatchLen = strToMatchLen
	static strToMaxLen = strToMaxLen
	static strToMinLen = strToMinLen
	static strToTitleCase = strToTitleCase
	static strTrim = strTrim
	static strVice = strVice
	static strWordFirst = strWordFirst
	static strWordLast = strWordLast
	static strWords = strWords
	static strWordsUnical = strWordsUnical

	static toArr = toArr
	static toCharCode = toCharCode
	static toCharCodeFromText = toCharCodeFromText
	static toCharFromCode = toCharFromCode
	static toFunc = toFunc
	static toJson = toJson
	static toNum = toNum
	static toObj = toObj
	static toStr = toStr
	static toType = toType
}

module.exports = Helpers
