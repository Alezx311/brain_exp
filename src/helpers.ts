import * as fs from "fs"
import * as path from "path"
import * as util from "util"
import * as cowsay from "cowsay"

// import * as gradientString from "gradient-string"
// import * as lolcats from "lolcats"

const gradientString = require("gradient-string")
const lolcats = require("lolcats")
import chalk from "chalk"
const { rainbow, print } = lolcats
import { A, S } from "./types"
export const {
	readdirSync: _readdir,
	readFileSync: _readFile,
	writeFileSync: _writeFile,
	appendFileSync: _appendFile,
	mkdirSync: _mkdir
} = fs
export const { now: _now } = Date
export const { MAX_SAFE_INTEGER, MIN_SAFE_INTEGER, MAX_VALUE, MIN_VALUE } = Number
export const { cwd: _cwd, env: _env } = process
export const { parse: _parse, stringify: _stringify } = JSON
export const { format: _format, isDeepStrictEqual: _isEqual } = util
export const { log: _log, warn: _warn, info: _info, error: _error, table: _table, timeStamp: _timeStamp } = console
export const { random: _random, min: _min, max: _max, abs: _abs, round: _round } = Math
export const { keys: _keys, values: _values, entries: _entries, assign: _assign, getOwnPropertyNames: _names } = Object
export const { isArray: _isArray } = Array
export const { fromCharCode: _fromCharCode } = String
export const UND = undefined
export const NULL = null
export const STR = "Some string value"
export const ERR = new Error(STR)
export const RND = _random()
export const NUM = ~~(RND * 1000)
export const BLN = RND > 0.5
export const ARR = [STR, NUM]
export const OBJ = { STR, NUM }
export const SYM = Symbol("Symbol example")
export const BIG = NUM * MAX_VALUE
export const FUNC = (...v: any) => v
export const VALUES_SOURCES = [
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
export const VALUES = VALUES_SOURCES.reduce((acc: A, v) => [...acc, v.value], [])
export const TYPEOF_VALUES = ["string", "number", "function", "object", "boolean", "bigint", "symbol", "undefined"]
export const CONSOLE_METHODS = ["log", "info", "warn", "error", "dir", "debug"]
export const GRADIENT_METHODS = [
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
export const COLOR_METHODS = [
	"blue",
	"red",
	"blue",
	"blue",
	"red",
	"underline",
	"green",
	"blue",
	"red",
	"green",
	"yellow"
]
export const CONSOLE_SOURCES = CONSOLE_METHODS.map((desc: any) => {
	const callback = console[desc as keyof typeof console]
	const logger = callback
	return { desc, callback, logger }
})
export const GRADIENTS_SOURCES = GRADIENT_METHODS.map((desc) => {
	const callback = gradientString[desc]
	const logger = (...v: any) => _log(callback(...v))
	return { desc, callback, logger }
})
export const COLORED_SOURCES = COLOR_METHODS.map((desc) => {
	const callback = chalk[desc as keyof typeof chalk] as (...v: any) => any
	const logger = (...v: any) => _log(callback(...v))
	return { desc, callback, logger }
})
export const CONSOLE_OTHER_SOURCES = [
	{ desc: "lolcat_print", callback: print, logger: print },
	{ desc: "lolcat_rainbow", callback: rainbow, logger: (...v: any) => _log(rainbow(toText(v))) },
	{ desc: "cow_say", callback: cowsay.say, logger: (...v: any) => _log(cowsay.say({ text: toText(v) })) },
	{ desc: "cow_think", callback: cowsay.think, logger: (...v: any) => _log(cowsay.think({ text: toText(v) })) }
]
export const LOGGER_SOURCES = [...CONSOLE_SOURCES, ...GRADIENTS_SOURCES, ...COLORED_SOURCES, ...CONSOLE_OTHER_SOURCES]
export const _logGradient = (LOGGER_SOURCES.find((el: any) => el.desc === "atlas") as any).logger
export const _logColored = (LOGGER_SOURCES.find((el: any) => el.desc === "green") as any).logger
export const _logLolcatPrint = (LOGGER_SOURCES.find((el: any) => el.desc === "lolcat_print") as any).logger
export const _logLolcatRainbow = (LOGGER_SOURCES.find((el: any) => el.desc === "lolcat_rainbow") as any).logger
export const _logCowSay = (LOGGER_SOURCES.find((el: any) => el.desc === "cow_say") as any).logger
export const _logCowThink = (LOGGER_SOURCES.find((el: any) => el.desc === "cow_think") as any).logger
export const _logDefault = _logCowSay
export const _logJson = (...values: any) => _logDefault(values)
export const _logValues = (...values: any) => _logDefault(values)
export const _logExamples = (msg = SOURCE) => {
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
export const is = (...arr: any) => arr.every((el: any) => !!el)
export const isTypeStr = (...arr: any) => arr.every((el: any) => typeof el === "string")
export const isTypeNum = (...arr: any) => arr.every((el: any) => typeof el === "number")
export const isTypeFunc = (...arr: any) => arr.every((el: any) => typeof el === "function")
export const isTypeObj = (...arr: any) => arr.every((el: any) => typeof el === "object")
export const isTypeBool = (...arr: any) => arr.every((el: any) => typeof el === "boolean")
export const isTypeBig = (...arr: any) => arr.every((el: any) => typeof el === "bigint")
export const isTypeSym = (...arr: any) => arr.every((el: any) => typeof el === "symbol")
export const isTypeUnd = (...arr: any) => arr.every((el: any) => typeof el === "undefined")
export const isLen = (...arr: any) => arr.every((el: any) => typeof el?.length === "number")
export const isDefined = (...arr: any) => arr.every((el: any) => el !== null && el !== undefined)
export const isTypeObjTruthy = (...arr: any) => arr.every((el: any) => !!el && isTypeObj(el))
export const isTypeOfValue = (...arr: any) => isTypeStr(...arr) && arr.every((el: any) => TYPEOF_VALUES.includes(el))
export const toTypeOf = (v: any) => (isTypeOfValue(v) ? v : typeof v)
export const isType = (v1: any, v2: any) => toTypeOf(v1) === toTypeOf(v2)
export const isEvery = (v: any, ...arr: any) =>
	_isArray(v) ? v.every((el: any) => arr.includes(el)) : arr.every((el: any) => el === v)
export const isSome = (v: any, ...arr: any) =>
	_isArray(v) ? v.some((el: any) => arr.includes(el)) : arr.some((el: any) => el === v)
export const getTimeStamp = () => new Date().toLocaleString()
export const getSource = (msg = "") => `\n\t${__filename}\n\t${getTimeStamp()}\n\t${msg}\n`

//* File System Helpers
export const TIME = getTimeStamp()
export const SOURCE = getSource()
export const ROOT = _cwd()
export const DIR = __dirname
export const FILE = __filename
export const NAME_TEMP = `logs_temp`
export const LOG_DIR = "logs"
export const LOG_FILE = NAME_TEMP + ".log"
export const PATH_LOG_DIR = path.join(__dirname, "./", LOG_DIR)
export const PATH_LOG_FILE = path.join(PATH_LOG_DIR, LOG_FILE)
export const CHAR_CODE_MULT = 256
export const MAX_ENCODED_SIZE = 100
export const toMaxLen = (v: any, max = MAX_LENGTH) => (isLen(v) && v.length > max ? v.slice(0, max) : v)
export const toMinLen = (v: any, min = MIN_LENGTH) =>
	isLen(v) && v.length < min ? [...v, ...genArr(v.length - min, 0)] : v
export const toMatchLen = (v: any, l: any) => (isLen(v) && v.length === l ? v : toMaxLen(toMinLen(v, l), l))
export const toCharCode = (char: any) => isTypeStr(char) && char.charCodeAt(0) / CHAR_CODE_MULT
export const toCharFromCode = (code: any) => isTypeNum(code) && (_fromCharCode(code) as any) * CHAR_CODE_MULT
export const toCharCodeFromText = (text: any) => {
	if (!isTypeStr(text)) return false
	const values = text.split("").reduce((acc: any, v: any) => [...acc, toCharCode(v)], [])
	return toMaxLen(values, MAX_ENCODED_SIZE)
}

//* Chars
export const CHAR_LINE = "\n"
export const CHAR_TAB = "\t"
export const CHAR_SPACE = " "
export const CHAR_COMMA = ","
export const CHAR_DOT = "."
export const CHAR_DIV = "#"
export const CHARS_ENG = "abcdefghijklmnopqrstuvwxyz"
export const CHARS_RUS = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
export const CHARS_NUM = "0123456789"
export const CHARS_SIMPLE = CHARS_ENG + CHARS_RUS + CHARS_NUM
export const CHARS_SPECIAL = CHAR_LINE + CHAR_TAB + CHAR_SPACE + CHAR_COMMA + CHAR_DOT + CHAR_DIV
export const CHARS_VALID = CHARS_SIMPLE + CHARS_SPECIAL
export const CHAR_CODE_SOURCES = CHARS_VALID.split("").map((char) => ({ char, code: toCharCode(char) }))
export const CHAR_CODE_VALUES = [
	...new Set([...CHAR_CODE_SOURCES.reduce((acc: any, v) => [...acc, v.code], []).filter(Number)])
]

//* Dividers
export const DIV_CONTENT = `\n${CHAR_DIV.repeat(30)}\n`
export const DIV_LINE = `\n${CHAR_DIV.repeat(20)}\n`
export const DIV_TITLE = `\t${CHAR_DIV.repeat(5)}\t`

//* Constants
export const MIN = 1
export const MAX = 100
export const MIN_LENGTH = 1
export const MAX_LENGTH = 2000
export const MIN_CHAR_CODE = _min(...CHAR_CODE_VALUES)
export const MAX_CHAR_CODE = _max(...CHAR_CODE_VALUES)
export const RANGE = [MIN, MAX]
export const RANGE_LENGTH = [MIN_LENGTH, MAX_LENGTH]
export const RANGE_CHAR_CODE = [MIN_CHAR_CODE, MAX_CHAR_CODE]
export const ARRAY_SIZE = 10
export const LIKE_DIFF = 0.1
export const INPUT_SIZE = 1
export const HIDDEN_SIZE = 3
export const OUTPUT_SIZE = 1
export const TRAIN_SET_SIZE = 1000
export const LEARNING_RATE = 0.05

//* Options
export const OPTIONS_FS = { encoding: "utf-8" }
export const OPTIONS_BRAIN_LSTM = { log: true }
export const ITERATIONS = 1000
export const ERROR_THRESHOLD = 0.005
export const LOG_PERIOD = 100
export const OPTIONS_BRAIN_TRAIN = {
	log: true,
	learningRate: LEARNING_RATE,
	iterations: ITERATIONS,
	errorThresh: ERROR_THRESHOLD,
	logPeriod: LOG_PERIOD,
	callback: _info
}
export const filePath = (...sArr: any) => path.join(__dirname, ...sArr)
export const fileList = (s = LOG_DIR) => _readdir(filePath(s))
export const fileRead = (s = LOG_FILE) => _readFile(filePath(s), OPTIONS_FS as any).toString()
export const fileWrite = (file: any, data = getSource()) =>
	isStr(file) && _writeFile(filePath(file), data, OPTIONS_FS as any)
export const fileAppend = (file: any, data = getSource()) =>
	isStr(file) && _appendFile(filePath(file), data, OPTIONS_FS as any)
export const fileCreateDir = (dir = NAME_TEMP) => isStr(dir) && _mkdir(dir)

//* Generate Value Helpers
export const genBool = () => _random() > 0.5
export const gen = (max = null) => (max ? _random() * max : _random())
export const genInt = (max = MAX, min = MIN) =>
	isTypeNum(max, min) ? ~~(_random() * max - min) + min : ~~(_random() * MAX)
export const genCoin = (v1: any = true, v2: any = false) => (genBool() ? v1 : v2)
export const genId = () => `${parseInt(`${genInt()}`, 36)}`
export const genKey = () => genId().repeat(5).replace(/[a-z]/gim, "")
export const genArr = (l = ARRAY_SIZE, v = 1) => Array(~~l).fill(v)
export const genMany = (l = ARRAY_SIZE, cb = _random) => genArr(l).map(isTypeFunc(cb) ? (cb as any) : () => cb)
export const genSort = () => genCoin(1, -1)
export const genIndex = (v: any) => (isLen(v) && v.length > 2 ? genInt(v.length - 1, 0) : genCoin(1, 0))
export const genElement = (v: any) => isLen(v) && v[genIndex(v) as any]
export const genElementsMany = (v: any, l = ARRAY_SIZE) => genMany(l, () => genElement(v))
export const genObjKey = (v: any) => isObj(v) && genElement(_keys(v))
export const genObjValue = (v: any) => isObj(v) && genElement(_values(v))
export const genObjEntry = (v: any) => isObj(v) && genElement(_entries(v))
export const genChar = () => genElement(CHARS_VALID)
export const genCharLatin = () => genElement(CHARS_ENG)
export const genCharKyrillic = () => genElement(CHARS_RUS)
export const genCharCode = () => genElement(CHAR_CODE_VALUES)
export const genCharCodeLatin = () => genInt(122, 97)
export const genCharCodeKyrillic = () => genInt(1103, 1072)
export const genRgb = (hex: any) => {
	const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
	hex = hex.replace(shorthandRegex, function (m: any, r: any, g: any, b: any) {
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
export const isRxp = (v: any) => v instanceof RegExp
export const toCallback = (v: any) => (isTypeFunc(v) ? v : () => v)
export const toLen = (v1: any) => (isLen(v1) ? v1.length : -1)
export const isLenMin = (v: any, l = MIN_LENGTH) => isLen(v) && v.length >= l
export const isLenMax = (v: any, l = MAX_LENGTH) => isLen(v) && v.length <= l
export const isLenEqual = (v1: any, v2: any) => isLen(v1, v2) && v1.length === v2.length
export const isLenRange = (v1: any, min = 0, max = MAX_VALUE) => isLen(v1) && v1.length > min && v1.length < max
export const isNum = (v1: any, min = 0, max = MAX_VALUE) => isTypeNum(v1) && v1 >= min && v1 < max
export const isStr = (v1: any, min = 0, max = MAX_VALUE) => isTypeStr(v1) && isLenRange(v1, min, max)
export const isArr = (v1: any, min = 0, max = MAX_VALUE) => isTypeObj(v1) && _isArray(v1) && isLenRange(v1, min, max)
export const isObj = (v: any) => isTypeObj(v) && !_isArray(v) && is(v)
export const isCharLatin = (ch: any) => isTypeStr(ch) && CHARS_ENG.includes(ch.toLowerCase())
export const isCharKyrrylic = (ch: any) => isTypeStr(ch) && CHARS_RUS.includes(ch.toLowerCase())
export const isCharNum = (ch: any) => isTypeStr(ch) && CHARS_NUM.includes(ch.toLowerCase())
export const isCharSpecial = (ch: any) => isTypeStr(ch) && CHARS_SPECIAL.includes(ch.toLowerCase())
export const isCharValid = (ch: any) => isTypeStr(ch) && CHARS_VALID.includes(ch.toLowerCase())
export const isNumLike = (v1: any, v2: any, d = LIKE_DIFF) => isTypeNum(v1, v2, d) && v1 < v2 + d && v1 > v2 - d
export const filterStr = (...values: any) => values.filter(String)
export const filterNum = (...values: any) => values.filter(Number)
export const filterArr = (...values: any) => values.filter(Array)
export const filterBool = (...values: any) => values.filter(Boolean)
export const filterFunc = (...values: any) => values.filter(Function)

//* Get Value Helpers
export const or = (v1: any, v2: any) => v1 || v2
export const and = (v1: any, v2: any) => v1 && v2
export const like = (v1: any, ...values: any) => values.filter((el: any) => el == v1 || typeof el == typeof v1)
export const not = (v1: any, ...values: any) => values.filter((el: any) => el !== v1 && typeof el !== typeof v1)
export const getIndexLast = (v: any) => isLen(v) && _max(0, v.length - 1)
export const getElementLast = (v: any) => isLen(v) && v?.[getIndexLast(v)]
export const getSlice = (v: any, i1 = 0, i2 = null) => {
	if (!isLen(v)) return false
	const last = getIndexLast(v)
	const start = isNum(i1, last) ? i1 : genInt(last)
	const end = isNum(i2, last) ? i1 : genInt(last)
	return v.slice(start, end)
}
export const getElementNeighbours = (arr: A, el: any, l = 1) => {
	if (!isLen(arr) || !arr.includes(el)) return false
	const i = arr.indexOf(el)
	const last = getIndexLast(arr)
	const start = i > 0 ? i - 1 : 0
	const end = i < last ? i + 1 : last
	return arr.slice(start, end)
}
export const getElementNext = (arr: A, el = 0) => {
	if (!isLen(arr) || !arr.includes(el)) return false
	const i = arr.indexOf(el)
	const last = getIndexLast(arr)
	return i < last ? arr[i + 1] : arr[0]
}
export const getSplitted = (s: any, ch: any = "", min: any = false) => {
	if (!isStr(s, ch)) return false
	const arr = s.split(ch).filter(String)
	return min ? arr.filter((el: any) => isLenMin(el, min)) : arr
}
export const getChars = (s: any) => getSplitted(s, "")
export const getWords = (s: any, min = 1) => getSplitted(s, " ", min)
export const getPhrases = (s: any, min = 1) => getSplitted(s, ".", min)
export const getLines = (s: any, min = 1) => getSplitted(s, "\n", min)
export const getWordFirst = (s: any) => getWords(s)?.[0]
export const getWordLast = (s: any) => getWords(s).reverse()?.[0]
export const genPhraseFromWords = (words: any, size: any = ARRAY_SIZE) => {
	if (!isArr(words, 1)) return false
	return genElementsMany(words, size).join(" ")
}
export const getPhrasesWithWord = (a: any, w: any) =>
	isArr(a) && isStr(w) && a.filter((el: any) => isStr(el) && el.includes(w))
export const getPhrasesWithoutWord = (a: any, w: any) =>
	isArr(a) && isStr(w) && a.filter((el: any) => isStr(el) && !el.includes(w))
export const getPhrasesEndsWith = (a: any, s: any) =>
	isArr(a) && isStr(s) && a.filter((el: any) => isStr(el) && el.endsWith(s))
export const getPhrasesStartsWith = (a: any, s: any) =>
	isArr(a) && isStr(s) && a.filter((el: any) => isStr(el) && el.startsWith(s))
export const getPhrasesByLength = (a: any, l = RANGE_LENGTH) => {
	if (!isArr(a)) return false
	if (isTypeNum(l)) return a.filter((el: any) => el === l)
	if (isArr(l)) return a.filter((el: any) => isLenRange(el, _min(...l), _max(...l)))
	return a.filter(String)
}
export const getPhrasesByIndex = (a: any, l = RANGE_LENGTH) => {
	if (!isArr(a)) return false
	if (isArr(l)) return a.filter((el: any, i: any) => isLenRange(i, _min(...l), _max(...l)))
	if (isTypeNum(l)) return a.filter((el: any, i: any) => i === l)
	return a.filter(String)
}

//* Array Reducers
export const reduceText = (a: any, v: any) => `${a} ${v}`
export const reduceSum = (a: any, v: any) => a + v
export const reduceMult = (a: any, v: any) => a + v * 2
export const reduceObj = (a: any, v: any, i: any) => [...a, { value: v, index: i }]
export const reducePropValue = (a: any, v: any) => (is(v?.value) ? [...a, v?.value] : a)
export const reducePropDesc = (a: any, v: any) => (is(v?.desc) ? [...a, v.desc] : a)
export const reduceElementStats = (a: any, v: any) => a + "\n" + toResultStats(v)
export const reduceElementKeys = (a: any, v: any) => (isObj(v) ? [...a, _keys(v)] : a)
export const reduceElementValues = (a: any, v: any) => (isObj(v) ? [...a, _values(v)] : a)
export const reduceElementEntries = (a: any, v: any) => (isObj(v) ? [...a, _entries(v)] : a)

//* Converters
export const _toObj = (...v: any) => ({ values: v })
export const _toArr = (...v: any) => v
export const _toStr = (...v: any) => _stringify(_toObj(...v), null, 2)
export const toArr = (v: any) => (isArr(v) ? v : [v])
export const toObj = (v: any) => (isObj(v) ? v : { value: v })
export const toText = (v: any) => _stringify(toObj(v), null, 2)
export const toKeys = (v: any) => (isObj(v) ? _keys(v) : [])
export const toNumDiff = (...v: any) => _max(...v) - _min(...v)
export const toNumRange = (...v: any) => [_min(...v), _max(...v)]
export const toTrim = (v: any) => (isTypeStr(v) ? v : toText(v)).trim()
export const toTrimLine = (v = "") => isTypeStr(v) && v.replace(/\n/gim, " ")
export const toUnical = (v: any) => (isArr(v) ? [...new Set([...v])] : [v])
export const toJoin = (v: any, ch = "\n") => (isArr(v) ? v.join(isTypeStr(ch) ? ch : "\n") : toText(v))
export const toRepeat = (v: any, r = 2) => (isTypeStr(v) ? v : toText(v)).repeat(isNum(r, 2) ? r : 2)
export const toReversed = (v: any) => (isArr(v) ? v.reverse() : toText(v).split("").reverse().join(""))
export const toBuffer = (v: any) => is(v) && Buffer.from(v)
export const toFloatFixed = (v: any, l = 2) => (isTypeNum(v) ? Number(v.toFixed(~~l)) : 0)
export const toTrainingData = (input: any, output: any, ...other: any) => ({ input, output, other })
export const toFormatted = (s: any, r: any = "") => isTypeStr(s, r) && s.replace(/[^а-я\s\n]+/gim, r)
export const toPercent = (v1: any, v2: any) => isTypeNum(v1, v2) && v2 / (v1 / 100)
export const toResultStats = (v: any) => toText(v)
export const toResultProps = (v: any) => _assign({}, toObj(v), { desc: toResultStats(v) })
export const toTitleCase = (s: any) => {
	if (!isStr(s, 1)) return false
	const trimmed = s.trim().toLowerCase()
	return trimmed.slice(0, 1).toUpperCase() + trimmed.slice(1)
}
export const jsonParse = (v: any) => (isStr(v, 1) ? _parse(v) : false)
export const jsonCreate = (...v: any) => _stringify(v, null, 2)
export const toAverage = (...v: any) => {
	const a = v.flat().filter(Number)
	return a.length ? a.reduce(reduceSum) / a.length : 0
}

//* Regular Expressions
export const toRxp = (s = "", flags = "im") => new RegExp(s, flags)
export const toRxpNext = (word = "", rep = 1) => {
	const rxpString = word + `[^а-яa-z]{0,}[а-яa-z]{0,}`.repeat(rep)
	return new RegExp(rxpString, "gim")
}
export const toMatchWordFirst = (s = "") => s.match(/^(\w+)\b/i)
export const toMatchWordLast = (s = "") => s.match(/\b(\w+)$/i)
export const toMatchLineWithWord = (s = "", word = "") => {
	if (!isStr(s)) return ""
	const rxp = toRxp(`^.+${word}.+$`, "im")
	const result = rxp.exec(s) ?? ""
	return result
}
export const toMatchChars = (s = "") => {
	if (!isStr(s)) return []
	return s.split("").filter(String)
}
export const toMatchWords = (s = "") => {
	if (!isStr(s)) return []
	return s
		.split(/\s|\n|\t|\b/gim)
		.filter((s: any) => isLenMin(s, 1))
		.map((s: any) => s.replace(/\s|\n|\t/, "").trim())
}
export const toMatchPhrases = (s = "") => {
	if (!isStr(s)) return []
	return s
		.split(".")
		.filter((s: any) => isLenMin(s, 1))
		.map((s: any) => s.replace("\n", "").trim())
}
export const toMatchLines = (s = "") => {
	if (!isStr(s)) return []
	return s
		.split("\n")
		.filter((s: any) => isLenMin(s, 1))
		.map((s: any) => s.replace("\n", "").trim())
}
export const toMatchDividered = (s = "", div = CHAR_DIV) => {
	if (!isStr(s)) return []
	return s.split(div).filter((s: any) => isLenMin(s, 1))
}
export const toMatchNextWords = (s = "", word = "", size = 2) => {
	if (!isStr(s) || !isStr(word) || !s.includes(word)) return ""
	const rxpString = word + ".\\b\\w+\\b".repeat(size)
	const rxp = new RegExp(rxpString, "im")
	const result = rxp.exec(s)
	return result?.[1] ?? ""
}
export const toArrValues = (arr: any) =>
	isArr(arr, 1) && arr.map((value: any, index: any) => ({ value, index, text: value ? toText(value) : typeof value }))
export const toNotUnical = (arr: any) => {
	if (!isArr(arr, 1)) return []
	const unical = toUnical(arr)
	return arr.filter((v: any) => unical.includes(v))
}
export const isUnical = (el: any, arr: any) => {
	const notUnical = toNotUnical(arr)
	return notUnical.includes(el)
}
export const replaceManyChars = (s: any) => {
	if (!isStr(s)) return false
	return s.replace(/\s+|\t+/gim, " ").replace(/\n+/gim, "\n")
}
export const replaceChars = (s: any) => {
	if (!isStr(s)) return false
	const replaced = s.replace(/[^а-яa-z\s\n,.]/gim, " ")
	return replaceManyChars(replaced)
}
export const getIndex = (src: any = "", el: any = "") => {
	if (!isLenMin(src) || !el) return -1
	return src.indexOf(el)
}
export const getIndexAll = (arr: A, el: any) => {
	if (!isArr(arr) || !el) return []
	return arr.reduce((a, v, i) => (v === el ? [...a, i] : a))
}
export const getMatch = (v: any = "", el: any = "") => {
	if (!isStr(v) || !el) return []
	const rxp = isRxp(el) ? el : new RegExp(el, "im")
	return v.match(rxp) ?? []
}
export const getMatchAll = (v: any = "", el: any = "") => {
	if (!isStr(v) || !el) return []
	const rxp = isRxp(el) ? el : new RegExp(el, "gim")
	return v.match(rxp) ?? []
}
export const getElementsSequence = (arr: A, el: any, size: any = 3) => {
	if (!isArr(arr) || !el || !arr.includes(el)) {
		return []
	}
	const start = _max(arr.indexOf(el), 0)
	const end = _min(start + size, arr.length - 1)
	return arr.slice(start, end)
}
export const msToTimeDesc = (ms: any) => {
	const seconds = ~~(ms / 1000)
	const minutes = ~~(seconds / 60)
	const hours = ~~(minutes / 60)
	const days = ~~(hours / 24)
	return `${days % 365} days, ${hours % 24} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`
}
export const toFixed = (v: any, l = 2) => Number(Number(v).toFixed(l))
export const sliceToSize = (v: any, l: any) => isLen(v, 1) && (v.length > l ? v.slice(0, l) : v)
export const encode = (value: any, size = MAX_ENCODED_SIZE) => {
	let elements
	if (isNum(value)) {
		elements = [value]
	} else if (isStr(value)) {
		elements = toCharCodeFromText(value)
	} else if (isArr(value)) {
		elements = value.filter(String).reduce((a: any, v: any) => [...a, ...toCharCodeFromText(v)], [])
	}
	return sliceToSize(elements, size)
}
export const decode = (value: any) => {
	if (isNum(value)) {
		return toCharFromCode(value) as any
	} else if (isArr(value)) {
		return value.map(toCharFromCode).filter(Boolean).join("")
	}
	return toCharFromCode(value)
}
export const isStrEqual = (s1: any, s2: any) => isTypeStr(s1, s2) && s1 === s2
export const isLineBreak = (v: any) => v === "\n"
export const isSharp = (v: any) => v === "#"
export const isSpace = (v: any) => v === " "
export const isStar = (v: any) => v === "*"
export const character = (s: any) => (isStr(s) ? s.trim().split("").map(isSharp) : [])
