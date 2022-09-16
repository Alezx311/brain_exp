const fs = require("fs")
const path = require("path")

const { now } = Date
const { log, warn, info } = console
const { random: _random, min: _min, max: _max } = Math
const { keys: _keys, values: _values, entries: _entries, assign: _assign } = Object

class Constants {
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
	static LINE = "\n"
	static TAB = "\t"
	static SPACE = " "
	static COMMA = ","
	static DOT = "."
	static CHAR_DIV = "#"
	static CHARS_NUM = "0123456789"
	static CHARS_ENG = "abcdefghijklmnopqrstuvwxyz"
	static CHARS_RUS = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
	static CHARS_SPECIAL = [this.LINE, this.TAB, this.SPACE, this.COMMA, this.DOT].join("")
	static CHARS_LETTERS = this.CHARS_ENG + this.CHARS_RUS
	static CHARS_VALID = this.CHARS_LETTERS + this.CHARS_NUM + this.CHARS_SPECIAL

	//* Dividers
	static DIV_LINE = `\n${this.CHAR_DIV.repeat(20)}\n`
	static DIV_TITLE = `\t${this.CHAR_DIV.repeat(5)}\t`

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
}

module.exports = class Helpers extends Constants {
	source = (message = __filename) => `\n\t${Helpers.timestamp}\t\n${message}\n`

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

	//* Validators
	static isExist = (v = null) => v !== null && v !== undefined
	static is = (v = null) => !!v
	static isType = (v1 = null, v2 = null) => typeof v1 === typeof v2
	static isLen = (v = null, l = 0) => this.is(v?.length) && v?.length >= l
	static isKey = (v = null, p = null) => this.is(v?.[p])
	static isFunc = (fn = null) => typeof fn === "function"
	static isNum = (v = null, l = 0) => this.is(v) && typeof v === "number" && v >= l
	static isStr = (v = null, l = 0) => this.is(v) && typeof v === "string" && this.isLen(v, l)
	static isArr = (v = null, l = 0) => this.is(v) && typeof v === "object" && Array.isArray(v) && this.isLen(v, l)
	static isObj = (v = null, l = 0) => this.is(v) && typeof v === "object" && !Array.isArray(v)
	static isEqual = (v1 = null, v2 = null) => this.toJson(v1) === this.toJson(v2)
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
	static toObj = (v = null) => (this.isObj(v) ? v : _assign({}, { value: v }))
	static toText = (v = null) => (this.isObj(v) ? this.toJson(v) : this.isArr(v) ? v.join(this.LINE) : `${v}`)
	static toKeys = (v = null) => (this.isObj(v) ? _keys(v) : Object.getOwnPropertyNames(v)) || []
	static toNumDiff = (...v) => _max(...v) - _min(...v)
	static toNumRange = (...v) => [_min(...v), _max(...v)]
	static toNumLike = (v = 0, coff = this.LIKE_DIFF) => [v - coff, v + coff]
	static toTrim = (v = null) => (typeof v === "string" ? v : `${v}`).trim()
	static toTrimLine = (v = "") => v.replace("\n", " ")
	// .replace(/[^а-яa-z,.]/gim, "")

	static toJoin = (v) => v.join(this.LINE)
	static toUnical = (v = null) => this.isArr(v) && [...new Set([...v])]
	static toRepeat = (v = null, r = 2) => this.toTrim(v).repeat(r)
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
	static toJson = (v = null) => JSON.stringify(this.toObj(v), null, 2)
	static toAverage = (...v) => {
		const nums = this.isArr(v, 1) ? v.filter(Number) : [0, 0]
		return nums.reduce(this.reduceSum) / nums.length
	}

	//* Regular Expressions
	static toRxp = (...v) => new RegExp(...v)
	static toRxpNext = (w = "", t = 1) => this.toRxp(w + `[^а-яa-z]{0,}[а-яa-z]{0,}`.repeat(t), "i")
	static toMatchLineWithWord = (s = "", w = "") => this.toTrim(s).match(this.toRxp(`^.{0,}${w}[^$]+$`))
	static toMatchWordLast = (s = "") => this.toTrim(s).match(/(\B[а-яa-z]+\B)$/i)
	static toMatchWordSequence = (s = "", w = "", l = 1) => this.toTrim(s).match(this.toRxpNext(w, l))
	static toMatchChars = (s = "") => this.toTrim(s).match(/\B([а-яa-z])\B/gim)
	static toMatchWords = (s = "") => this.toTrim(s).match(/\B([а-яa-z]+)\B/gim)
	static toMatchPhrases = (s = "") => this.toTrim(s).match(/.+\.|.+$/gim)
	static toMatchLines = (s = "") => this.toTrim(s).match(/.+\n|^.+$/gim)
	static toMatchNextWord = (s = "", w = "") => s.match(new RegExp(w + "\\s(\\w+)"))?.[1]
	static toArrValues = (arr) => arr.map((value, index) => ({ value, index, text: this.toText(value) }))
	static toNotUnical = (arr) => {
		const unical = this.toUnical(arr)
		return arr.filter((v) => unical.includes(v))
	}

	static isUnical = (el, arr) => {
		const notUnical = this.toNotUnical(arr)
		return notUnical.includes(el)
	}

	static replaceChars = (str, chars = /[^а-яa-z\s,.]/gim, rep = "") => str.replace(chars, rep)

	static getIndexAll = (arr = null, el = null) => arr.reduce((a, v, i) => (v === el ? [...a, i] : a))
	static getIndex = (v = null, el = null) => this.is(v?.length) && v.indexOf(el)
	static getMatch = (v = null, el = null) => this.is(v?.length) && v.match(new RegExp(el, "im"))
	static getMatchAll = (v = null, el = null) => this.is(v?.length) && v.match(new RegExp(el, "gim"))
	static getFind = (v = null, el = null) => this.is(v?.length) && v.find(el)
	static getFindAll = (v = null, el = null) => this.is(v?.length) && v.filter(el)
	static getElementsSequence = (arr, word, size = this.dice6) => {
		const index = this.getIndex(arr, word)
		const values = arr.slice(index, index + size)
		const text = this.toTitleCase(values.join(" "))
			.replace(/[^а-яa-z,.\s]/gim, " ")
			.replace(/\s+/, " ")
			.trim()

		return { word, index, values, text }
	}
}
