const fs = require("fs")
const path = require("path")
const util = require("util")
const cowsay = require("cowsay")
const gradientString = require("gradient-string")
const chalk = require("chalk")
const { rainbow, print } = require("lolcats")
const {
	readdirSync: _readdir,
	readFileSync: _readFile,
	writeFileSync: _writeFile,
	appendFileSync: _appendFile,
	mkdirSync: _mkdir
} = fs
const { now: _now } = Date
const { MAX_SAFE_INTEGER, MIN_SAFE_INTEGER, MAX_VALUE, MIN_VALUE } = Number
const { cwd: _cwd, env: _env } = process
const { parse: _parse, stringify: _stringify } = JSON
const { format: _format, isDeepStrictEqual: _isEqual } = util
const { log: _log, warn: _warn, info: _info, error: _error, table: _table, timeStamp: _timeStamp } = console
const { random: _random, min: _min, max: _max, abs: _abs, round: _round } = Math
const { keys: _keys, values: _values, entries: _entries, assign: _assign, getOwnPropertyNames: _names } = Object
const { isArray: _isArray } = Array
const { fromCharCode: _fromCharCode } = String

const UND = undefined
const NULL = null
const STR = "Some string value"
const ERR = new Error(STR)
const RND = _random()
const NUM = ~~(RND * 1000)
const BLN = RND > 0.5
const ARR = [STR, NUM]
const OBJ = { STR, NUM }
const SYM = Symbol("Symbol example")
const BIG = NUM * MAX_VALUE
const FUNC = (...values) => values
const VALUES_SOURCES = [
	{ value: UND, desc: "UND" },
	{ value: NULL, desc: "NULL" },
	{ value: STR, desc: "STR" },
	{ value: ERR, desc: "ERR" },
	{ value: RND, desc: "RND" },
	{ value: NUM, desc: "NUM" },
	{ value: BLN, desc: "BLN" },
	{ value: ARR, desc: "ARR" },
	{ value: OBJ, desc: "OBJ" },
	{ value: SYM, desc: "SYM" },
	{ value: BIG, desc: "BIG" },
	{ value: FUNC, desc: "FUNC" }
].map((src, index) => ({ ...src, index, type: typeof src.value, callback: () => src.value }))
const VALUES = VALUES_SOURCES.reduce((acc, v) => [...acc, v.value], [])
const TYPEOF_VALUES = ["string", "number", "function", "object", "boolean", "bigint", "symbol", "undefined"]

const CONSOLE_METHODS = ["log", "info", "warn", "error", "dir", "debug"]
const GRADIENT_METHODS = [
	"atlas",
	"cristal",
	"teen",
	"mind",
	"morning",
	"vice",
	"passion",
	"fruit",
	"instagram",
	"retro",
	"summer",
	"rainbow",
	"pastel"
]
const COLOR_METHODS = ["blue", "red", "blue", "blue", "red", "underline", "green", "blue", "red", "green", "yellow"]

const CONSOLE_SOURCES = CONSOLE_METHODS.map((desc) => {
	const callback = console[desc]
	const logger = callback
	return { desc, callback, logger }
})
const GRADIENTS_SOURCES = GRADIENT_METHODS.map((desc) => {
	const callback = gradientString[desc]
	const logger = (...v) => _log(callback(...v))
	return { desc, callback, logger }
})
const COLORED_SOURCES = COLOR_METHODS.map((desc) => {
	const callback = chalk[desc]
	const logger = (...v) => _log(callback(...v))
	return { desc, callback, logger }
})
const CONSOLE_OTHER_SOURCES = [
	{ desc: "lolcat_print", callback: print, logger: print },
	{ desc: "lolcat_rainbow", callback: rainbow, logger: (...v) => _log(rainbow(toText(v))) },
	{ desc: "cow_say", callback: cowsay.say, logger: (...v) => _log(cowsay.say({ text: toText(v) })) },
	{ desc: "cow_think", callback: cowsay.think, logger: (...v) => _log(cowsay.think({ text: toText(v) })) }
]
const LOGGER_SOURCES = [...CONSOLE_SOURCES, ...GRADIENTS_SOURCES, ...COLORED_SOURCES, ...CONSOLE_OTHER_SOURCES]

const _logGradient = LOGGER_SOURCES.find((el) => el.desc === "atlas").logger
const _logColored = LOGGER_SOURCES.find((el) => el.desc === "green").logger
const _logLolcatPrint = LOGGER_SOURCES.find((el) => el.desc === "lolcat_print").logger
const _logLolcatRainbow = LOGGER_SOURCES.find((el) => el.desc === "lolcat_rainbow").logger
const _logCowSay = LOGGER_SOURCES.find((el) => el.desc === "cow_say").logger
const _logCowThink = LOGGER_SOURCES.find((el) => el.desc === "cow_think").logger
const _logDefault = _logCowSay
const _logJson = (...values) => _logDefault(values)
const _logValues = (...values) => _logDefault(values)
const _logExamples = (msg = SOURCE) => {
	_log("Simple console log message", msg)
	_logGradient("_logGradient example", msg)
	_logColored("_logColored example", msg)
	_logLolcatPrint("_logLolcatPrint example", msg)
	_logLolcatRainbow("_logLolcatRainbow example", msg)
	_logCowSay("_logCowSay example", msg)
	_logCowThink("_logCowThink example", msg)
	_logJson("_logJson example", msg)
	_logValues("_logValues example", msg)
	LOGGER_SOURCES.map(({ logger, desc }) => logger(`${desc} example`, msg))
}

//* Validators

const is = (...arr) => arr.every((el) => !!el)
const isTypeStr = (...arr) => arr.every((el) => typeof el === "string")
const isTypeNum = (...arr) => arr.every((el) => typeof el === "number")
const isTypeFunc = (...arr) => arr.every((el) => typeof el === "function")
const isTypeObj = (...arr) => arr.every((el) => typeof el === "object")
const isTypeBool = (...arr) => arr.every((el) => typeof el === "boolean")
const isTypeBig = (...arr) => arr.every((el) => typeof el === "bigint")
const isTypeSym = (...arr) => arr.every((el) => typeof el === "symbol")
const isTypeUnd = (...arr) => arr.every((el) => typeof el === "undefined")
const isLen = (...arr) => arr.every((el) => typeof el?.length === "number")
const isDefined = (...arr) => arr.every((el) => el !== null && el !== undefined)
const isTypeObjTruthy = (...arr) => arr.every((el) => !!el && isTypeObj(el))
const isTypeOfValue = (...arr) => isTypeStr(...arr) && arr.every((el) => TYPEOF_VALUES.includes(el))
const toTypeOf = (v) => (isTypeOfValue(v) ? v : typeof v)
const isType = (v1, v2) => toTypeOf(v1) === toTypeOf(v2)
const isEvery = (v, ...arr) => (_isArray(v) ? v.every((el) => arr.includes(el)) : arr.every((el) => el === v))
const isSome = (v, ...arr) => (_isArray(v) ? v.some((el) => arr.includes(el)) : arr.some((el) => el === v))

const getTimeStamp = () => new Date().toLocaleString()
const getSource = (msg = "") => `\n\t${__filename}\n\t${getTimeStamp()}\n\t${msg}\n`

//* File System Helpers
const TIME = getTimeStamp()
const SOURCE = getSource()
const ROOT = _cwd()
const DIR = __dirname
const FILE = __filename
const NAME_TEMP = `logs_temp`

const LOG_DIR = "logs"
const LOG_FILE = NAME_TEMP + ".log"
const PATH_LOG_DIR = path.join(__dirname, "./", LOG_DIR)
const PATH_LOG_FILE = path.join(PATH_LOG_DIR, LOG_FILE)

const CHAR_CODE_MULT = 256
const MAX_ENCODED_SIZE = 100

const toMaxLen = (v, max = MAX_LENGTH) => (isLen(v) && v.length > max ? v.slice(0, max) : v)
const toMinLen = (v, min = MIN_LENGTH) => (isLen(v) && v.length < min ? [...v, ...genArr(v.length - min, 0)] : v)
const toMatchLen = (v, l) => (isLen(v) && v.length === l ? v : toMaxLen(toMinLen(v, l), l))

const toCharCode = (char) => isTypeStr(char) && char.charCodeAt(0) / CHAR_CODE_MULT
const toCharFromCode = (code) => isTypeNum(code) && _fromCharCode(code) * CHAR_CODE_MULT
const toCharCodeFromText = (text) => {
	if (!isTypeStr(text)) return false
	const values = text.split("").reduce((acc, v) => [...acc, toCharCode(v)], [])
	return toMaxLen(values, MAX_ENCODED_SIZE)
}

//* Chars
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

const CHAR_CODE_SOURCES = CHARS_VALID.split("").map((char) => ({ char, code: toCharCode(char) }))
const CHAR_CODE_VALUES = [...new Set([...CHAR_CODE_SOURCES.reduce((acc, v) => [...acc, v.code], []).filter(Number)])]

//* Dividers
const DIV_CONTENT = `\n${CHAR_DIV.repeat(30)}\n`
const DIV_LINE = `\n${CHAR_DIV.repeat(20)}\n`
const DIV_TITLE = `\t${CHAR_DIV.repeat(5)}\t`

//* Constants
const MIN = 1
const MAX = 100
const MIN_LENGTH = 1
const MAX_LENGTH = 2000
const MIN_CHAR_CODE = _min(...CHAR_CODE_VALUES)
const MAX_CHAR_CODE = _max(...CHAR_CODE_VALUES)

const RANGE = [MIN, MAX]
const RANGE_LENGTH = [MIN_LENGTH, MAX_LENGTH]
const RANGE_CHAR_CODE = [MIN_CHAR_CODE, MAX_CHAR_CODE]

const ARRAY_SIZE = 10
const LIKE_DIFF = 0.1
const INPUT_SIZE = 1
const HIDDEN_SIZE = 3
const OUTPUT_SIZE = 1
const TRAIN_SET_SIZE = 1000
const LEARNING_RATE = 0.05

//* Options
const OPTIONS_FS = { encoding: "utf-8" }
const OPTIONS_BRAIN_LSTM = { log: true }
const ITERATIONS = 1000
const ERROR_THRESHOLD = 0.005
const LOG_PERIOD = 100
const OPTIONS_BRAIN_TRAIN = {
	log: true,
	learningRate: LEARNING_RATE,
	iterations: ITERATIONS,
	errorThresh: ERROR_THRESHOLD,
	logPeriod: LOG_PERIOD,
	callback: _info
}

const filePath = (...sArr) => path.join(__dirname, ...sArr)
const fileList = (s = LOG_DIR) => _readdir(filePath(s))
const fileRead = (s = LOG_FILE) => _readFile(filePath(s), OPTIONS_FS).toString()
const fileWrite = (file, data = getSource()) => isStr(file) && _writeFile(filePath(file), data, OPTIONS_FS)
const fileAppend = (file, data = getSource()) => isStr(file) && _appendFile(filePath(file), data, OPTIONS_FS)
const fileCreateDir = (dir = NAME_TEMP) => isStr(dir) && _mkdir(dir)

//* Generate Value Helpers
const genBool = () => _random() > 0.5
const gen = (max = null) => (max ? _random() * max : _random())
const genInt = (max = MAX, min = MIN) => (isTypeNum(max, min) ? ~~(_random() * max - min) + min : ~~(_random() * MAX))
const genCoin = (v1 = true, v2 = false) => (genBool() ? v1 : v2)
const genId = () => `${parseInt(`${genInt()}`, 36)}`
const genKey = () => genId().repeat(5).replace(/[a-z]/gim, "")
const genArr = (l = ARRAY_SIZE, v = 1) => Array(~~l).fill(v)
const genMany = (l = ARRAY_SIZE, cb = _random) => genArr(l).map(isTypeFunc(cb) ? cb : () => cb)
const genSort = () => genCoin(1, -1)
const genIndex = (v) => (isLen(v) && v.length > 2 ? genInt(v.length - 1, 0) : genCoin(1, 0))
const genElement = (v) => isLen(v) && v[genIndex(v)]

const genElementsMany = (v, l = ARRAY_SIZE) => genMany(l, () => genElement(v))
const genObjKey = (v) => isObj(v) && genElement(_keys(v))
const genObjValue = (v) => isObj(v) && genElement(_values(v))
const genObjEntry = (v) => isObj(v) && genElement(_entries(v))
const genChar = () => genElement(CHARS_VALID)
const genCharLatin = () => genElement(CHARS_ENG)
const genCharKyrillic = () => genElement(CHARS_RUS)
const genCharCode = () => genElement(CHAR_CODE_VALUES)
const genCharCodeLatin = () => genInt(122, 97)
const genCharCodeKyrillic = () => genInt(1103, 1072)
const genRgb = (hex) => {
	const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
	hex = hex.replace(shorthandRegex, function (m, r, g, b) {
		return r + r + g + g + b + b
	})
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	return result
		? {
				r: _round(parseInt(result[1], 16) / 2.55) / 100,
				g: _round(parseInt(result[2], 16) / 2.55) / 100,
				b: _round(parseInt(result[3], 16) / 2.55) / 100
		  }
		: null
}

const isRxp = (v) => v instanceof RegExp
const toCallback = (v) => (isTypeFunc(v) ? v : () => v)
const toLen = (v1) => (isLen(v1) ? v1.length : -1)
const isLenMin = (v, l = MIN_LENGTH) => isLen(v) && v.length >= l
const isLenMax = (v, l = MAX_LENGTH) => isLen(v) && v.length <= l
const isLenEqual = (v1, v2) => isLen(v1, v2) && v1.length === v2.length
const isLenRange = (v1, min = 0, max = MAX_VALUE) => isLen(v1) && v1.length > min && v1.length < max
const isNum = (v1, min = 0, max = MAX_VALUE) => isTypeNum(v1) && v1 >= min && v1 < max
const isStr = (v1, min = 0, max = MAX_VALUE) => isTypeStr(v1) && isLenRange(v1, min, max)
const isArr = (v1, min = 0, max = MAX_VALUE) => isTypeObj(v1) && _isArray(v1) && isLenRange(v1, min, max)
const isObj = (v) => isTypeObj(v) && !_isArray(v) && is(v)
const isCharLatin = (ch) => isTypeStr(ch) && CHARS_ENG.includes(ch.toLowerCase())
const isCharKyrrylic = (ch) => isTypeStr(ch) && CHARS_RUS.includes(ch.toLowerCase())
const isCharNum = (ch) => isTypeStr(ch) && CHARS_NUM.includes(ch.toLowerCase())
const isCharSpecial = (ch) => isTypeStr(ch) && CHARS_SPECIAL.includes(ch.toLowerCase())
const isCharValid = (ch) => isTypeStr(ch) && CHARS_VALID.includes(ch.toLowerCase())
const isNumLike = (v1, v2, d = LIKE_DIFF) => isTypeNum(v1, v2, d) && v1 < v2 + d && v1 > v2 - d
const filterStr = (...values) => values.filter(String)
const filterNum = (...values) => values.filter(Number)
const filterArr = (...values) => values.filter(Array)
const filterBool = (...values) => values.filter(Boolean)
const filterFunc = (...values) => values.filter(Function)

//* Get Value Helpers
const or = (v1, v2) => v1 || v2
const and = (v1, v2) => v1 && v2
const like = (v1, ...values) => values.filter((el) => el == v1 || typeof el == typeof v1)
const not = (v1, ...values) => values.filter((el) => el !== v1 && typeof el !== typeof v1)

const getIndexLast = (v) => isLen(v) && _max(0, v.length - 1)
const getElementLast = (v) => isLen(v) && v?.[getIndexLast(v)]
const getSlice = (v, i1 = 0, i2 = null) => {
	if (!isLen(v)) return false
	const last = getIndexLast(v)
	const start = isNum(i1, last) ? i1 : genInt(last)
	const end = isNum(i2, last) ? i1 : genInt(last)
	const range = [i?.[0] ?? genIndex(v), i?.[1] ?? genIndex(v)]
	return v.slice(_min(...range, last), _max(...range))
}
const getElementNeighbours = (arr, el, l = 1) => {
	if (!isLen(arr) || !arr.includes(el)) return false
	const i = arr.indexOf(el)
	const last = getIndexLast(arr)
	const start = i > 0 ? i - 1 : 0
	const end = i < last ? i + 1 : last
	return arr.slice(start, end)
}
const getElementNext = (arr, el = 0) => {
	if (!isLen(arr) || !arr.includes(el)) return false
	const i = arr.indexOf(el)
	const last = getIndexLast(arr)
	return i < last ? arr[i + 1] : arr[0]
}
const getSplitted = (str, ch = "", min = false) => {
	if (!isStr(str, ch)) return false
	const arr = str.split(ch).filter(String)
	return min ? arr.filter((el) => isLenMin(el, min)) : arr
}
const getChars = (s) => getSplitted(s, "")
const getWords = (s, min = 1) => getSplitted(s, " ", min)
const getPhrases = (s, min = 1) => getSplitted(s, ".", min)
const getLines = (s, min = 1) => getSplitted(s, "\n", min)
const getWordFirst = (str) => getWords(str)?.[0]
const getWordLast = (str) => getWords(str).reverse()?.[0]
const genPhraseFromWords = (words, size = ARRAY_SIZE) => {
	if (!isArr(words, 1)) return false
	return genElementsMany(words, size).join(" ")
}
const getPhrasesWithWord = (a, w) => isArr(a) && isStr(w) && a.filter((el) => isStr(el) && el.includes(w))
const getPhrasesWithoutWord = (a, w) => isArr(a) && isStr(w) && a.filter((el) => isStr(el) && !el.includes(w))
const getPhrasesEndsWith = (a, s) => isArr(a) && isStr(s) && a.filter((el) => isStr(el) && el.endsWith(s))
const getPhrasesStartsWith = (a, s) => isArr(a) && isStr(s) && a.filter((el) => isStr(el) && el.startsWith(s))
const getPhrasesByLength = (a, l = RANGE_LENGTH) => {
	if (!isArr(a)) return false
	if (isTypeNum(l)) return a.filter((el) => el === l)
	if (isArr(l)) return a.filter((el) => isLenRange(el, _min(...l), _max(...l)))
	return a.filter(String)
}
const getPhrasesByIndex = (a, l = RANGE_LENGTH) => {
	if (!isArr(a)) return false
	if (isArr(l)) return a.filter((el, i) => isLenRange(i, _min(...l), _max(...l)))
	if (isTypeNum(l)) return a.filter((el, i) => i === l)
	return a.filter(String)
}

//* Array Reducers
const reduceText = (a, v) => `${a} ${v}`
const reduceSum = (a, v) => a + v
const reduceMult = (a, v) => a + v * 2
const reduceObj = (a, v, i) => [...a, { value: v, index: i }]
const reducePropValue = (a, v) => (is(v?.value) ? [...a, v?.value] : a)
const reducePropDesc = (a, v) => (is(v?.desc) ? [...a, v.desc] : a)
const reduceElementStats = (a, v) => a + "\n" + toResultStats(v)
const reduceElementKeys = (a, v) => (isObj(v) ? [...a, _keys(v)] : a)
const reduceElementValues = (a, v) => (isObj(v) ? [...a, _values(v)] : a)
const reduceElementEntries = (a, v) => (isObj(v) ? [...a, _entries(v)] : a)

//* Converters
const _toObj = (...v) => ({ values: v })
const _toArr = (...v) => v
const _toStr = (...v) => _stringify(_toObj(...v), null, 2)

const toArr = (v) => (isArr(v) ? v : [v])
const toObj = (v) => (isObj(v) ? v : { value: v })
const toText = (v) => _stringify(toObj(v), null, 2)
const toKeys = (v) => (isObj(v) ? _keys(v) : [])
const toNumDiff = (...v) => _max(...v) - _min(...v)
const toNumRange = (...v) => [_min(...v), _max(...v)]
const toTrim = (v) => (isTypeStr(v) ? v : toText(v)).trim()
const toTrimLine = (v = "") => isTypeStr(v) && v.replace(/\n/gim, " ")
const toUnical = (v) => (isArr(v) ? [...new Set([...v])] : [v])
const toJoin = (v, ch = "\n") => (isArr(v) ? v.join(isTypeStr(ch) ? ch : "\n") : toText(v))
const toRepeat = (v, r = 2) => (isTypeStr(v) ? v : toText(v)).repeat(isNum(r, 2) ? r : 2)
const toReversed = (v) => (isArr(v) ? v.reverse() : toText(v).split("").reverse().join(""))
const toBuffer = (v) => is(v) && Buffer.from(v)
const toFloatFixed = (v, l = 2) => (isTypeNum(v) ? Number(v.toFixed(~~l)) : 0)
const toTrainingData = (input, output, ...other) => ({ input, output, other })
const toFormatted = (s, r = "") => isTypeStr(s, r) && s.replace(/[^а-я\s\n]+/gim, r)
const toPercent = (v1, v2) => isTypeNum(v1, v2) && v2 / (v1 / 100)
const toResultStats = (v) => toText(v)
const toResultProps = (v) => _assign({}, toObj(v), { desc: toResultStats(v) })
const toTitleCase = (s) => {
	if (!isStr(s, 1)) return false
	const str = s.trim().toLowerCase()
	return str.slice(0, 1).toUpperCase() + str.slice(1)
}
const jsonParse = (v) => (isStr(v, 1) ? _parse(v) : false)
const jsonCreate = (...v) => _stringify(v, null, 2)
const toAverage = (...v) => {
	const a = v.flat().filter(Number)
	return a.length ? a.reduce(reduceSum) / a.length : 0
}

//* Regular Expressions
const toRxp = (str = "", flags = "im") => new RegExp(str, flags)
const toRxpNext = (word = "", rep = 1) => {
	const rxpString = word + `[^а-яa-z]{0,}[а-яa-z]{0,}`.repeat(rep)
	return new RegExp(rxpString, "gim")
}
const toMatchWordFirst = (str = "") => str.match(/^(\w+)\b/i)
const toMatchWordLast = (str = "") => str.match(/\b(\w+)$/i)
const toMatchLineWithWord = (str = "", word = "") => {
	if (!isStr(str)) return ""
	const rxp = toRxp(`^.+${word}.+$`, "im")
	const result = rxp.exec(str) ?? ""
	return result
}
const toMatchChars = (str = "") => {
	if (!isStr(str)) return []
	return str.split("").filter(String)
}
const toMatchWords = (str = "") => {
	if (!isStr(str)) return []
	return str
		.split(/\s|\n|\t|\b/gim)
		.filter((s) => isLenMin(s, 1))
		.map((s) => s.replace(/\s|\n|\t/, "").trim())
}
const toMatchPhrases = (str = "") => {
	if (!isStr(str)) return []
	return str
		.split(".")
		.filter((s) => isLenMin(s, 1))
		.map((s) => s.replace("\n", "").trim())
}
const toMatchLines = (str = "") => {
	if (!isStr(str)) return []
	return str
		.split("\n")
		.filter((s) => isLenMin(s, 1))
		.map((s) => s.replace("\n", "").trim())
}
const toMatchDividered = (str = "", div = CHAR_DIV) => {
	if (!isStr(str)) return []
	return str.split(div).filter((s) => isLenMin(s, 1))
}
const toMatchNextWords = (str = "", word = "", size = 2) => {
	if (!isStr(str) || !isStr(word) || !str.includes(word)) return ""
	const rxpString = word + ".\\b\\w+\\b".repeat(size)
	const rxp = new RegExp(rxpString, "im")
	const result = rxp.exec(str)
	return result?.[1] ?? ""
}
const toArrValues = (arr) =>
	isArr(arr, 1) && arr.map((value, index) => ({ value, index, text: value ? toText(value) : typeof value }))
const toNotUnical = (arr) => {
	if (!isArr(arr, 1)) return []
	const unical = toUnical(arr)
	return arr.filter((v) => unical.includes(v))
}
const isUnical = (el, arr) => {
	const notUnical = toNotUnical(arr)
	return notUnical.includes(el)
}
const replaceManyChars = (str) => {
	if (!isStr(str)) return false
	return str.replace(/\s+|\t+/gim, " ").replace(/\n+/gim, "\n")
}
const replaceChars = (str) => {
	if (!isStr(str)) return false
	const replaced = str.replace(/[^а-яa-z\s\n,.]/gim, " ")
	return replaceManyChars(replaced)
}
const getIndex = (src = "", el = "") => {
	if (!isLenMin(src) || !el) return -1
	return src.indexOf(el)
}
const getIndexAll = (arr, el) => {
	if (!isArr(arr) || !el) return []
	return arr.reduce((a, v, i) => (v === el ? [...a, i] : a))
}
const getMatch = (v = "", el = "") => {
	if (!isStr(v) || !el) return []
	const rxp = isRxp(el) ? el : new RegExp(el, "im")
	return v.match(rxp) ?? []
}
const getMatchAll = (v = "", el = "") => {
	if (!isStr(v) || !el) return []
	const rxp = isRxp(el) ? el : new RegExp(el, "gim")
	return v.match(rxp) ?? []
}
const getElementsSequence = (arr, el, size = 3) => {
	if (!isArr(arr) || !el || !arr.includes(el)) {
		return []
	}
	const start = _max(arr.indexOf(el), 0)
	const end = _min(index + size, arr.length - 1)
	return arr.slice(start, end)
}
const msToTimeDesc = (ms) => {
	const seconds = ~~(ms / 1000)
	const minutes = ~~(seconds / 60)
	const hours = ~~(minutes / 60)
	const days = ~~(hours / 24)
	return `${days % 365} days, ${hours % 24} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`
}
const toFixed = (v, l = 2) => Number(Number(v).toFixed(l))
const sliceToSize = (v, l) => isLen(v, 1) && (v.length > l ? v.slice(0, l) : v)
const encode = (value, size = MAX_ENCODED_SIZE) => {
	let elements
	if (isNum(value)) {
		elements = [value]
	} else if (isStr(value)) {
		elements = toCharCodeFromText(value)
	} else if (isArr(value)) {
		elements = value.filter(String).reduce((a, v) => [...a, ...toCharCodeFromText(v)], [])
	}

	return sliceToSize(elements, size)
}
const decode = (value) => {
	if (isNum(value)) {
		return charDecode(value)
	} else if (isArr(value)) {
		return value.map(charDecode).filter(Boolean).join("")
	}
	return toCharFromCode(value)
}
const isStrEqual = (s1, s2) => isTypeStr(s1, s2) && s1 === s2
const isLineBreak = (v) => v === "\n"
const isSharp = (v) => v === "#"
const isSpace = (v) => v === " "
const isStar = (v) => v === "*"
const character = (s) => (isStr(s) ? s.trim().split("").map(isSharp) : [])

class Helpers {
	static UND = UND
	static NULL = NULL
	static STR = STR
	static ERR = ERR
	static RND = RND
	static NUM = NUM
	static BLN = BLN
	static ARR = ARR
	static OBJ = OBJ
	static SYM = SYM
	static BIG = BIG
	static FUNC = FUNC
	static VALUES = VALUES
	static VALUES_SOURCES = VALUES_SOURCES
	static TYPEOF_VALUES = TYPEOF_VALUES
	static CONSOLE_METHODS = CONSOLE_METHODS
	static GRADIENT_METHODS = GRADIENT_METHODS
	static COLOR_METHODS = COLOR_METHODS
	static CONSOLE_SOURCES = CONSOLE_SOURCES
	static GRADIENTS_SOURCES = GRADIENTS_SOURCES
	static COLORED_SOURCES = COLORED_SOURCES
	static CONSOLE_OTHER_SOURCES = CONSOLE_OTHER_SOURCES
	static LOGGER_SOURCES = LOGGER_SOURCES
	static _logGradient = _logGradient
	static _logColored = _logColored
	static _logLolcatPrint = _logLolcatPrint
	static _logLolcatRainbow = _logLolcatRainbow
	static _logCowSay = _logCowSay
	static _logCowThink = _logCowThink
	static _logDefault = _logDefault
	static _logJson = _logJson
	static _logValues = _logValues
	static _logExamples = _logExamples
	static NAME_TEMP = NAME_TEMP
	static LOG_DIR = LOG_DIR
	static LOG_FILE = LOG_FILE
	static PATH_LOG_DIR = PATH_LOG_DIR
	static PATH_LOG_FILE = PATH_LOG_FILE
	static CHAR_CODE_MULT = CHAR_CODE_MULT
	static MAX_ENCODED_SIZE = MAX_ENCODED_SIZE
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
	static CHAR_CODE_SOURCES = CHAR_CODE_SOURCES
	static CHAR_CODE_VALUES = CHAR_CODE_VALUES
	static DIV_CONTENT = DIV_CONTENT
	static DIV_LINE = DIV_LINE
	static DIV_TITLE = DIV_TITLE
	static MIN_LENGTH = MIN_LENGTH
	static MAX_LENGTH = MAX_LENGTH
	static MIN_CHAR_CODE = MIN_CHAR_CODE
	static MAX_CHAR_CODE = MAX_CHAR_CODE
	static RANGE_LENGTH = RANGE_LENGTH
	static RANGE_CHAR_CODE = RANGE_CHAR_CODE
	static ARRAY_SIZE = ARRAY_SIZE
	static LIKE_DIFF = LIKE_DIFF
	static INPUT_SIZE = INPUT_SIZE
	static HIDDEN_SIZE = HIDDEN_SIZE
	static OUTPUT_SIZE = OUTPUT_SIZE
	static TRAIN_SET_SIZE = TRAIN_SET_SIZE
	static LEARNING_RATE = LEARNING_RATE
	static OPTIONS_FS = OPTIONS_FS
	static OPTIONS_BRAIN_LSTM = OPTIONS_BRAIN_LSTM
	static ERROR_THRESHOLD = ERROR_THRESHOLD
	static LOG_PERIOD = LOG_PERIOD
	static OPTIONS_BRAIN_TRAIN = OPTIONS_BRAIN_TRAIN
	static is = is
	static isTypeStr = isTypeStr
	static isTypeNum = isTypeNum
	static isTypeFunc = isTypeFunc
	static isTypeObj = isTypeObj
	static isTypeBool = isTypeBool
	static isTypeBig = isTypeBig
	static isTypeSym = isTypeSym
	static isTypeUnd = isTypeUnd
	static isLen = isLen
	static isDefined = isDefined
	static isTypeObjTruthy = isTypeObjTruthy
	static isTypeOfValue = isTypeOfValue
	static toTypeOf = toTypeOf
	static isType = isType
	static isEvery = isEvery
	static isSome = isSome
	static getTimeStamp = getTimeStamp
	static getSource = getSource
	static TIME = TIME
	static SOURCE = SOURCE
	static ROOT = ROOT
	static DIR = DIR
	static FILE = FILE
	static toMaxLen = toMaxLen
	static toMinLen = toMinLen
	static toMatchLen = toMatchLen
	static toCharCode = toCharCode
	static toCharFromCode = toCharFromCode
	static toCharCodeFromText = toCharCodeFromText
	static MIN = MIN
	static MAX = MAX
	static RANGE = RANGE
	static ITERATIONS = ITERATIONS
	static filePath = filePath
	static fileList = fileList
	static fileRead = fileRead
	static fileWrite = fileWrite
	static fileAppend = fileAppend
	static fileCreateDir = fileCreateDir
	static genBool = genBool
	static gen = gen
	static genInt = genInt
	static genCoin = genCoin
	static genId = genId
	static genKey = genKey
	static genArr = genArr
	static genMany = genMany
	static genSort = genSort
	static genIndex = genIndex
	static genElement = genElement
	static genElementsMany = genElementsMany
	static genObjKey = genObjKey
	static genObjValue = genObjValue
	static genObjEntry = genObjEntry
	static genChar = genChar
	static genCharLatin = genCharLatin
	static genCharKyrillic = genCharKyrillic
	static genCharCode = genCharCode
	static genCharCodeLatin = genCharCodeLatin
	static genCharCodeKyrillic = genCharCodeKyrillic
	static genRgb = genRgb
	static isRxp = isRxp
	static toCallback = toCallback
	static toLen = toLen
	static isLenMin = isLenMin
	static isLenMax = isLenMax
	static isLenEqual = isLenEqual
	static isLenRange = isLenRange
	static isNum = isNum
	static isStr = isStr
	static isArr = isArr
	static isObj = isObj
	static isCharLatin = isCharLatin
	static isCharKyrrylic = isCharKyrrylic
	static isCharNum = isCharNum
	static isCharSpecial = isCharSpecial
	static isCharValid = isCharValid
	static isNumLike = isNumLike
	static filterStr = filterStr
	static filterNum = filterNum
	static filterArr = filterArr
	static filterBool = filterBool
	static filterFunc = filterFunc
	static or = or
	static and = and
	static like = like
	static not = not
	static getIndexLast = getIndexLast
	static getElementLast = getElementLast
	static getSlice = getSlice
	static getElementNeighbours = getElementNeighbours
	static getElementNext = getElementNext
	static getSplitted = getSplitted
	static getChars = getChars
	static getWords = getWords
	static getPhrases = getPhrases
	static getLines = getLines
	static getWordFirst = getWordFirst
	static getWordLast = getWordLast
	static genPhraseFromWords = genPhraseFromWords
	static getPhrasesWithWord = getPhrasesWithWord
	static getPhrasesWithoutWord = getPhrasesWithoutWord
	static getPhrasesEndsWith = getPhrasesEndsWith
	static getPhrasesStartsWith = getPhrasesStartsWith
	static getPhrasesByLength = getPhrasesByLength
	static getPhrasesByIndex = getPhrasesByIndex
	static reduceText = reduceText
	static reduceSum = reduceSum
	static reduceMult = reduceMult
	static reduceObj = reduceObj
	static reducePropValue = reducePropValue
	static reducePropDesc = reducePropDesc
	static reduceElementStats = reduceElementStats
	static reduceElementKeys = reduceElementKeys
	static reduceElementValues = reduceElementValues
	static reduceElementEntries = reduceElementEntries
	static toArr = toArr
	static toObj = toObj
	static toText = toText
	static toKeys = toKeys
	static toNumDiff = toNumDiff
	static toNumRange = toNumRange
	static toTrim = toTrim
	static toTrimLine = toTrimLine
	static toUnical = toUnical
	static toJoin = toJoin
	static toRepeat = toRepeat
	static toReversed = toReversed
	static toBuffer = toBuffer
	static toFloatFixed = toFloatFixed
	static toTrainingData = toTrainingData
	static toFormatted = toFormatted
	static toPercent = toPercent
	static toResultStats = toResultStats
	static toResultProps = toResultProps
	static toTitleCase = toTitleCase
	static jsonParse = jsonParse
	static jsonCreate = jsonCreate
	static toAverage = toAverage
	static toRxp = toRxp
	static toRxpNext = toRxpNext
	static toMatchWordFirst = toMatchWordFirst
	static toMatchWordLast = toMatchWordLast
	static toMatchLineWithWord = toMatchLineWithWord
	static toMatchChars = toMatchChars
	static toMatchWords = toMatchWords
	static toMatchPhrases = toMatchPhrases
	static toMatchLines = toMatchLines
	static toMatchDividered = toMatchDividered
	static toMatchNextWords = toMatchNextWords
	static toArrValues = toArrValues
	static toNotUnical = toNotUnical
	static replaceManyChars = replaceManyChars
	static replaceChars = replaceChars
	static getIndex = getIndex
	static getIndexAll = getIndexAll
	static getMatch = getMatch
	static getMatchAll = getMatchAll
	static getElementsSequence = getElementsSequence
	static msToTimeDesc = msToTimeDesc
	static toFixed = toFixed
	static sliceToSize = sliceToSize
	static encode = encode
	static decode = decode
	static isStrEqual = isStrEqual
	static isLineBreak = isLineBreak
	static isSharp = isSharp
	static isSpace = isSpace
	static isStar = isStar
	static character = character
	static _toObj = _toObj
	static _toArr = _toArr
	static _toStr = _toStr
}

module.exports = Helpers
