const fs = require("fs")
const path = require("path")
const util = require("util")
const cowsay = require("cowsay")
const gradientString = require("gradient-string")
const chalk = require("chalk")
const { rainbow, print } = require("lolcats")

const { parse: _parse, stringify: _stringify} = JSON
const { format: _format, isDeepStrictEqual: _isEqual } = util
const { log: _log, warn: _warn, info: _info, error: _error, table: _table, timeStamp: _timeStamp } = console
const { random: _random, min: _min, max: _max, abs: _abs, round: _round } = Math
const { keys: _keys, values: _values, entries: _entries, assign: _assign, getOwnPropertyNames: _names } = Object
const { isArray: _isArray } = Array
const { fromCharCode: _fromCharCode } = String

class Helpers {
	static UND = undefined
	static NULL
	static ERR = new Error("Some Error")
	static STR = "Some string value"
	static NUM = 42
	static BLN = false
	static ARR = [msg, num]
	static OBJ = { msg, num }
	static SYM = new Symbol("Symbol example")
	static BIG = this.NUM * Number.MAX_VALUE
	static FUNC = (...values) => values
	static SRC = [
		{ value: this.ERR, desc: "ERR" },
		{ value: this.STR, desc: "STR" },
		{ value: this.UND, desc: "UND" },
		{ value: this.NULL, desc: "NULL" },
		{ value: this.NUM, desc: "NUM" },
		{ value: this.ARR, desc: "ARR" },
		{ value: this.OBJ, desc: "OBJ" },
		{ value: this.FUNC, desc: "FUNC" },
		{ value: this.SYM, desc: "SYM" },
		{ value: this.BIG, desc: "BIG" },
		{ value: this.BLN, desc: "BLN" }
	].map((src) => ({ ...src, type: typeof src.value, callback: () => src.value }))
	static TYPEOF = ["string", "number", "function", "object", "boolean", "bigint", "symbol", "undefined"]
	static JSON = JSON.stringify(this.SRC, null, 2)
	static VALUES = {
		array: this.ARR,
		string: this.STR,
		number: this.NUM,
		function: this.FUNC,
		object: this.OBJ,
		boolean: this.BLN,
		bigint: this.BIG,
		symbol: this.SYM,
		undefined: this.UND,
		null: this.NULL,
		sources: this.SRC,
		type: this.TYPEOF,
		json: this.JSON
	}
	static _values = (...v) => v
	static _type = (v) => (this.TYPEOF.includes(v) ? v : typeof v)
	static LOG_METHODS = ["log", "info", "warn", "error", "table", "dir", "debug"]
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
	static COLOR_METHODS = [
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
		"yellow",
		"rgb",
		"hex"
	]
	static CONSOLE_SOURCES = this.LOG_METHODS.map((desc) => {
		const callback = console[desc]
		const logger = (...v) => callback(...v)
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
	static LOGGER_SOURCE_DEFAULT = { desc: "log", callback: _log, logger: (...v) => _log(this.toText(v)) }
	static LOGGER_SOURCES = [
		...this.CONSOLE_SOURCES,
		...this.GRADIENTS_SOURCES,
		...this.COLORED_SOURCES,
		...this.CONSOLE_OTHER_SOURCES,
		{ desc: "Lolcat", callback: print, logger: (...v) => print(...v) },
		{ desc: "Lolcat Rainbow", callback: rainbow, logger: (...v) => _log(rainbow(...v)) },
		{ desc: "Cowsay", callback: cowsay.say, logger: (...v) => cowsay.say(...v) },
		{ desc: "Cowsay think", callback: cowsay.think, logger: (...v) => cowsay.think(...v) },
		LOGGER_SOURCE_DEFAULT
	]
	static logPretty = (values, opt) => {
		const src = this.isTypeStr(opt) && this.LOGGER_SOURCES.find((s) => s.desc === opt)
		const { logger } = src || this.LOGGER_SOURCE_DEFAULT
		logger(values)
	}
	static logExamples = (msg = this.STR) =>
		this.LOGGER_SOURCES.map(({ logger, desc }) => logger(`Example of ${desc} message: ${msg}`))
	
		//* Validators
	static is = (...a) => a.every((v) => !!v)
	static isTypeStr = (...a) => a.every((v) => typeof v === "string")
	static isTypeNum = (...a) => a.every((v) => typeof v === "number")
	static isTypeFunc = (...a) => a.every((v) => typeof v === "function")
	static isTypeObj = (...a) => a.every((v) => typeof v === "object")
	static isTypeBool = (...a) => a.every((v) => typeof v === "boolean")
	static isTypeBig = (...a) => a.every((v) => typeof v === "bigint")
	static isTypeSym = (...a) => a.every((v) => typeof v === "symbol")
	static isTypeUnd = (...a) => a.every((v) => typeof v === "undefined")
	static isDefined = (...a) => a.every((v) => v !== null && v !== undefined)
	static isTypeSimple = (...a) => a.every((v) => !this.isTypeObj(v))
	static isTypeObjTruthy = (...a) => a.every((v) => this.isTypeObj(v) && !this.isDefined(v))
	static isType = (v1, v2) => this._type(v1) === this._type(v2)
	static isEqual = (v1, v2) =>  _isEqual(v1, v2)
	static isEvery = (v, ...arr) => (_isArray(v) ? v.every((el) => arr.includes(el)) : arr.every((el) => el === v))
	static isSome = (v, ...arr) => (_isArray(v) ? v.some((el) => arr.includes(el)) : arr.some((el) => el === v))
	
	//* File names
	static FILENAME_OUTPUT = "output.txt"
	static FILENAME_INPUT = "input.txt"
	static FILENAME_LOG = "log.log"
	
	//* Folders
	static PATH_FILES = path.join(__dirname, "./files/")
	static PATH_RESULTS = path.join(__dirname, "./results/")
	static PATH_NETWORKS = path.join(__dirname, "./networks/")
	static PATH_TRAINING = path.join(__dirname, "./training/")
	static CONTENT_FILES = fs.readdirSync(this.PATH_FILES)
	static CONTENT_RESULTS = fs.readdirSync(this.PATH_RESULTS)
	static CONTENT_NETWORKS = fs.readdirSync(this.PATH_NETWORKS)
	static CONTENT_TRAINING = fs.readdirSync(this.PATH_TRAINING)
	
	//* Files
	static PATH_OUTPUT = path.join(this.PATH_FILES, this.FILENAME_OUTPUT)
	static PATH_INPUT = path.join(this.PATH_FILES, this.FILENAME_INPUT)
	static PATH_LOG = path.join(this.PATH_FILES, this.FILENAME_LOG)
	
	//* Chars
	static CHAR_CODE_MULT = 256
	static MAX_ENCODED_SIZE = 100
	static LINE = "\n"
	static TAB = "\t"
	static SPACE = " "
	static COMMA = ","
	static DOT = "."
	static DIV = "#"

	static toMaxLength = (v, max) => (this.isLen(v) && v.length > max ? v.slice(0, max) : v)
	static toCharCode = (char) => char.charCodeAt(0) / this.CHAR_CODE_MULT
	static toCharFromCode = (code) => _fromCharCode(code) * this.CHAR_CODE_MULT
	static toCharCodeFromText = (text) => {
		if (!this.isTypeStr(text)) return false
		const values = text.split("").reduce((acc, v) => [...acc, this.toCharCode(v)], [])
		return this.toMaxLength(values, this.MAX_ENCODED_SIZE)
	}

	static CHARS_NUM = "0123456789"
	static CHARS_ENG = "abcdefghijklmnopqrstuvwxyz"
	static CHARS_RUS = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
	static CHARS_SIMPLE = this.CHARS_ENG + this.CHARS_RUS + this.CHARS_NUM
	static CHARS_SPECIAL = this.LINE + this.TAB + this.SPACE + this.COMMA + this.DOT + this.DIV
	static CHARS_VALID = this.CHARS_SIMPLE + this.CHARS_SPECIAL
	static CHAR_CODE_SOURCES = this.CHARS_VALID.map((char) => ({ char, code: this.toCharCode(char) }))
	static CHAR_CODE_VALUES = [
		...new Set([...this.CHAR_CODE_SOURCES.reduce((acc, v) => [...acc, v.code], []).filter(Number)])
	]
	
	//* Dividers
	static DIV_LINE = `\n${this.DIV.repeat(20)}\n`
	static DIV_TITLE = `\t${this.DIV.repeat(5)}\t`
	
	//* Constants
	static MIN = 1
	static MAX = 100
	static RANGE = [this.MIN, this.MAX]
	static ARRAY_SIZE = 10
	static LIKE_DIFF = 0.1
	static MIN_LENGTH = 3
	static MAX_LENGTH = 16
	static MIN_CHAR_CODE = _min(...this.CHAR_CODE_VALUES)
	static MAX_CHAR_CODE = _max(...this.CHAR_CODE_VALUES)
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
	static OPTIONS_BRAIN_TRAIN = {
		learningRate: this.LEARNING_RATE,
		iterations: this.ITERATIONS,
		errorThresh: this.ERROR_THRESHOLD,
		log: true,
		logPeriod: 100,
		momentum: 0.1,
		callback: _info,
	}

	static get time() {
		return Date.now
	}
	static get timestamp() {
		return new Date().toLocaleString()
	}
	static get source() {
		return `\t${__filename} at ${this.timestamp}\t`
	}
	static get dice() {
		return ~~(_random() * this.MAX_LENGTH) + this.MIN_LENGTH
	}
	static get dice6() {
		return ~~(_random() * 5) + 1
	}
	static get dice21() {
		return ~~(_random() * 20) + 1
	}
	
	static sourceMessage = (msg) => `\n\t${__filename}\n\t${this.timestamp}\n\t${message}\n`
	
	//* File System Helpers
	static filePath = (...s) => path.join(__dirname, ...s)
	static fileList = (s = "./") => fs.readdirSync(this.filePath(s))
	static fileRead = (s = this.LOG_FILE) => fs.readFileSync(this.filePath(s), this.OPTIONS_FS).toString()
	static fileWrite = (file = this.LOG_FILE, data = "") => fs.writeFileSync(this.filePath(file), data, this.OPTIONS_FS)
	static fileAppend = (file = this.LOG_FILE, data = "") => fs.appendFileSync(this.filePath(file), data, this.OPTIONS_FS)
	static fileCreateDir = (dir = this.PATH_LOG) => fs.mkdirSync(dir)
	
	//* Generate Value Helpers
	static gen = () => _random()
	static genBool = () => this.gen() > 0.5
	static genInt = (max = this.MAX, min = this.MIN) => this.isTypeNum(max, min) ? ~~(_random() * max - min) + min : ~~(_random() * this.MAX)
	static genCoin = (v1 = true, v2 = false) => (this.genBool() ? v1 : v2)
	static genId = () => `${parseInt(`${this.genInt()}`, 36)}`
	static genKey = () => this.genId().repeat(5).replace(/[a-z]/gim, "")
	static genArr = (l = this.ARRAY_SIZE, v = 1) => Array(~~l).fill(v)
	static genMany = (l = this.ARRAY_SIZE, cb = _random) => this.genArr(l).map(this.isTypeFunc(cb) ? cb : () => cb)
	static genSort = () => this.genCoin(1, -1)
	static genIndex = (v) => this.isLen(v) && v.length > 2 ? this.genInt(v.length - 1, 0) : this.genCoin(1,0)
	static genElement = (v) => this.isLen(v) && v[this.genIndex(v)]
	static genElementsMany = (v, l = this.ARRAY_SIZE) => this.genMany(l, () => this.genElement(v))
	static genObjKey = (v) => this.isObj(v) && this.genElement(_keys(v))
	static genObjValue = (v) => this.isObj(v) && this.genElement(_values(v))
	static genObjEntry = (v) => this.isObj(v) && this.genElement(_entries(v))
	static genChar = () => this.genElement(this.CHARS_SIMPLE)
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

	static toCallback = (v) => this.isTypeFunc(v) ? v : () => v
	static isLen = (...v) => v.every((el) => this.is(el?.length))
	static toLen = (v1, v2 = false) => (this.isLen(v1) ? v1.length : v2)
	static toProps = (v) => this.isTypeObjTruthy(v) && _names(v)
	static isLenMin = (v, l = this.MIN_LENGTH) => this.toLen(v, l - 1) >= l
	static isLenMax = (v, l = this.MAX_LENGTH) => this.toLen(v, l + 1) <= l
	static isLenEqual = (v1, v2) => this.toLen(v1) === v2
	static isNum = (v, l) => this.isTypeNum(v) && (l ? v >= l : true)
	static isStr = (v, l) => this.isTypeStr(v) && (l ? v.length >= l : true)
	static isArr = (v, l) => this.isTypeObj(v) && _isArray(v) && (l ? v.length >= l : true)
	static isRxp = (v) => v instanceof RegExp
	static isNum = (v, ...n = this.RANGE) =>   this.isTypeNum(v) && (this.isTypeNum(...n) ?  v > _min(...n) && v < _max(...n) : true) 
	static isNumLike = (v1, v2, diff = this.LIKE_DIFF) =>this.isNum(v1, v2 + diff, v2 - diff)
	static isCharLatin = (ch) => this.isTypeStr(ch) && this.CHARS_ENG.includes(ch.toLowerCase())
	static isCharKyrrylic = (ch) => this.isTypeStr(ch) && this.CHARS_RUS.includes(ch.toLowerCase())
	static isCharNum = (ch) => this.isTypeStr(ch) && this.CHARS_NUM.includes(ch.toLowerCase())
	static isCharSpecial = (ch) => this.isTypeStr(ch) && this.CHARS_SPECIAL.includes(ch.toLowerCase())
	static isCharValid = (ch) => this.isTypeStr(ch) && this.CHARS_VALID.includes(ch.toLowerCase())
	static isObj = (v, ...keys) => {
		if (!this.isTypeObjTruthy(v) || this.isArr(v)) return true
		return this.isEvery(_names(v), ...keys)
	}
	
	//* Get Value Helpers
	static _or = ( v1, v2) => (this.isTruthy(v1) ? v1 : v2)
	static _and = ( v1, v2) => (this.isTruthy(v1) ? v2 : v1)
	static getIndexLast = (v) =>  this.isLen(v) && _abs(v.length - 1)
	static getElementLast = (v) => this.isLen(v) && v[this.getIndexLast(v)]
	static getPart = (v, ...i) => {
		if(!this.isLen(v)) return false
		if(!v.length < 2) return v
		const range = [i?.[0] ?? this.genIndex(v), i?.[1] ?? this.genIndex(v)]
		return  v.slice(_min(...range), _max(...range))
	} 
	static getElementNeighbours = (arr, el, l = 1) => {
		if(!this.isLen(arr) || !arr.includes(el)) return false 
		const i = arr.indexOf(el)
		const last = this.getIndexLast(arr)
		const start = i > 0 ? i - 1 : 0
		const end = i < last ? i + 1 : last
		return  arr.slice(start, end)
	}
	static getElementNext = (arr, el = 0) => {
		if(!this.isLen(arr) || !arr.includes(el)) return false 
		const i = arr.indexOf(el)
		const last = this.getIndexLast(arr)
		return i < last ? arr[i + 1] : arr[0]
	}
	static getSplitted = (str, ch = '', min = false) => {
		if(!this.isStr(str, ch)) return false
		const arr = str.split(ch)
		return min ? arr.filter(String) : arr.filter((el) => this.isLenMin(el, min))
	}
	static getChars = (s) =>  this.getSplitted(s, "", 1)
	static getWords = (s, min = this.MIN_LENGTH) => this.getSplitted(s, " ", min)
	static getPhrases = (s, min = this.MIN_LENGTH) => this.getSplitted(s, '.', min)
	static getLines = (s, min = this.MIN_LENGTH) => this.getSplitted(s, '\n', min)
	static getWordFirst = (str) => this.isTypeStr(str) ? str.split(' ')[0] : false
	static getWordLast = (str) => this.isTypeStr(str) ? str.split(' ').reverse()[0] : false
	static genPhraseFromWords = (words, size = this.ARRAY_SIZE) => {
	if(!this.isLenMin(words, 1)) return false
		return this.genElementsMany(words, size).join(' ')
		}
		static getPhrasesWithWord = (arr, word) => this.isArr(arr) && arr.filter((el) => this.isTypeStr(el) && el.includes(word))
			static getPhrasesWithoutWord = (arr, word) => this.isArr(arr) && arr.filter((el) => this.isTypeStr(el) && !el.includes(word))
			static getPhrasesEndsWith = (arr, str) => this.isArr(arr) && this.isTypeStr(str) && arr.filter((el) => this.isTypeStr(el) && el.endsWith(str))
	static getPhrasesStartsWith = (arr, str) => this.isArr(arr) && this.isTypeStr(str) && arr.filter((el) => this.isTypeStr(el) && el.startsWith(str))
	static getPhrasesStartsWith = (arr, str) => this.isArr(arr) && this.isTypeStr(str) && arr.filter((el) => this.isTypeStr(el) && el.startsWith(str))
	
	//* Array Reducers
	static reduceText = (a, v) => `${a} ${v}`
	static reduceSum = (a, v) => a + v
	static reduceMult = (a, v) => a + v * 2
	static reduceObj = (acc, value, index) => [...acc, { value, index }]
	
	//* Converters
	static toArr = v => (this.isArr(v) ? v : [v])
	static toObj = (value) => (this.isObj(value) ? value : { value })
	static toText = (v) => _stringify(this.toObj(v), null, 2)
	static toKeys = (v) => (this.isObj(v) ? _keys(v) : _names(v)) 
	static toNumDiff = (...v) => _max(...v) - _min(...v)
	static toNumRange = (...v) => [_min(...v), _max(...v)]
	static toNumRangeReversed = (...v) => [_max(...v), _min(...v)]
	static toTrim = (v) => (this.isTypeStr(v) ? v : this.toText(v)).trim()
	static toTrimLine = (v = "") => this.isTypeStr(v) && v.replace(/\n/gim, " ")
	static toUnical = (v) => this.isArr(v) ? [...new Set([...v])] : [v]
	static toJoin = (v, ch = '\n') => (this.isArr(v) ? v.join(this.isTypeStr(ch) ? ch : '\n') : this.toText(v))
	static toRepeat = (v, r = 2) => (this.isTypeStr(v) ? v: this.toText(v)).repeat(this.isNum(r, 2) ? r : 2)
	static toReversed = (v) => (this.isArr(v) ? v.reverse() : this.toText(v).split('').reverse().join(''))
	static toBuffer = (v) => this.is(v) && Buffer.from(v)
	static toFloatFixed = (v, l = 2) => this.isTypeNum(v) ?  Number(v.toFixed(~~l)) : 0 
	static toTrainingData = (input, output, ...other) => ({ input, output, other })
	static toFormatted = (s, r = "") => this.isTypeStr(s, r) && s.replace(/[^а-я\s\n]+/gim, r)
	static toPercent = (v1 = 100, v2 = 1) => this.isTypeNum(v1, v2) && (v2 / (v1 / 100))
	static toResultStats = (v) => this.is(v) ? `Expected: ${v?.output}, Received: ${v?.result}, Values: ${v?.input}`.trim() : 'Unknown data'
	static toResultProps = (v) => this.isObj(v) ? { ...v, desc: this.toResultStats(v) } : { value: v, desc: 'Unknown value'}
	static toTitleCase = (s) => {
		if(!this.isTypeStr(s))	return false
		const str = s.trim()
		return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()
	}
	static jsonParse = (value) => this.isTypeStr(value) ? _parse(value) : { }
	static jsonCreate = (value) => _stringify(this.toObj(value), null, 2)
	static toAverage = (values) => {
		if (!this.isArr(values, 1)) return 0
		const nums = values.filter(Number)
		const length = nums.length
		return  this.reduceSum(nums) / length
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
	static toMatchDividered = (str = "", div = this.DIV) => {
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
	static toArrValues = (arr) => arr.map((value, index) => ({ value, index, text: this.toText(value) }))
	static toNotUnical = (arr) => {
		const unical = this.toUnical(arr)
		return arr.filter((v) => unical.includes(v))
	}
	static isUnical = (el, arr) => {
		const notUnical = this.toNotUnical(arr)
		return notUnical.includes(el)
	}
	static replaceManyChars = (str) => {
		return str.replace(/\s+|\t+/gim, " ").replace(/\n+/gim, "\n")
	}
	static replaceChars = (str) => {
		const replaced = str.replace(/[^а-яa-z\s\n,.]/gim, " ")
		return this.replaceManyChars(replaced)
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
	static getElementsSequence = (arr, word, size = this.dice6) => {
		const index = this.getIndex(arr, word)
		const values = arr.slice(index, index + size)
		const text = this.toTitleCase(values.join(" "))
			.replace(/[^а-яa-z,.\s]/gim, " ")
			.replace(/\s+/, " ")
			.trim()
		return { word, index, values, text }
	}
	static msToTimeDesc = (ms) => {
		const seconds = ~~(ms / 1000)
		const minutes = ~~(seconds / 60)
		const hours = ~~(minutes / 60)
		const days = ~~(hours / 24)
		return `${days % 365} days, ${hours % 24} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`
	}
	static toFixed = (value, size = 2) => Number(Number(value).toFixed(size))
	static sliceToSize = (value, size) => (value.length > size ? value.slice(0, size) : value)
	static codeEncode = (value) => value / this.CHAR_CODE_MULT
	static codeDecode = (value) => ~~(value * this.CHAR_CODE_MULT)
	static charEncode = (char) => this.codeEncode(char.charCodeAt(0))
	static charEncode = (code) => _fromCharCode(this.codeDecode(code))
	static encode = (value, size = this.MAX_ENCODED_SIZE) => {
		let elements
		if (this.isNum(value)) {
			elements = [value]
		} else if (this.isStr(value)) {
			elements = value.split("")
		} else if (this.isArr(value)) {
			elements = value.filter(String)
		}
		const result = elements.reduce((acc, v) => [...acc, this.charEncode(v)], [])
		return this.sliceToSize(result, size)
	}
	static decode = (value) => {
		if (this.isNum(value)) {
			return this.charDecode(value)
		} else if (this.isArr(value)) {
			return value.map(this.charDecode).filter(Boolean).join("")
		}
		return this.codeDecode(Number(value))
	}
	static isStrEqual = (s1,s2) => (this.isTypeStr(s1, s2) && s1 === s2)
	static isLineBreak = (value) =>value ===  "\n"
	static isSharp = (value) =>value ===  "#"
	static isSpace = (value) =>value ===  " "
	static isStar = (value) =>value ===  "*"
	static character = (str) => this.isStr(str) ? str.trim().split("").map(this.isSharp) : []
}

module.exports = Helpers


const HELPERS_PROPS = [
	"UND",
	"NULL",
	"ERR",
	"STR",
	"NUM",
	"BLN",
	"ARR",
	"OBJ",
	"SYM",
	"BIG",
	"FUNC",
	"SRC",
	"TYPEOF",
	"JSON",
	"VALUES",
	"_values",
	"_type",
	"LOG_METHODS",
	"GRADIENT_METHODS",
	"COLOR_METHODS",
	"CONSOLE_SOURCES",
	"GRADIENTS_SOURCES",
	"COLORED_SOURCES",
	"LOGGER_SOURCE_DEFAULT",
	"LOGGER_SOURCES",
	"logPretty",
	"logExamples",
	"is",
	"isTypeStr",
	"isTypeNum",
	"isTypeFunc",
	"isTypeObj",
	"isTypeBool",
	"isTypeBig",
	"isTypeSym",
	"isTypeUnd",
	"isDefined",
	"isTypeSimple",
	"isTypeObjTruthy",
	"isType",
	"isEqual",
	"isEvery",
	"isSome",
	"FILENAME_OUTPUT",
	"FILENAME_INPUT",
	"FILENAME_LOG",
	"PATH_FILES",
	"PATH_RESULTS",
	"PATH_NETWORKS",
	"PATH_TRAINING",
	"CONTENT_FILES",
	"CONTENT_RESULTS",
	"CONTENT_NETWORKS",
	"CONTENT_TRAINING",
	"PATH_OUTPUT",
	"PATH_INPUT",
	"PATH_LOG",
	"CHAR_CODE_MULT",
	"MAX_ENCODED_SIZE",
	"LINE",
	"TAB",
	"SPACE",
	"COMMA",
	"DOT",
	"DIV",
	"toMaxLength",
	"toCharCode",
	"toCharFromCode",
	"toCharCodeText",
	"CHARS_NUM",
	"CHARS_ENG",
	"CHARS_RUS",
	"CHARS_SIMPLE",
	"CHARS_SPECIAL",
	"CHARS_VALID",
	"CHAR_CODE_SOURCES",
	"CHAR_CODE_VALUES",
	"DIV_LINE",
	"DIV_TITLE",
	"MIN",
	"MAX",
	"RANGE",
	"ARRAY_SIZE",
	"LIKE_DIFF",
	"MIN_LENGTH",
	"MAX_LENGTH",
	"MIN_CHAR_CODE",
	"MAX_CHAR_CODE",
	"INPUT_SIZE",
	"HIDDEN_SIZE",
	"OUTPUT_SIZE",
	"TRAIN_SET_SIZE",
	"LEARNING_RATE",
	"OPTIONS_FS",
	"OPTIONS_BRAIN_LSTM",
	"ITERATIONS",
	"ERROR_THRESHOLD",
	"OPTIONS_BRAIN_TRAIN",
	"sourceMessage",
	"filePath",
	"fileList",
	"fileRead",
	"fileWrite",
	"fileAppend",
	"fileCreateDir",
	"gen",
	"genBool",
	"genInt",
	"genCoin",
	"genId",
	"genKey",
	"genArr",
	"genMany",
	"genSort",
	"genIndex",
	"genElement",
	"genElementsMany",
	"genObjKey",
	"genObjValue",
	"genObjEntry",
	"genChar",
	"genCharLatin",
	"genCharKyrillic",
	"genCharCode",
	"genCharCodeLatin",
	"genCharCodeKyrillic",
	"genRgb",
	"toCallback",
	"isLen",
	"toLen",
	"toProps",
	"isLenMin",
	"isLenMax",
	"isLenEqual",
	"isNum",
	"isStr",
	"isArr",
	"isRxp",
	"isNumLike",
	"isCharLatin",
	"isCharKyrrylic",
	"isCharNum",
	"isCharSpecial",
	"isCharValid",
	"isObj",
	"_or",
	"_and",
	"getIndexLast",
	"getElementLast",
	"getPart",
	"getElementNeighbours",
	"getElementNext",
	"getSplitted",
	"getChars",
	"getWords",
	"getPhrases",
	"getLines",
	"getWordFirst",
	"getWordLast",
	"genPhraseFromWords",
	"getPhrasesWithWord",
	"getPhrasesWithoutWord",
	"getPhrasesEndsWith",
	"getPhrasesStartsWith",
	"reduceText",
	"reduceSum",
	"reduceMult",
	"reduceObj",
	"toArr",
	"toObj",
	"toText",
	"toKeys",
	"toNumDiff",
	"toNumRange",
	"toNumRangeReversed",
	"toTrim",
	"toTrimLine",
	"toUnical",
	"toJoin",
	"toRepeat",
	"toReversed",
	"toBuffer",
	"toFloatFixed",
	"toTrainingData",
	"toFormatted",
	"toPercent",
	"toResultStats",
	"toResultProps",
	"toTitleCase",
	"jsonParse",
	"jsonCreate",
	"toAverage",
	"toRxp",
	"toRxpNext",
	"toMatchWordFirst",
	"toMatchWordLast",
	"toMatchLineWithWord",
	"toMatchChars",
	"toMatchWords",
	"toMatchPhrases",
	"toMatchLines",
	"toMatchDividered",
	"toMatchNextWords",
	"toArrValues",
	"toNotUnical",
	"isUnical",
	"replaceManyChars",
	"replaceChars",
	"getIndex",
	"getIndexAll",
	"getMatch",
	"getMatchAll",
	"getElementsSequence",
	"msToTimeDesc",
	"toFixed",
	"sliceToSize",
	"codeEncode",
	"codeDecode",
	"charEncode",
	"encode",
	"decode",
	"isStrEqual",
	"isLineBreak",
	"isSharp",
	"isSpace",
	"isStar",
	"character"
].map((desc, index) => {
	const value = Helpers[prop]
	return { desc, index, value, type: typeof value }
})

const HELPERS_VALUES_DESC = HELPERS_PROPS.filter((prop) => prop.type !== "function")
	.reduce((acc, v) => [...acc, Helpers.jsonCreate(v)], [])
	.join("\n")
const HELPERS_DESC = HELPERS_PROPS.reduce((acc, v) => [...acc, Helpers.jsonCreate(v)], []).join("\n")
