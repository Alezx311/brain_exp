const textTable = require("text-table")
const fs = require("fs")
const path = require("path")
const util = require("util")
const gradientString = require("gradient-string")
const chalk = require("chalk")
const cowsay = require("cowsay")
const lolcats = require("lolcats")
const O = require("json-stringify-safe")
const S = require("string")
const A = require("arr")

const { now: _now } = Date
const { cwd: _cwd, env: _env } = process
const { parse: _parse } = JSON
const { format: _format, isDeepStrictEqual: _isDeepEqual } = util
const { log: _log, warn: _warn, info: _info, error: _error } = console
const { random: _random, min: _min, max: _max, abs: _abs, round: _round } = Math
const { rainbow, print } = lolcats
const { keys: _keys, values: _values, entries: _entries, assign: _assign, getOwnPropertyNames: _names } = Object
const { isArray: _isArr } = Array
const { fromCharCode: _fromCharCode } = String
const {
	MAX_SAFE_INTEGER: _MAX_SAFE_INTEGER,
	MIN_SAFE_INTEGER: _MIN_SAFE_INTEGER,
	MAX: _MAX_VALUE,
	MIN_VALUE: _MIN_VALUE
} = Number
const {
	readdirSync: _readdir,
	readFileSync: _readFile,
	writeFileSync: _writeFile,
	appendFileSync: _appendFile,
	mkdirSync: _mkdir
} = fs

const _str = (...v) => v.map(S)
const _json = (...v) => O(...v, null, 2)
const _table = (v) => textTable(v, { align: ["l", "c"] })

const is = (...a) => a.every((v) => !!v)
const isLen = (...a) => a.every((v) => typeof v?.length === "number")
const isNum = (...a) => a.every((v) => typeof v === "number")
const isStr = (...a) => a.every((v) => typeof v === "string")
const isFunc = (...a) => a.every((v) => typeof v === "function")
const isBool = (...a) => a.every((v) => typeof v === "boolean")
const isBig = (...a) => a.every((v) => typeof v === "bigint")
const isSym = (...a) => a.every((v) => typeof v === "symbol")
const isUnd = (...a) => a.every((v) => typeof v === "undefined")
const isArr = (...a) => a.every((v) => _isArr(v))
const isObj = (...a) => a.every((v) => this.isObjTruthy(v) && !_isArr(v))
const isExist = (...a) => a.every((v) => v !== null && v !== undefined)
const isEqualType = (v1, v2) => typeof v1 === typeof v2
const isEqualStrict = (v1, v2) => _isDeepEqual(v1, v2)
const isEvery = (a1, ...a2) => isArr(a1, a2) && a1.every((v1) => a2.includes(v1))
const isSome = (a1, ...a2) => isArr(a1, a2) && a1.some((v1) => a2.includes(v1))

class Helpers {
	static is = is
	static isLen = isLen
	static isNum = isNum
	static isStr = isStr
	static isFunc = isFunc
	static isBool = isBool
	static isBig = isBig
	static isSym = isSym
	static isUnd = isUnd
	static isArr = isArr
	static isObj = isObj
	static isExist = isExist
	static isEqualType = isEqualType
	static isEqualStrict = isEqualStrict
	static isEvery = isEvery
	static isSome = isSome

	static _str = _str
	static _json = _json
	static _table = _table

	static strHumanize = (v) => isStr(v) && S(v).humanize().s
	static strLines = (v) => isStr(v) && S(v).lines().s
	static strCollapseWhitespace = (v) => isStr(v) && S(v).collapseWhitespace().s
	static strTitleCase = (v) => isStr(v) && S(v).titleCase().s
	static strTrim = (v) => isStr(v) && S(v).trim().s

	static arrLastIndex = (v) => isArr(v) && A.lastIndex(v)
	static arrFindLast = (v) => isArr(v) && A.findLast(v)
	static arrNumbers = (v) => isArr(v) && A.numbers(v)
	static arrStrings = (v) => isArr(v) && A.strings(v)
	static arrObjects = (v) => isArr(v) && A.objects(v)
	static arrFunctions = (v) => isArr(v) && A.functions(v)
	static arrArrays = (v) => isArr(v) && A.arrays(v)
	static arrFirst = (v) => isArr(v) && A.first(v)
	static arrLast = (v) => isArr(v) && A.last(v)
	static arrFindFirst = (v) => isArr(v) && A.findFirst(v)
	static arrHasType = (v) => isArr(v) && A.hasType(v)

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
	static BIG = this.NUM * this.MAX
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
	].map((src, index) => {
		const obj = { ...src, index, type: typeof src.value, callback: () => src.value }
		const entries = _entries(obj)
		const text = entries.map(([k, v]) => [k, v].map(S))
		return { ...obj, text }
	})

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

	static elMapper = (el, index) => {
		const isObj = typeof el === "object" && !!el && !Array.isArray(el)
		const values = isObj ? { value: el?.value ?? el, index, ...el } : { value: el, index }
		const obj = { ...values, index, type: typeof values.value }
		const entr = _entries(obj).map(([k, v]) => [k, v].map(S))
		return { ...obj, text: `\n${_table(entr)}\n` }
	}
	// console.log(elMapper(OBJ))
	// console.log(elMapper(OBJ, { desc: "Some descr", someKey: "other props" }))

	static COLOR_METHODS = ["blue", "red", "blue", "blue", "red", "underline", "green", "blue", "red", "green", "yellow"]
	static CONSOLE_SOURCES = this.CONSOLE_METHODS.map((desc) => {
		const callback = console[desc]
		const logger = callback
		return { desc, callback, logger }
	})
	static GRADIENTS_SOURCES = this.GRADIENT_METHODS.map((desc) => {
		const callback = gradientString[desc]
		const logger = (...v) => _log(callback(_json(v)))
		return { desc, callback, logger }
	})
	static COLORED_SOURCES = this.COLOR_METHODS.map((desc) => {
		const callback = chalk[desc]
		const logger = (...v) => _log(callback(_json(v)))
		return { desc, callback, logger }
	})
	static CONSOLE_OTHER_SOURCES = [
		{ desc: "lolcat_print", callback: print, logger: print },
		{ desc: "lolcat_rainbow", callback: rainbow, logger: (...v) => _log(rainbow(_json(v))) },
		{ desc: "cow_say", callback: cowsay.say, logger: (...v) => _log(cowsay.say({ text: _json(v) })) },
		{ desc: "cow_think", callback: cowsay.think, logger: (...v) => _log(cowsay.think({ text: _json(v) })) }
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
	static is = (...a) => a.every((v) => !!v)
	static isLen = (...a) => a.every((v) => typeof v?.length === "number")
	static isNum = (...a) => a.every((v) => typeof v === "number")
	static isStr = (...a) => a.every((v) => typeof v === "string")
	static isFunc = (...a) => a.every((v) => typeof v === "function")
	static isBool = (...a) => a.every((v) => typeof v === "boolean")
	static isBig = (...a) => a.every((v) => typeof v === "bigint")
	static isSym = (...a) => a.every((v) => typeof v === "symbol")
	static isUnd = (...a) => a.every((v) => typeof v === "undefined")
	static isObjTruthy = (...a) => a.every((v) => !!v && typeof v === "object")
	static isArr = (...a) => a.every((v) => _isArr(v))
	static isObj = (...a) => a.every((v) => this.isObjTruthy(v) && !_isArr(v))
	static isExist = (...a) => a.every((v) => v !== null && v !== undefined)
	static isType = (v1, v2) => typeof v1 === typeof v2
	static isEvery = (a1, ...a2) => isArr(a1, a2) && a1.every((v1) => a2.includes(v1))
	static isSome = (a1, ...a2) => isArr(a1, a2) && a1.some((v1) => a2.includes(v1))
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
	static toMaxLen = (v, max = this.MAX) => (this.isLen(v) && v.length > max ? v.slice(0, max) : v)
	static toMinLen = (v, min = this.MIN) => {
		if (!this.isLen(v)) return false
		const l = v.length
		if (l > min) return true
		const diff = l - min
		const arr = Array(diff).fill(" ")
		if (_isArr(v)) return [...v, ...arr]
		return v + arr.join("")
	}

	static toMatchLen = (v, l) => (this.isLen(v) && v.length === l ? v : this.toMaxLen(this.toMinLen(v, l), l))
	static toCharCode = (char) => this.isStr(char) && char.charCodeAt(0) / this.CHAR_CODE_MULT
	static toCharFromCode = (code) => this.isNum(code) && _fromCharCode(code) * this.CHAR_CODE_MULT
	static toCharCodeFromText = (text) => {
		if (!this.isStr(text)) return false
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
	static MIN = 1
	static MAX = 2000
	static MIN_CHAR_CODE = _min(...this.CHAR_CODE_VALUES)
	static MAX_CHAR_CODE = _max(...this.CHAR_CODE_VALUES)
	static RANGE = [this.MIN, this.MAX]
	static RANGE_LENGTH = [this.MIN, this.MAX]
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
	static fileList = (s = this.LOG_DIR) => this.isStr(s) && _readdir(this.filePath(s))
	static fileRead = (s = this.LOG_FILE) => this.isStr(s) && _readFile(this.filePath(s), this.OPTIONS_FS).toString()
	static fileWrite = (file, data = "") => this.isStr(file) && _writeFile(this.filePath(file), data, this.OPTIONS_FS)
	static fileAppend = (file, data = "") => this.isStr(file) && _appendFile(this.filePath(file), data, this.OPTIONS_FS)
	static fileCreateDir = (dir = this.NAME_TEMP) => this.isStr(dir) && _mkdir(dir)

	//* this.Generate Value Helpers
	static gen = (max = null) => (max ? _random() * max : _random())
	static genStr = () => _random().toString(36).substring(7)
	static genObj = (size = this.ARRAY_SIZE) => _from(this.genArr(size).map(() => [this.genStr(), _random()]))
	static genBool = () => this.gen() > 0.5
	static genInt = (max = this.MAX, min = this.MIN) => ~~(this.gen() * max - min) + min
	static genCoin = (v1 = true, v2 = false) => (this.genBool() ? v1 : v2)
	static genId = () => `${parseInt(`${this.genInt()}`, 36)}`
	static genKey = () => this.genId().repeat(5).replace(/[a-z]/gim, "")
	static genArr = (l = this.ARRAY_SIZE, v = 1) => Array(~~l).fill(v)
	static genMany = (l = this.ARRAY_SIZE, cb = this.gen) => this.genArr(l).map(this.isFunc(cb) ? cb : () => cb)
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

	static isRxp = (v) => v instanceof RegExp
	static toCallback = (v) => (typeof v === "function" ? v : () => v)
	static isLenMin = (v, l = this.MIN) => v?.length >= l
	static isLenMax = (v, l = this.MAX) => v?.length <= l
	static isLenRange = (v1, min = 0, max = this.MAX) => v1?.length > min && v1?.length < max
	static isCharLatin = (ch) => this.isStr(ch) && this.CHARS_ENG.includes(ch.toLowerCase())
	static isCharKyrrylic = (ch) => this.isStr(ch) && this.CHARS_RUS.includes(ch.toLowerCase())
	static isCharNum = (ch) => this.isStr(ch) && this.CHARS_NUM.includes(ch.toLowerCase())
	static isCharSpecial = (ch) => this.isStr(ch) && this.CHARS_SPECIAL.includes(ch.toLowerCase())
	static isCharValid = (ch) => this.isStr(ch) && this.CHARS_VALID.includes(ch.toLowerCase())
	static isNumLike = (v1, v2, d = this.LIKE_DIFF) => this.isNum(v1, v2, d) && v1 < v2 + d && v1 > v2 - d
	static filterStr = (...v) => _isArr(v) && v.filter(String)
	static filterNum = (...v) => _isArr(v) && v.filter(Number)
	static filterArr = (...v) => _isArr(v) && v.filter(Array)
	static filterBool = (...v) => _isArr(v) && v.filter(Boolean)
	static filterFunc = (...v) => _isArr(v) && v.filter(Function)

	//* this.Get Value Helpers
	static or = (v1, v2) => v1 || v2
	static and = (v1, v2) => v1 && v2
	static like = (v1, ...values) => _isArr(values) && values.filter((el) => typeof el == typeof v1)
	static not = (v1, ...values) => _isArr(values) && values.filter((el) => typeof el !== typeof v1 && el !== v1)
	static getIndexLast = (v) => _isArr(v) && this.arrLastIndex(v)
	static getElementLast = (v) => _isArr(v) && v[this.arrLastIndex(v)]
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
		if (this.isNum(l)) return a.filter((el) => el === l)
		if (this.isArr(l)) return a.filter((el) => this.isLenRange(el, _min(...l), _max(...l)))
		return a.filter(String)
	}
	static getPhrasesByIndex = (a, l = this.RANGE_LENGTH) => {
		if (!this.isArr(a)) return false
		if (this.isArr(l)) return a.filter((el, i) => this.isLenRange(i, _min(...l), _max(...l)))
		if (this.isNum(l)) return a.filter((el, i) => i === l)
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
	static toArr = (...v) => (this.isArr(v) ? v : [v])
	static toObj = (...v) => (this.isObj(v) ? v : { value: v })
	static toKeys = (v) => this.isObj(v) && _keys(v)
	static toNumDiff = (...v) => _max(...v) - _min(...v)
	static toNumRange = (...v) => [_min(...v), _max(...v)]
	static toTrim = (v) => (this.isStr(v) ? v : this._json(v)).trim()
	static toTrimLine = (v = "") => this.isStr(v) && v.replace(/\n/gim, " ")
	static toUnical = (v) => (this.isArr(v) ? [...new Set([...v])] : [v])
	static toJoin = (v, ch = "\n") => (this.isArr(v) ? v.join(this.isStr(ch) ? ch : "\n") : this._json(v))
	static toRepeat = (v, r = 2) => (this.isStr(v) ? v : this._json(v)).repeat(this.isNum(r, 2) ? r : 2)
	static toReversed = (v) => (this.isArr(v) ? v.reverse() : this._json(v).split("").reverse().join(""))
	static toBuffer = (v) => this.is(v) && Buffer.from(v)
	static toFloatFixed = (v, l = 2) => (this.isNum(v) ? Number(v.toFixed(~~l)) : 0)
	static toTrainingData = (input, output, ...other) => ({ input, output, other })
	static toFormatted = (s, r = "") => this.isStr(s, r) && s.replace(/[^а-я\s\n]+/gim, r)
	static toPercent = (v1, v2) => this.isNum(v1, v2) && v2 / (v1 / 100)
	static toResultStats = (v) => this._json(v)
	static toResultProps = (v) => _assign({}, this.toObj(v), { desc: this.toResultStats(v) })
	static toTitleCase = (s) => {
		if (!this.isStr(s, 1)) return false
		const str = s.trim().toLowerCase()
		return str.slice(0, 1).toUpperCase() + str.slice(1)
	}
	static jsonParse = (v) => (this.isStr(v, 1) ? _parse(v) : false)
	static jsonCreate = (...v) => _json(v, null, 2)
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
		this.isArr(arr, 1) && arr.map((value, index) => ({ value, index, text: value ? this._json(value) : typeof value }))
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
	static isStrEqual = (s1, s2) => this.isStr(s1, s2) && s1 === s2
	static isLineBreak = (v) => v === "\n"
	static isSharp = (v) => v === "#"
	static isSpace = (v) => v === " "
	static isStar = (v) => v === "*"
	static character = (s) => (this.isStr(s) ? s.trim().split("").map(this.isSharp) : [])
	static msToTimeDesc = (ms) => {
		if (!this.isNum(ms)) return ""
		const seconds = ms / 1000
		const minutes = seconds / 60
		const hours = minutes / 60
		const days = hours / 24
		const years = days / 365
		return `
Years: ${years.toFixed(2)}
Days: ${days.toFixed(2)}
Hours: ${hours.toFixed(2)}
Minutes: ${minutes.toFixed(2)}
Seconds: ${seconds.toFixed(2)}
Ms: ${ms.toFixed(2)}
`
	}
	//* Shortcuts
	static _now = _now
	static _MAX_SAFE_INTEGER = _MAX_SAFE_INTEGER
	static _MIN_SAFE_INTEGER = _MIN_SAFE_INTEGER
	static _MAX_VALUE = _MAX_VALUE
	static _MIN_VALUE = _MIN_VALUE
	static _cwd = _cwd
	static _env = _env
	static _parse = _parse
	static _json = _json
	static _format = _format
	static _isDeepEqual = _isDeepEqual
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
	static _isArr = _isArr
	static _fromCharCode = _fromCharCode
	static _readdir = _readdir
	static _readFile = _readFile
	static _writeFile = _writeFile
	static _appendFile = _appendFile
	static _mkdir = _mkdir
}
module.exports = Helpers
