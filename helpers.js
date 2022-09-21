const fs = require("fs")
const path = require("path")
const util = require("util")

const { format: _format } = util
const { now } = Date
const { log, warn, info } = console
const { random: _random, min: _min, max: _max } = Math
const { keys: _keys, values: _values, entries: _entries, assign: _assign } = Object
const { fromCharCode } = String

class Helpers {
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
	static CHARS_NUM = "0123456789"
	static CHARS_ENG = "abcdefghijklmnopqrstuvwxyz"
	static CHARS_RUS = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
	static CHARS_SIMPLE = this.CHARS_ENG + this.CHARS_RUS + this.CHARS_NUM
	static CHARS_SPECIAL = this.LINE + this.TAB + this.SPACE + this.COMMA + this.DOT + this.DIV
	static CHARS_VALID = this.CHARS_SIMPLE + this.CHARS_SPECIAL
	static CHARS_AND_CODES = this.CHARS_VALID.split("").reduce((acc, char) => {
		const code = char.charCodeAt(0)
		const encoded = this.encode(code)
		return [...acc, { char, code, encoded }]
	}, [])
	static CHAR_CODES = {
		CHARS_NUM: this.CHARS_NUM.split("").reduce((acc, char) => [...acc, char.charCodeAt(0)], []),
		CHARS_ENG: this.CHARS_ENG.split("").reduce((acc, char) => [...acc, char.charCodeAt(0)], []),
		CHARS_RUS: this.CHARS_RUS.split("").reduce((acc, char) => [...acc, char.charCodeAt(0)], []),
		CHARS_SIMPLE: this.CHARS_SIMPLE.split("").reduce((acc, char) => [...acc, char.charCodeAt(0)], []),
		CHARS_SPECIAL: this.CHARS_SPECIAL.split("").reduce((acc, char) => [...acc, char.charCodeAt(0)], [])
	}

	static isCharLatin = (char) => this.CHARS_ENG.includes(char.toLowerCase())
	static isCharKyrrylic = (char) => this.CHARS_RUS.includes(char.toLowerCase())
	static isCharNum = (char) => this.CHARS_NUM.includes(char.toLowerCase())
	static isCharSpecial = (char) => this.CHARS_SPECIAL.includes(char.toLowerCase())
	static isCharValid = (char) => this.CHARS_VALID.includes(char.toLowerCase())

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

	static VALUES_NOT_TRUTHY = [null, undefined, false, 0, "", {}, []]

	static INPUT_SIZE = 1
	static HIDDEN_SIZE = 3
	static OUTPUT_SIZE = 1
	static TRAIN_SET_SIZE = 1000
	static LEARNING_RATE = 0.05

	//* Options
	static OPTIONS_FS = { encoding: "utf-8" }
	static OPTIONS_BRAIN_LSTM = { learningRate: this.LEARNING_RATE, log: true }
	static OPTIONS_BRAIN_TRAIN = {
		...this.OPTIONS_BRAIN_LSTM,
		iterations: 1000,
		errorThresh: 0.005,
		logPeriod: 10,
		momentum: 0.1,
		callback: info,
		callbackPeriod: 10
	}

	source = (message = __filename) => `\n\t${this.timestamp}\t\n${message}\n`

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
	static genInt = (max = this.MAX, min = this.MIN) => ~~(this.gen() * max - min) + min
	static genCoin = (v1 = true, v2 = false) => (this.genBool(v1) ? v1 : v2)
	static genId = () => `${parseInt(`${this.genInt()}`, 36)}`
	static genKey = () => this.genId().repeat(5).replace(/[a-z]/gim, "")
	static genArr = (l = this.ARRAY_SIZE, v = 1) => Array(~~l).fill(v)
	static genMany = (l = this.ARRAY_SIZE, fn = this.gen) => this.genArr(l).map(fn)
	static genSort = () => this.genCoin(1, -1)
	static genIndex = (v = null) => this.is(v?.length) && this.genInt(this.getIndexLast(v), 0)
	static genElement = (v = null) => this.is(v?.length) && v[this.genIndex(v)]
	static genElementsMany = (v = null, l = this.ARRAY_SIZE) => this.genMany(l, () => this.genElement(v))
	static genObjKey = (v = null) => this.genElement(_keys(v))
	static genObjValue = (v = null) => this.genElement(_values(v))
	static genObjEntry = (v = null) => this.genElement(_entries(v))
	static genCharLatin = () => this.genElement(this.CHARS_ENG)
	static genCharKyrillic = () => this.genElement(this.CHARS_RUS)
	static genCharCodeLatin = () => this.genInt(122, 97)
	static genCharCodeKyrillic = () => this.genInt(1103, 1072)
	static getRgb = (hex) => {
		const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
		hex = hex.replace(shorthandRegex, function (m, r, g, b) {
			return r + r + g + g + b + b
		})

		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
		return result
			? {
					r: Math.round(parseInt(result[1], 16) / 2.55) / 100,
					g: Math.round(parseInt(result[2], 16) / 2.55) / 100,
					b: Math.round(parseInt(result[3], 16) / 2.55) / 100
			  }
			: null
	}

	//* Validators
	static is = (v = null) => !!v
	static isExist = (v = null) => v !== null && v !== undefined
	static isType = (v1 = null, v2 = null) => typeof v1 === typeof v2
	static isLen = (v = null, l = 0) => v?.length > l
	static isKey = (v = null, p = null) => util.isObj(v) && v.hasOwnProperty(p)
	static isFunc = (fn = null) => f instanceof Function || util.isFunc(v)
	static isNum = (v = null, l = 0) => (v instanceof Number || util.isNum(v)) && v > l
	static isStr = (v = null, l = 0) => (v instanceof String || util.isStr(v)) && v.length > l
	static isArr = (v = null, l = 0) => (v instanceof Array || util.isArr(v)) && v.length > l
	static isObj = (v = null) => v instanceof Object || util.isObj(v)
	static isRxp = (v = null) => v instanceof RegExp
	static isEqual = (v1 = null, v2 = null) => this.jsonCreate(v1) === this.jsonCreate(v2)
	static isNumBetween = (v = null, range = this.RANGE) => this.isNum(v, _min(...range)) && v < _max(...range)

	//* Get Value Helpers
	static getIf = (v = null, v1 = null, v2 = null) => (v ? v1 : v2)
	static getIndexLast = (v = null) => this.getIf(v?.length > 0, v?.length - 1, 0)
	static getElementLast = (v = null) => this.is(v?.length) && v?.[this.getIndexLast(v)]
	static getPart = (v = null, i1 = this.genIndex(v), i2 = this.genIndex(v)) => v.slice(i1, i2).filter(Boolean)
	static getPartNeighbours = (v = null, i = this.genIndex(v), l = 1) => this.getPart(v, i - l, i + l)
	static getPartNext = (v = null, i = 0, l = 1) => this.getPart(a, i, i + l)
	static getSplitted = (s = null, ch = "", l = 1) => (this.isStr(s) ? s.split(ch).filter((v) => this.isLen(v, l)) : [])
	static getChars = (s = null) => this.getSplitted(s, "", 1)
	static getWords = (s = null, minL = this.MIN_LENGTH) => this.getSplitted(s, " ", minL).map(this.toTrimLine)
	static getPhrases = (s = null, minL = this.MIN_LENGTH) => this.getSplitted(s, this.DOT, minL).map(this.toTrimLine)
	static getLines = (s = null, minL = this.MIN_LENGTH) => this.getSplitted(s, this.LINE, minL).map(this.toTrimLine)
	static getWordFirst = (s = null) => this.getWords(s)?.[0]
	static getWordLast = (s = null) => this.getWords(s).reverse()?.[0]
	static genPhraseFromWords = (v = null, l = this.genInt(10, 3)) => this.reduceText(this.genElementsMany(v, l))
	static getPhrasesWithWord = (v = null, w = "") => this.isArr(v) && v.filter((p) => p.includes(w))
	static getPhrasesEndsWith = (v = null, w = "") => this.isArr(v) && v.filter((p) => p.endsWith(w))
	static getPhrasesStartsWith = (v = null, w = "") => this.isArr(v) && v.filter((p) => p.startsWith(w))
	static getPhrasesWithoutWord = (v = null, w = "") => this.isArr(v) && v.filter((p) => !p.includes(w))

	//* Array Reducers
	static reduceText = (a, v) => `${a} ${el}`
	static reduceSum = (a, v) => a + v
	static reduceMult = (a, v) => a + v * 2
	static reduceObj = (acc, value, index) => [...acc, { value, index }]

	//* Converters
	static toArray = (v = null) => (this.isArr(v) ? v : [v])
	static toObj = (v = null) => (this.isObj(v) ? v : { value: v })
	static toText = (v = null) => (this.isObj(v) ? this.jsonCreate(v) : this.isArr(v) ? v.join("\n") : `${v}`)
	static toKeys = (v = null) => (this.isObj(v) ? _keys(v) : _names(v)) || []
	static toNumDiff = (...v) => _max(...v) - _min(...v)
	static toNumRange = (...v) => [_min(...v), _max(...v)]
	static toNumLike = (v = 0, coff = this.LIKE_DIFF) => [v - coff, v + coff]
	static toTrim = (v = null) => (this.isStr(v) ? v : `${v}`).trim()
	static toTrimLine = (v = "") => v.replace("\n", " ")
	// .replace(/[^а-яa-z,.]/gim, "")

	static toUnical = (v = null) => [...new Set(v)]
	static toJoin = (v) => (this.isArr(v) ? v.join(this.LINE) : this.toText(v))
	static toRepeat = (v = null, r = 2) => this.toText(v).repeat(r)
	static toReversed = (v = null) => (this.isArr(v) ? v.reverse() : this.toTrim(v).split().reverse().join())
	static toBuffer = (v = null) => Buffer.from(this.toTrim())
	static toFloatFixed = (v = null, l = 2) => Number((typeof v === "number" ? v : 0).toFixed(l))
	static toTrainingData = (input = null, output = null, ...other) => ({ input, output, other })
	static toFormatted = (s = null, r = "") => this.toTrim(s).replace(/[^а-я\s\n]+/gim, r)
	static toPercent = (v1 = 100, v2 = 1) => ~~(v2 / (~~v1 / 100))
	static toResultStats = (v = null) => `Expected: ${v?.output}, Received: ${v?.result}, Values: ${v?.input}`.trim()
	static toResultProps = (v = null) => this.isObj(v) && { ...v, desc: this.toResultStats(v) }
	static toTitleCase = (s = null) => {
		const first = s.slice(0, 1).toUpperCase()
		const other = s.slice(1).toLowerCase()
		return first + other
	}

	static jsonParse = (value = null) => JSON.parse(value)
	static jsonCreate = (value = null) => JSON.stringify(this.toObj(value), null, 2)

	static toAverage = (values) => {
		if (!values || !values.length) return 0
		const nums = values.filter(Number)
		const length = nums.length
		return nums.reduce((acc, v) => acc + v, 0) / length
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
			.filter((s) => this.isLen(s, 1))
			.map((s) => s.replace(/\s|\n|\t/, "").trim())
	}

	static toMatchPhrases = (str = "") => {
		if (!this.isStr(str)) return []

		return str
			.split(".")
			.filter((s) => this.isLen(s, 1))
			.map((s) => s.replace("\n", "").trim())
	}

	static toMatchLines = (str = "") => {
		if (!this.isStr(str)) return []

		return str
			.split("\n")
			.filter((s) => this.isLen(s, 1))
			.map((s) => s.replace("\n", "").trim())
	}

	static toMatchDividered = (str = "", div = this.DIV) => {
		if (!this.isStr(str)) return []

		return str.split(div).filter((s) => this.isLen(s, 1))
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
		if (!this.isLen(src) || !el) return -1
		return src.indexOf(el)
	}
	static getIndexAll = (arr = null, el = null) => {
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
		let elements = null
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

	static isChar = (value, char) => (value === char ? 1 : 0)
	static isLineBreak = (value) => this.isChar(value, "\n")
	static isSharp = (value) => this.isChar(value, "#")
	static isSpace = (value) => this.isChar(value, " ")
	static isStar = (value) => this.isChar(value, "*")
	static character = (str) => {
		if (this.isStr(str)) {
			const result = str.trim().split("").map(this.isSharp)
			return result
		}

		return []
	}
}

module.exports = Helpers
