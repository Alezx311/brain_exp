const fs = require("fs")
const path = require("path")
const util = require("util")
const cowsay = require("cowsay")
const gradientString = require("gradient-string")
const chalk = require("chalk")
const { rainbow, print } = require("lolcats")
const { now: _now } = Date
const { cwd: _cwd, env: _env } = process
const { parse: _parse, stringify: _stringify } = JSON
const { format: _format, isDeepStrictEqual: _isEqual } = util
const { log: _log, warn: _warn, info: _info, error: _error, table: _table } = console
const { random: _random, min: _min, max: _max, abs: _abs, round: _round } = Math
const { keys: _keys, values: _values, entries: _entries, assign: _assign, getOwnPropertyNames: _names } = Object
const { isArray: _isArray } = Array
const { fromCharCode: _fromCharCode } = String
const {
	MAX_SAFE_INTEGER: _MAX_SAFE_INTEGER,
	MIN_SAFE_INTEGER: _MIN_SAFE_INTEGER,
	MAX_VALUE: _MAX_VALUE,
	MIN_VALUE: _MIN_VALUE
} = Number
const {
	readdirSync: _readdir,
	readFileSync: _readFile,
	writeFileSync: _writeFile,
	appendFileSync: _appendFile,
	mkdirSync: _mkdir
} = fs
class Helpers {
	//* Values Constants
	static UND = undefined
	static NULL = null
	static STR = "Some string value"
	static ERR = new Error(this.STR)
	static RND = _random()
	static NUM = ~~(this.RND * 1000)
	static BLN = this.RND > 0.5
	static ARR = [this.STR, this.NUM]
	static OBJ = { STR: this.STR, NUM: this.NUM }
	static SYM = Symbol("Symbol example")
	static BIG = this.NUM * this.MAX_VALUE
	static FUNC = (...values) => values
	static VALUES_SOURCES = [
		{ value: this.UND, desc: "UND" },
		{ value: this.NULL, desc: "NULL" },
		{ value: this.STR, desc: "STR" },
		{ value: this.ERR, desc: "ERR" },
		{ value: this.RND, desc: "RND" },
		{ value: this.NUM, desc: "NUM" },
		{ value: this.BLN, desc: "BLN" },
		{ value: this.ARR, desc: "ARR" },
		{ value: this.OBJ, desc: "OBJ" },
		{ value: this.SYM, desc: "SYM" },
		{ value: this.BIG, desc: "BIG" },
		{ value: this.FUNC, desc: "FUNC" }
	].map((src, index) => ({ ...src, index, type: typeof src.value, callback: () => src.value }))
	static VALUES = this.VALUES_SOURCES.reduce((acc, v) => [...acc, v.value], [])
	static TYPEOF_VALUES = ["string", "number", "function", "object", "boolean", "bigint", "symbol", "undefined"]

	//* Logger Constants
	static CONSOLE_METHODS = ["log", "info", "warn", "error", "dir", "debug"]
	static GRADIENT_METHODS = [
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
	static COLOR_METHODS = ["blue", "red", "blue", "blue", "red", "underline", "green", "blue", "red", "green", "yellow"]
	static CONSOLE_SOURCES = this.CONSOLE_METHODS.map((desc) => {
		const callback = console[desc]
		const logger = callback
		return { desc, callback, logger }
	})
	static GRADIENTS_SOURCES = this.GRADIENT_METHODS.map((desc) => {
		const callback = gradientString[desc]
		const logger = (...v) => _log(callback(...v))
		return { desc, callback, logger }
	})
	static COLORED_SOURCES = this.COLOR_METHODS.map((desc) => {
		const callback = chalk[desc]
		const logger = (...v) => _log(callback(...v))
		return { desc, callback, logger }
	})
	static CONSOLE_OTHER_SOURCES = [
		{ desc: "lolcat_print", callback: print, logger: print },
		{ desc: "lolcat_rainbow", callback: rainbow, logger: (...v) => _log(rainbow(this.toText(v))) },
		{ desc: "cow_say", callback: cowsay.say, logger: (...v) => _log(cowsay.say({ text: this.toText(v) })) },
		{ desc: "cow_think", callback: cowsay.think, logger: (...v) => _log(cowsay.think({ text: this.toText(v) })) }
	]
	static LOGGER_SOURCES = [
		...this.CONSOLE_SOURCES,
		...this.GRADIENTS_SOURCES,
		...this.COLORED_SOURCES,
		...this.CONSOLE_OTHER_SOURCES
	]
	static _logExamples = (msg = this.SOURCE) =>
		this.LOGGER_SOURCES.map(({ logger, desc }) => logger({ text: `${desc} log message example\n${msg}` }))

	//* Validators
	static is = (...arr) => arr.every((el) => !!el)
	static isTypeStr = (...arr) => arr.every((el) => typeof el === "string")
	static isTypeNum = (...arr) => arr.every((el) => typeof el === "number")
	static isTypeFunc = (...arr) => arr.every((el) => typeof el === "function")
	static isTypeObj = (...arr) => arr.every((el) => typeof el === "object")
	static isTypeBool = (...arr) => arr.every((el) => typeof el === "boolean")
	static isTypeBig = (...arr) => arr.every((el) => typeof el === "bigint")
	static isTypeSym = (...arr) => arr.every((el) => typeof el === "symbol")
	static isTypeUnd = (...arr) => arr.every((el) => typeof el === "undefined")
	static isLen = (...arr) => arr.every((el) => typeof el?.length === "number")
	static isDefined = (...arr) => arr.every((el) => el !== null && el !== undefined)
	static isTypeObjTruthy = (...arr) => arr.every((el) => !!el && this.isTypeObj(el))
	static isTypeOfValue = (...arr) => this.isTypeStr(...arr) && arr.every((el) => this.TYPEOF_VALUES.includes(el))
	static toTypeOf = (v) => (this.isTypeOfValue(v) ? v : typeof v)
	static isType = (v1, v2) => this.toTypeOf(v1) === this.toTypeOf(v2)
	static isEvery = (v, ...arr) => (_isArray(v) ? v.every((el) => arr.includes(el)) : arr.every((el) => el === v))
	static isSome = (v, ...arr) => (_isArray(v) ? v.some((el) => arr.includes(el)) : arr.some((el) => el === v))
	static getTimeStamp = () => new Date().toLocaleString()
	static getSource = (msg = "") => `\n\t${__filename}\n\t${this.getTimeStamp()}\n\t${msg}\n`

	//* File System Helpers
	static TIME = this.getTimeStamp()
	static SOURCE = this.getSource()
	static ROOT = _cwd()
	static DIR = __dirname
	static FILE = __filename
	static NAME_TEMP = `logs_temp`
	static LOG_DIR = "logs"
	static LOG_FILE = this.NAME_TEMP + ".log"
	static PATH_LOG_DIR = path.join(__dirname, "./", this.LOG_DIR)
	static PATH_LOG_FILE = path.join(this.PATH_LOG_DIR, this.LOG_FILE)
	static CHAR_CODE_MULT = 256
	static MAX_ENCODED_SIZE = 100
	static toMaxLen = (v, max = this.MAX_LENGTH) => (this.isLen(v) && v.length > max ? v.slice(0, max) : v)
	static toMinLen = (v, min = this.MIN_LENGTH) =>
		this.isLen(v) && v.length < min ? [...v, ...this.genArr(v.length - min, 0)] : v
	static toMatchLen = (v, l) => (this.isLen(v) && v.length === l ? v : this.toMaxLen(this.toMinLen(v, l), l))
	static toCharCode = (char) => this.isTypeStr(char) && char.charCodeAt(0) / this.CHAR_CODE_MULT
	static toCharFromCode = (code) => this.isTypeNum(code) && _fromCharCode(code) * this.CHAR_CODE_MULT
	static toCharCodeFromText = (text) => {
		if (!this.isTypeStr(text)) return false
		const values = text.split("").reduce((acc, v) => [...acc, this.toCharCode(v)], [])
		return this.toMaxLen(values, this.MAX_ENCODED_SIZE)
	}

	//* Chars
	static CHAR_LINE = "\n"
	static CHAR_TAB = "\t"
	static CHAR_SPACE = " "
	static CHAR_COMMA = ","
	static CHAR_DOT = "."
	static CHAR_DIV = "#"
	static CHARS_ENG = "abcdefghijklmnopqrstuvwxyz"
	static CHARS_RUS = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
	static CHARS_NUM = "0123456789"
	static CHARS_SIMPLE = this.CHARS_ENG + this.CHARS_RUS + this.CHARS_NUM
	static CHARS_SPECIAL =
		this.CHAR_LINE + this.CHAR_TAB + this.CHAR_SPACE + this.CHAR_COMMA + this.CHAR_DOT + this.CHAR_DIV
	static CHARS_VALID = this.CHARS_SIMPLE + this.CHARS_SPECIAL
	static CHAR_CODE_SOURCES = this.CHARS_VALID.split("").map((char) => ({ char, code: this.toCharCode(char) }))
	static CHAR_CODE_VALUES = [
		...new Set([...this.CHAR_CODE_SOURCES.reduce((acc, v) => [...acc, v.code], []).filter(Number)])
	]

	//* Dividers
	static DIV_CONTENT = `\n${this.CHAR_DIV.repeat(30)}\n`
	static DIV_LINE = `\n${this.CHAR_DIV.repeat(20)}\n`
	static DIV_TITLE = `\t${this.CHAR_DIV.repeat(5)}\t`

	//* Constants
	static MIN = 1
	static MAX = 100
	static MIN_LENGTH = 1
	static MAX_LENGTH = 2000
	static MIN_CHAR_CODE = _min(...this.CHAR_CODE_VALUES)
	static MAX_CHAR_CODE = _max(...this.CHAR_CODE_VALUES)
	static RANGE = [this.MIN, this.MAX]
	static RANGE_LENGTH = [this.MIN_LENGTH, this.MAX_LENGTH]
	static RANGE_CHAR_CODE = [this.MIN_CHAR_CODE, this.MAX_CHAR_CODE]
	static ARRAY_SIZE = 10
	static LIKE_DIFF = 0.1
	static INPUT_SIZE = 1
	static HIDDEN_SIZE = 3
	static OUTPUT_SIZE = 1
	static TRAIN_SET_SIZE = 1000
	static LEARNING_RATE = 0.05

	//* Options
	static OPTIONS_FS = { encoding: "utf-8" }
	static OPTIONS_BRAIN_LSTM = { log: true }
	static ITERATIONS = 1000
	static ERROR_THRESHOLD = 0.005
	static LOG_PERIOD = 100
	static OPTIONS_BRAIN_TRAIN = {
		log: true,
		learningRate: this.LEARNING_RATE,
		iterations: this.ITERATIONS,
		errorThresh: this.ERROR_THRESHOLD,
		logPeriod: this.LOG_PERIOD,
		callback: _info
	}
	static filePath = (...sArr) => path.join(__dirname, ...sArr)
	static fileList = (s = this.LOG_DIR) => _readdir(this.filePath(s))
	static fileRead = (s = this.LOG_FILE) => _readFile(this.filePath(s), this.OPTIONS_FS).toString()
	static fileWrite = (file, data = this.getSource()) =>
		this.isStr(file) && _writeFile(this.filePath(file), data, this.OPTIONS_FS)
	static fileAppend = (file, data = this.getSource()) =>
		this.isStr(file) && _appendFile(this.filePath(file), data, this.OPTIONS_FS)
	static fileCreateDir = (dir = this.NAME_TEMP) => this.isStr(dir) && _mkdir(dir)

	//* this.Generate Value Helpers
	static gen = (max = null) => (max ? _random() * max : _random())
	static genBool = () => this.gen() > 0.5
	static genInt = (max = this.MAX, min = this.MIN) =>
		this.isTypeNum(max, min) ? ~~(this.gen() * max - min) + min : ~~(this.gen() * MAX)
	static genCoin = (v1 = true, v2 = false) => (this.genBool() ? v1 : v2)
	static genId = () => `${parseInt(`${this.genInt()}`, 36)}`
	static genKey = () => this.genId().repeat(5).replace(/[a-z]/gim, "")
	static genArr = (l = this.ARRAY_SIZE, v = 1) => Array(~~l).fill(v)
	static genMany = (l = this.ARRAY_SIZE, cb = this.gen) => this.genArr(l).map(this.isTypeFunc(cb) ? cb : () => cb)
	static genSort = () => this.genCoin(1, -1)
	static genIndex = (v) => (this.isLen(v) && v.length > 2 ? this.genInt(v.length - 1, 0) : this.genCoin(1, 0))
	static genElement = (v) => this.isLen(v) && v[this.genIndex(v)]
	static genElementsMany = (v, l = this.ARRAY_SIZE) => this.genMany(l, () => this.genElement(v))
	static genObjKey = (v) => this.isObj(v) && this.genElement(_keys(v))
	static genObjValue = (v) => this.isObj(v) && this.genElement(_values(v))
	static genObjEntry = (v) => this.isObj(v) && this.genElement(_entries(v))
	static genChar = () => this.genElement(this.CHARS_VALID)
	static genCharLatin = () => this.genElement(this.CHARS_ENG)
	static genCharKyrillic = () => this.genElement(this.CHARS_RUS)
	static genCharCode = () => this.genElement(this.CHAR_CODE_VALUES)
	static genCharCodeLatin = () => this.genInt(122, 97)
	static genCharCodeKyrillic = () => this.genInt(1103, 1072)
	static genRgb = (hex) => {
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
	static isRxp = (v) => v instanceof RegExp
	static toCallback = (v) => (this.isTypeFunc(v) ? v : () => v)
	static toLen = (v1) => (this.isLen(v1) ? v1.length : -1)
	static isLenMin = (v, l = this.MIN_LENGTH) => this.isLen(v) && v.length >= l
	static isLenMax = (v, l = this.MAX_LENGTH) => this.isLen(v) && v.length <= l
	static isLenEqual = (v1, v2) => this.isLen(v1, v2) && v1.length === v2.length
	static isLenRange = (v1, min = 0, max = this.MAX_VALUE) => this.isLen(v1) && v1.length > min && v1.length < max
	static isNum = (v1, min = 0, max = this.MAX_VALUE) => this.isTypeNum(v1) && v1 >= min && v1 < max
	static isStr = (v1, min = 0, max = this.MAX_VALUE) => this.isTypeStr(v1) && this.isLenRange(v1, min, max)
	static isArr = (v1, min = 0, max = this.MAX_VALUE) =>
		this.isTypeObj(v1) && _isArray(v1) && this.isLenRange(v1, min, max)
	static isObj = (v) => this.isTypeObj(v) && !_isArray(v) && this.is(v)
	static isCharLatin = (ch) => this.isTypeStr(ch) && this.CHARS_ENG.includes(ch.toLowerCase())
	static isCharKyrrylic = (ch) => this.isTypeStr(ch) && this.CHARS_RUS.includes(ch.toLowerCase())
	static isCharNum = (ch) => this.isTypeStr(ch) && this.CHARS_NUM.includes(ch.toLowerCase())
	static isCharSpecial = (ch) => this.isTypeStr(ch) && this.CHARS_SPECIAL.includes(ch.toLowerCase())
	static isCharValid = (ch) => this.isTypeStr(ch) && this.CHARS_VALID.includes(ch.toLowerCase())
	static isNumLike = (v1, v2, d = this.LIKE_DIFF) => this.isTypeNum(v1, v2, d) && v1 < v2 + d && v1 > v2 - d
	static filterStr = (...values) => values.filter(String)
	static filterNum = (...values) => values.filter(Number)
	static filterArr = (...values) => values.filter(Array)
	static filterBool = (...values) => values.filter(Boolean)
	static filterFunc = (...values) => values.filter(Function)

	//* this.Get Value Helpers
	static or = (v1, v2) => v1 || v2
	static and = (v1, v2) => v1 && v2
	static like = (v1, ...values) => values.filter((el) => el == v1 || typeof el == typeof v1)
	static not = (v1, ...values) => values.filter((el) => el !== v1 && typeof el !== typeof v1)
	static getIndexLast = (v) => this.isLen(v) && _max(0, v.length - 1)
	static getElementLast = (v) => this.isLen(v) && v?.[this.getIndexLast(v)]
	static getSlice = (v, i1 = 0, i2 = null) => {
		if (!this.isLen(v)) return false
		const last = this.getIndexLast(v)
		const start = this.isNum(i1, last) ? i1 : this.genInt(last)
		const end = this.isNum(i2, last) ? i1 : this.genInt(last)
		const range = [i?.[0] ?? this.genIndex(v), i?.[1] ?? this.genIndex(v)]
		return v.slice(_min(...range, last), _max(...range))
	}
	static getElementNeighbours = (arr, el, l = 1) => {
		if (!this.isLen(arr) || !arr.includes(el)) return false
		const i = arr.indexOf(el)
		const last = this.getIndexLast(arr)
		const start = i > 0 ? i - 1 : 0
		const end = i < last ? i + 1 : last
		return arr.slice(start, end)
	}
	static getElementNext = (arr, el = 0) => {
		if (!this.isLen(arr) || !arr.includes(el)) return false
		const i = arr.indexOf(el)
		const last = this.getIndexLast(arr)
		return i < last ? arr[i + 1] : arr[0]
	}
	static getSplitted = (str, ch = "", min = false) => {
		if (!this.isStr(str, ch)) return false
		const arr = str.split(ch).filter(String)
		return min ? arr.filter((el) => this.isLenMin(el, min)) : arr
	}
	static getChars = (s) => this.getSplitted(s, "")
	static getWords = (s, min = 1) => this.getSplitted(s, " ", min)
	static getPhrases = (s, min = 1) => this.getSplitted(s, ".", min)
	static getLines = (s, min = 1) => this.getSplitted(s, "\n", min)
	static getWordFirst = (str) => this.isStr(str) && this.getWords(str)?.[0]
	static getWordLast = (str) => this.isStr(str) && this.getWords(str).reverse()?.[0]
	static genPhraseFromWords = (words, size = this.ARRAY_SIZE) => {
		if (!this.isArr(words, 1)) return false
		return this.genElementsMany(words, size).join(" ")
	}
	static getPhrasesWithWord = (a, w) =>
		this.isArr(a) && this.isStr(w) && a.filter((el) => this.isStr(el) && el.includes(w))
	static getPhrasesWithoutWord = (a, w) =>
		this.isArr(a) && this.isStr(w) && a.filter((el) => this.isStr(el) && !el.includes(w))
	static getPhrasesEndsWith = (a, s) =>
		this.isArr(a) && this.isStr(s) && a.filter((el) => this.isStr(el) && el.endsWith(s))
	static getPhrasesStartsWith = (a, s) =>
		this.isArr(a) && this.isStr(s) && a.filter((el) => this.isStr(el) && el.startsWith(s))
	static getPhrasesByLength = (a, l = this.RANGE_LENGTH) => {
		if (!this.isArr(a)) return false
		if (this.isTypeNum(l)) return a.filter((el) => el === l)
		if (this.isArr(l)) return a.filter((el) => this.isLenRange(el, _min(...l), _max(...l)))
		return a.filter(String)
	}
	static getPhrasesByIndex = (a, l = this.RANGE_LENGTH) => {
		if (!this.isArr(a)) return false
		if (this.isArr(l)) return a.filter((el, i) => this.isLenRange(i, _min(...l), _max(...l)))
		if (this.isTypeNum(l)) return a.filter((el, i) => i === l)
		return a.filter(String)
	}

	//* Array Reducers
	static reduceText = (a, v) => `${a} ${v}`
	static reduceSum = (a, v) => a + v
	static reduceMult = (a, v) => a + v * 2
	static reduceObj = (a, v, i) => [...a, { value: v, index: i }]
	static reducePropValue = (a, v) => (this.is(v?.value) ? [...a, v?.value] : a)
	static reducePropDesc = (a, v) => (this.is(v?.desc) ? [...a, v.desc] : a)
	static reduceElementStats = (a, v) => a + "\n" + this.toResultStats(v)
	static reduceElementKeys = (a, v) => (this.isObj(v) ? [...a, _keys(v)] : a)
	static reduceElementValues = (a, v) => (this.isObj(v) ? [...a, _values(v)] : a)
	static reduceElementEntries = (a, v) => (this.isObj(v) ? [...a, _entries(v)] : a)

	//* Converters
	static _toObj = (...v) => ({ values: v })
	static _toArr = (...v) => v
	static _toStr = (...v) => _stringify(this._toObj(...v), null, 2)
	static toArr = (v) => (this.isArr(v) ? v : [v])
	static toObj = (v) => (this.isObj(v) ? v : { value: v })
	static toText = (v) => _stringify(this.toObj(v), null, 2)
	static toKeys = (v) => (this.isObj(v) ? _keys(v) : [])
	static toNumDiff = (...v) => _max(...v) - _min(...v)
	static toNumRange = (...v) => [_min(...v), _max(...v)]
	static toTrim = (v) => (this.isTypeStr(v) ? v : this.toText(v)).trim()
	static toTrimLine = (v = "") => this.isTypeStr(v) && v.replace(/\n/gim, " ")
	static toUnical = (v) => (this.isArr(v) ? [...new Set([...v])] : [v])
	static toJoin = (v, ch = "\n") => (this.isArr(v) ? v.join(this.isTypeStr(ch) ? ch : "\n") : this.toText(v))
	static toRepeat = (v, r = 2) => (this.isTypeStr(v) ? v : this.toText(v)).repeat(this.isNum(r, 2) ? r : 2)
	static toReversed = (v) => (this.isArr(v) ? v.reverse() : this.toText(v).split("").reverse().join(""))
	static toBuffer = (v) => this.is(v) && Buffer.from(v)
	static toFloatFixed = (v, l = 2) => (this.isTypeNum(v) ? Number(v.toFixed(~~l)) : 0)
	static toTrainingData = (input, output, ...other) => ({ input, output, other })
	static toFormatted = (s, r = "") => this.isTypeStr(s, r) && s.replace(/[^а-я\s\n]+/gim, r)
	static toPercent = (v1, v2) => this.isTypeNum(v1, v2) && v2 / (v1 / 100)
	static toResultStats = (v) => this.toText(v)
	static toResultProps = (v) => _assign({}, this.toObj(v), { desc: this.toResultStats(v) })
	static toTitleCase = (s) => {
		if (!this.isStr(s, 1)) return false
		const str = s.trim().toLowerCase()
		return str.slice(0, 1).toUpperCase() + str.slice(1)
	}
	static jsonParse = (v) => (this.isStr(v, 1) ? _parse(v) : false)
	static jsonCreate = (...v) => _stringify(v, null, 2)
	static toAverage = (...v) => {
		const a = v.flat().filter(Number)
		return a.length ? a.reduce(this.reduceSum) / a.length : 0
	}

	//* Regular Expressions
	static toRxp = (str = "", flags = "im") => new RegExp(str, flags)
	static toRxpNext = (word = "", rep = 1) => {
		const rxpString = word + `[^а-яa-z]{0,}[а-яa-z]{0,}`.repeat(rep)
		return new RegExp(rxpString, "gim")
	}
	static toMatchWordFirst = (str = "") => str.match(/^(\w+)\b/i)
	static toMatchWordLast = (str = "") => str.match(/\b(\w+)$/i)
	static toMatchLineWithWord = (str = "", word = "") => {
		if (!this.isStr(str)) return ""
		const rxp = this.toRxp(`^.+${word}.+$`, "im")
		const result = rxp.exec(str) ?? ""
		return result
	}
	static toMatchChars = (str = "") => {
		if (!this.isStr(str)) return []
		return str.split("").filter(String)
	}
	static toMatchWords = (str = "") => {
		if (!this.isStr(str)) return []
		return str
			.split(/\s|\n|\t|\b/gim)
			.filter((s) => this.isLenMin(s, 1))
			.map((s) => s.replace(/\s|\n|\t/, "").trim())
	}
	static toMatchPhrases = (str = "") => {
		if (!this.isStr(str)) return []
		return str
			.split(".")
			.filter((s) => this.isLenMin(s, 1))
			.map((s) => s.replace("\n", "").trim())
	}
	static toMatchLines = (str = "") => {
		if (!this.isStr(str)) return []
		return str
			.split("\n")
			.filter((s) => this.isLenMin(s, 1))
			.map((s) => s.replace("\n", "").trim())
	}
	static toMatchDividered = (str = "", div = this.CHAR_DIV) => {
		if (!this.isStr(str)) return []
		return str.split(div).filter((s) => this.isLenMin(s, 1))
	}
	static toMatchNextWords = (str = "", word = "", size = 2) => {
		if (!this.isStr(str) || !this.isStr(word) || !str.includes(word)) return ""
		const rxpString = word + ".\\b\\w+\\b".repeat(size)
		const rxp = new RegExp(rxpString, "im")
		const result = rxp.exec(str)
		return result?.[1] ?? ""
	}
	static toArrValues = (arr) =>
		this.isArr(arr, 1) && arr.map((value, index) => ({ value, index, text: value ? this.toText(value) : typeof value }))
	static toNotUnical = (arr) => {
		if (!this.isArr(arr, 1)) return []
		const unical = this.toUnical(arr)
		return arr.filter((v) => unical.includes(v))
	}
	static isUnical = (el, arr) => {
		const notUnical = this.toNotUnical(arr)
		return notUnical.includes(el)
	}
	static replaceManyChars = (str) => {
		if (!this.isStr(str)) return false
		return str.replace(/\s+|\t+/gim, " ").replace(/\n+/gim, "\n")
	}
	static replaceChars = (str) => {
		if (!this.isStr(str)) return false
		const replaced = str.replace(/[^а-яa-z\s\n,.]/gim, " ")
		return replaceManyChars(replaced)
	}
	static getIndex = (src = "", el = "") => {
		if (!this.isLenMin(src) || !el) return -1
		return src.indexOf(el)
	}
	static getIndexAll = (arr, el) => {
		if (!this.isArr(arr) || !el) return []
		return arr.reduce((a, v, i) => (v === el ? [...a, i] : a))
	}
	static getMatch = (v = "", el = "") => {
		if (!this.isStr(v) || !el) return []
		const rxp = this.isRxp(el) ? el : new RegExp(el, "im")
		return v.match(rxp) ?? []
	}
	static getMatchAll = (v = "", el = "") => {
		if (!this.isStr(v) || !el) return []
		const rxp = this.isRxp(el) ? el : new RegExp(el, "gim")
		return v.match(rxp) ?? []
	}
	static getElementsSequence = (arr, el, size = 3) => {
		if (!this.isArr(arr) || !el || !arr.includes(el)) {
			return []
		}
		const start = _max(arr.indexOf(el), 0)
		const end = _min(index + size, arr.length - 1)
		return arr.slice(start, end)
	}
	static msToTimeDesc = (ms) => {
		const seconds = ~~(ms / 1000)
		const minutes = ~~(seconds / 60)
		const hours = ~~(minutes / 60)
		const days = ~~(hours / 24)
		return `${days % 365} days, ${hours % 24} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`
	}
	static toFixed = (v, l = 2) => Number(Number(v).toFixed(l))
	static sliceToSize = (v, l) => this.isLen(v, 1) && (v.length > l ? v.slice(0, l) : v)
	static encode = (value, size = this.MAX_ENCODED_SIZE) => {
		let elements
		if (this.isNum(value)) {
			elements = [value]
		} else if (this.isStr(value)) {
			elements = this.toCharCodeFromText(value)
		} else if (this.isArr(value)) {
			elements = value.filter(String).reduce((a, v) => [...a, ...this.toCharCodeFromText(v)], [])
		}
		return this.sliceToSize(elements, size)
	}
	static decode = (value) => {
		if (this.isNum(value)) {
			return this.toCharFromCode(value)
		} else if (this.isArr(value)) {
			return value.map(this.toCharFromCode).filter(Boolean).join("")
		}
		return this.toCharFromCode(value)
	}
	static isStrEqual = (s1, s2) => this.isTypeStr(s1, s2) && s1 === s2
	static isLineBreak = (v) => v === "\n"
	static isSharp = (v) => v === "#"
	static isSpace = (v) => v === " "
	static isStar = (v) => v === "*"
	static character = (s) => (this.isStr(s) ? s.trim().split("").map(this.isSharp) : [])

	//* Shortcuts
	static _now = _now
	static _MAX_SAFE_INTEGER = _MAX_SAFE_INTEGER
	static _MIN_SAFE_INTEGER = _MIN_SAFE_INTEGER
	static _MAX_VALUE = _MAX_VALUE
	static _MIN_VALUE = _MIN_VALUE
	static _cwd = _cwd
	static _env = _env
	static _parse = _parse
	static _stringify = _stringify
	static _format = _format
	static _isEqual = _isEqual
	static _log = _log
	static _warn = _warn
	static _info = _info
	static _error = _error
	static _table = _table
	static _random = _random
	static _min = _min
	static _max = _max
	static _abs = _abs
	static _round = _round
	static _keys = _keys
	static _values = _values
	static _entries = _entries
	static _assign = _assign
	static _names = _names
	static _isArray = _isArray
	static _fromCharCode = _fromCharCode
	static _readdir = _readdir
	static _readFile = _readFile
	static _writeFile = _writeFile
	static _appendFile = _appendFile
	static _mkdir = _mkdir
}
module.exports = Helpers
