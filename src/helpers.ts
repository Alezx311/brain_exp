import * as fs from "fs"
import * as path from "path"
import { N, S, A, O, U, R } from "./types"

//* Shorthands
export const { promises: fsPromises } = fs
export const { now: _now } = Date
export const { log: _log, warn: _warn, info: _info, error: _error } = console
export const { random: _random, min: _min, max: _max, floor: _floor, ceil: _ceil, round: _round, abs: _abs } = Math
export const {
	keys: _keys,
	values: _values,
	entries: _entries,
	assign: _assign,
	fromEntries: _from,
	getOwnPropertyNames: _names,
	getOwnPropertyDescriptors: _descriptors
} = Object

//* Constants
export const MAGIC = _random() * _now()
export const MIN = 1
export const MAX = 100
export const ARRAY_SIZE = 10
export const LIKE_DIFF = 0.1
export const MIN_LENGTH = 3
export const MAX_LENGTH = 16
export const RANGE = [MIN, MAX]
export const VALUES_NOT_TRUTHY = [null, undefined, false, 0, "", {}, []]
export const INPUT_SIZE = 1
export const HIDDEN_SIZE = 3
export const OUTPUT_SIZE = 1
export const TRAIN_SET_SIZE = 1000
export const LEARNING_RATE = 0.05
export const OPTIONS_FS = { encoding: "utf-8" }
export const OPTIONS_BRAIN_LSTM = { learningRate: LEARNING_RATE, log: true }
export const OPTIONS_BRAIN_TRAIN = {
	...OPTIONS_BRAIN_LSTM,
	iterations: 1000,
	errorThresh: 0.005,
	logPeriod: 10,
	momentum: 0.1,
	callback: console.info,
	callbackPeriod: 10
}

//* Files
export const FILENAME_OUTPUT = "output.txt"
export const FILENAME_INPUT = "input.txt"
export const FILENAME_LOG = "log.log"
export const PATH_FILES = path.join(__dirname, "./files/")
export const PATH_RESULTS = path.join(__dirname, "./results/")
export const PATH_NETWORKS = path.join(__dirname, "./networks/")
export const PATH_TRAINING = path.join(__dirname, "./training/")
export const CONTENT_FILES = fs.readdirSync(PATH_FILES)
export const CONTENT_RESULTS = fs.readdirSync(PATH_RESULTS)
export const CONTENT_NETWORKS = fs.readdirSync(PATH_NETWORKS)
export const CONTENT_TRAINING = fs.readdirSync(PATH_TRAINING)
export const PATH_OUTPUT = path.join(PATH_FILES, FILENAME_OUTPUT)
export const PATH_INPUT = path.join(PATH_FILES, FILENAME_INPUT)
export const PATH_LOG = path.join(PATH_FILES, FILENAME_LOG)
export const PATH_CURRENT = path.join(__dirname, "./")
export const PATH_CWD = path.join(process.cwd(), "./")

//* Chars
export const LINE = "\n"
export const TAB = "\t"
export const SPACE = " "
export const COMMA = ","
export const DOT = "."
export const CHAR_DIV = "#"
export const CHARS_NUM = "0123456789"
export const CHARS_ENG = "abcdefghijklmnopqrstuvwxyz"
export const CHARS_RUS = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
export const CHARS_SPECIAL = [LINE, TAB, SPACE, COMMA, DOT].join("")
export const CHARS_LETTERS = CHARS_ENG + CHARS_RUS
export const CHARS_VALID = CHARS_LETTERS + CHARS_NUM + CHARS_SPECIAL
export const DIV_LINE = `\n${CHAR_DIV.repeat(20)}\n`
export const DIV_TITLE = `\t${CHAR_DIV.repeat(5)}\t`

//* Loggers
export const log = (...v: any) => _log(v)
export const info = (...v: any) => _info(v)
export const warn = (...v: any) => _warn(v)
export const error = (...v: any) => _error(v)

//* Objects
export const objKeys = (src: O) => _keys(src)
export const objValues = (src: O) => _values(src)
export const objEntries = (src: O) => _entries(src)
export const objAssign = (...src: A<O>) => _assign({}, ...src)
export const objNames = (src: O) => _names(src)
export const objDescriptors = (src: O) => _descriptors(src)
export const objFrom = <T extends A<[S, any]>>(src: T) => _from(src)

//* File Helpers
export const filePath = (...s: A<S>) => path.join(__dirname, ...s)
export const fileList = (s: S = "./") => fs.readdirSync(filePath(s))
export const fileRead = (s: S = PATH_LOG) => fs.readFileSync(filePath(s), "utf-8").toString()
export const fileWrite = (file: S = PATH_LOG, data: S = "") => fs.writeFileSync(filePath(file), data)
export const fileAppend = (file: S = PATH_LOG, data: S = "") => fs.appendFileSync(filePath(file), data)

//* Generate random values
export const gen = () => _random()
export const genBool = () => gen() > 0.5
export const genInt = (max: N = MAX, min: N = MIN) => ~~(gen() * max - min) + min
export const genCoin = (v1: any = true, v2: any = false) => (genBool() ? v1 : v2)
export const genId = () => `${parseInt(`${genInt()}`, 36)}`
export const genDice = (v: N = 11) => ~~(_random() * v) + 1
export const genDice6 = () => ~~(_random() * 5) + 1
export const genDice21 = () => ~~(_random() * 20) + 1
export const genDice100 = () => ~~(_random() * 100) + 1
export const genKey = () => genId().repeat(5).replace(/[a-z]/gim, "")
export const genArr = (l: N = ARRAY_SIZE, v: N = 1) => Array(~~l).fill(v)
export const genMany = (l: N = ARRAY_SIZE, fn: any = gen) => genArr(l).map(() => (fn instanceof Function ? fn() : fn))
export const genSort = () => genCoin(1, -1)
export const genIndex = (v: A | S) => (~~v?.length > 0 ? genInt(getIndexLast(v), 0) : v?.length)
export const genElement = (v: A | S) => v?.[genIndex(v)] ?? false
export const genElementsMany = (v: A | S, l = ARRAY_SIZE) => genMany(l, () => genElement(v))
export const genObjName = (v: O) => genElement([...objNames(v)])
export const genObjKey = (v: O) => genElement([...objKeys(v)])
export const genObjValue = (v: O) => genElement([...objValues(v)])
export const genObjEntry = (v: O) => genElement([...objEntries(v)])

//* Validators
export const is = (v: any) => !!v
export const isExist = (v: any) => v !== null && v !== undefined
export const isType = (v1: any, v2: any) => typeof v1 === typeof v2
export const isLen = (v: any, l: N = 0): v is S | A => ~~v?.length > l
export const isKey = (v: any, p: S) => _names(v).includes(p)
export const isFunc = (fn: any): fn is (...v: any) => any => typeof fn === "function"
export const isNum = (v: any, l = 0): v is N => typeof v === "number" && v >= l
export const isStr = (v: any, l = 0): v is S => typeof v === "string" && v.length > l
export const isArr = (v: any, l = 0): v is A => typeof v === "object" && Array.isArray(v) && v.length > l
export const isObj = (v: any): v is O => typeof v === "object" && !Array.isArray(v)
export const isEqual = (v1: any, v2: any) => JSON.stringify(v1) === JSON.stringify(v2)
export const isNumBetween = (v: N, range: A<N> = RANGE) => {
	if (!isNum(v)) {
		return false
	}
	const minValue = _min(...range)
	const maxValue = _max(...range)
	return v > minValue && v < maxValue
}

//* Properties
export const getIf = (v?: any, v1?: any, v2?: any) => (!!v ? v1 : v2)
export const getLength = (v: any) => !!v?.length && ~~v?.length
export const getName = (v: any) => `${v?.name ?? v?.prototype?.name}`
export const getTimestamp = () => new Date().toLocaleString()
export const getSource = (desc = __filename) => `\t${desc} at ${getTimestamp()}\t`
export const getIndexLast = (v: S | A) => (v?.length > 0 ? v?.length - 1 : v?.length)
export const getElementLast = (v: S | A) => is(v?.length) && v?.[getIndexLast(v)]
export const getPart = (v: S | A, i1?: N, i2?: N) => v.slice(i1 || genIndex(v), i2 || genIndex(v))
export const getPartNeighbours = (v: S | A, i = genIndex(v), l = 1) => getPart(v, i - l, i + l)
export const getPartNext = (v: S | A, i = 0, l = 1) => getPart(v, i, i + l)
export const getSplitted = (s: S, ch: S, l = 1) => s.split(ch).filter((v) => isLen(v, l))
export const getChars = (s: S) => getSplitted(s, "", 1)
export const getWords = (s: S, l = MIN_LENGTH) => getSplitted(s, " ", l).map(toTrimLine)
export const getPhrases = (s: S, l = MIN_LENGTH) => getSplitted(s, DOT, l).map(toTrimLine)
export const getLines = (s: S, l = MIN_LENGTH) => getSplitted(s, LINE, l).map(toTrimLine)
export const getWordFirst = (s: S) => getWords(s)?.[0]
export const getWordLast = (s: S) => getWords(s).reverse()?.[0]
export const genPhraseFromWords = (arr: A<S>, l: N = genInt(10, 3)) => genElementsMany(arr, l).reduce(reduceText)
export const getPhrasesWithoutWord = (arr: A<S>, w: S) => arr.filter((s) => !s.includes(w))
export const getPhrasesWithWord = (arr: A<S>, w: S) => arr.filter((s) => s.includes(w))
export const getPhrasesEndsWith = (arr: A<S>, w: S) => arr.filter((s) => s.endsWith(w))
export const getPhrasesStartsWith = (arr: A<S>, w: S) => arr.filter((s) => s.startsWith(w))

//* Reducers
export const reduceText = (a: S, v: S) => `${a} ${v}`
export const reduceSum = (a: N, v: N) => a + v
export const reduceMult = (a: N, v: N) => a + v * 2
export const reduceObj = (a: A, value: any, index: N) => [...a, { value, index }]

//* Converters
export const toArray = (v?: any) => (isArr(v) ? v : [v])
export const toObj = (v?: any) => (isObj(v) ? v : objAssign({ value: v }))
export const toText = (v?: any) => (isObj(v) ? toJson(v) : isArr(v) ? v.join(LINE) : `${v}`)
export const toKeys = (v?: any) => (isObj(v) ? _keys(v) : Object.getOwnPropertyNames(v)) || []
export const toPercent = (v1: N = 100, v2: N = 1) => ~~(v2 / (~~v1 / 100))
export const toNumDiff = (...v: A<N>) => _max(...v) - _min(...v)
export const toNumRange = (...v: A<N>) => [_min(...v), _max(...v)]
export const toNumLike = (v: N = 0, coff: N = LIKE_DIFF) => [v - coff, v + coff]
export const toTrim = (v: S) => (typeof v === "string" ? v : `${v}`).trim()
export const toTrimLine = (v: S) => v.replace("\n", " ")
export const toJoin = (v: A) => v.join(LINE)
export const toUnical = (v: A) => [...new Set([...v])]
export const toRepeat = (v: S, r = 2) => toTrim(v).repeat(r)
export const toReversed = (v: A | S) => (isArr(v) ? v.reverse() : toText(v).split("").reverse().join(""))
export const toBuffer = (v: any) => Buffer.from(v)
export const toFloatFixed = (v: N, l = 2) => Number((typeof v === "number" ? v : 0).toFixed(l))
export const toTrainingData = <T>(input: T, output: T, ...other: any) => ({ input, output, other })
export const toFormatted = (s: S, r: S = "") => toTrim(s).replace(/[^а-я\s\n]+/gim, r)
export const toResultStats = (v?: any) => `Expected: ${v?.output}, Received: ${v?.result}, Values: ${v?.input}`.trim()
export const toResultProps = (v: O) => isObj(v) && { ...v, desc: toResultStats(v) }
export const toJson = (v: any) => JSON.stringify(toObj(v), null, 2)
export const toAverage = (...v: A<N>) => {
	const nums = isArr(v, 1) ? v.filter(Number) : [0, 0]
	return nums.reduce(reduceSum) / nums.length
}
export const toTitleCase = (s: S) => {
	const first = s.slice(0, 1).toUpperCase()
	const other = s.slice(1).toLowerCase()
	return first + other
}

//* Summary objects
export const toRxp = (s: S = "", f?: S) => new RegExp(s, f)
export const toRxpNext = (w: S = "", t: N = 1) => toRxp(w + `[^а-яa-z]{0,}[а-яa-z]{0,}`.repeat(t), "i")
export const toMatchLineWithWord = (s: S = "", w: S = "") => toTrim(s).match(toRxp(`^.{0,}${w}[^$]+$`))
export const toMatchWordLast = (s: S = "") => toTrim(s).match(/(\B[а-яa-z]+\B)$/i)
export const toMatchWordSequence = (s: S = "", w: S = "", l: N = 1) => toTrim(s).match(toRxpNext(w, l))
export const toMatchChars = (s: S = "") => toTrim(s).match(/\B([а-яa-z])\B/gim)
export const toMatchWords = (s: S = "") => toTrim(s).match(/\B([а-яa-z]+)\B/gim)
export const toMatchPhrases = (s: S = "") => toTrim(s).match(/.+\.|.+$/gim)
export const toMatchLines = (s: S = "") => toTrim(s).match(/.+\n|^.+$/gim)
export const toMatchNextWord = (s: S = "", w: S = "") => s.match(new RegExp(w + "\\s(\\w+)"))?.[1]
export const toArrValues = (arr: A) => arr.map((value, index) => ({ value, index, text: toText(value) }))
export const replaceChars = (str: S, chars: S | R = /[^а-яa-z\s,.]/gim, rep = "") => str.replace(chars, rep)
export const getIndexAll = (arr: A, el: any) => arr.reduce((a, v, i) => (v === el ? [...a, i] : a))
export const getIndex = (v: A, el: any) => is(v?.length) && v.indexOf(el)
export const getMatch = (v: S, el: any) => is(v?.length) && v.match(new RegExp(el, "im"))
export const getMatchAll = (v: S, el: any) => is(v?.length) && v.match(new RegExp(el, "gim"))
export const getFind = (v: A, el: any) => is(v?.length) && v.find(el)
export const getFindAll = (v: A, el: any) => is(v?.length) && v.filter(el)
export const getElementsSequence = (arr: A, word: S, size: N = genDice6()) => {
	const index = ~~getIndex(arr, word)
	const values = arr.slice(index, index + size)
	const text = toTitleCase(values.join(" "))
		.replace(/[^а-яa-z,.\s]/gim, " ")
		.replace(/\s+/, " ")
		.trim()
	return { word, index, values, text }
}
export const toNotUnical = (arr: A) => {
	const unical = toUnical(arr)
	return unical && arr.filter((v) => unical.includes(v))
}

//* Summary Objects
export const _OPTIONS = {
	MAGIC,
	MIN,
	MAX,
	ARRAY_SIZE,
	LIKE_DIFF,
	MIN_LENGTH,
	MAX_LENGTH,
	RANGE,
	VALUES_NOT_TRUTHY,
	INPUT_SIZE,
	HIDDEN_SIZE,
	OUTPUT_SIZE,
	TRAIN_SET_SIZE,
	LEARNING_RATE,
	OPTIONS_FS,
	OPTIONS_BRAIN_LSTM,
	OPTIONS_BRAIN_TRAIN
}
export const _FOLDERS = {
	PATH_FILES,
	PATH_RESULTS,
	PATH_NETWORKS,
	PATH_TRAINING,
	CONTENT_FILES,
	CONTENT_RESULTS,
	CONTENT_NETWORKS,
	CONTENT_TRAINING
}
export const _FILES = {
	PATH_OUTPUT,
	PATH_INPUT,
	PATH_LOG,
	PATH_CURRENT,
	PATH_CWD
}
export const _CHARS = {
	LINE,
	TAB,
	SPACE,
	COMMA,
	DOT,
	CHAR_DIV,
	CHARS_NUM,
	CHARS_ENG,
	CHARS_RUS,
	CHARS_SPECIAL,
	CHARS_LETTERS,
	CHARS_VALID,
	DIV_LINE,
	DIV_TITLE
}
export const _OBJECTS = {
	objKeys,
	objValues,
	objEntries,
	objAssign,
	objNames,
	objDescriptors,
	objFrom
}
export const _FILE = {
	filePath,
	fileList,
	fileRead,
	fileWrite,
	fileAppend
}
export const _GENERATE = {
	gen,
	genBool,
	genInt,
	genCoin,
	genId,
	genDice,
	genDice6,
	genDice21,
	genDice100,
	genKey,
	genArr,
	genMany,
	genSort,
	genIndex,
	genElement,
	genElementsMany,
	genObjName,
	genObjKey,
	genObjValue,
	genObjEntry
}
export const _VALIDATORS = {
	is,
	isExist,
	isType,
	isLen,
	isKey,
	isFunc,
	isNum,
	isStr,
	isArr,
	isObj,
	isEqual,
	isNumBetween
}
export const _GET = {
	getIf,
	getLength,
	getName,
	getTimestamp,
	getSource,
	getIndexLast,
	getElementLast,
	getPart,
	getPartNeighbours,
	getPartNext,
	getSplitted,
	getChars,
	getWords,
	getPhrases,
	getLines,
	getWordFirst,
	getWordLast,
	genPhraseFromWords,
	getPhrasesWithoutWord,
	getPhrasesWithWord,
	getPhrasesEndsWith,
	getPhrasesStartsWith
}
export const _CONVERTERS = {
	toArray,
	toObj,
	toText,
	toKeys,
	toPercent,
	toNumDiff,
	toNumRange,
	toNumLike,
	toTrim,
	toTrimLine,
	toJoin,
	toUnical,
	toRepeat,
	toReversed,
	toBuffer,
	toFloatFixed,
	toTrainingData,
	toFormatted,
	toResultStats,
	toResultProps,
	toJson,
	toAverage,
	toTitleCase
}
export const _REGULAR = {
	toRxp,
	toRxpNext,
	toMatchLineWithWord,
	toMatchWordLast,
	toMatchWordSequence,
	toMatchChars,
	toMatchWords,
	toMatchPhrases,
	toMatchLines,
	toMatchNextWord,
	toArrValues,
	replaceChars,
	getIndexAll,
	getIndex,
	getMatch,
	getMatchAll,
	getFind,
	getFindAll,
	getElementsSequence,
	toNotUnical
}
export const _SUMMARY = {
	..._OPTIONS,
	..._FOLDERS,
	..._FILES,
	..._CHARS,
	..._OBJECTS,
	..._FILE,
	..._GENERATE,
	..._CONVERTERS,
	..._VALIDATORS,
	..._GET,
	..._REGULAR
}
