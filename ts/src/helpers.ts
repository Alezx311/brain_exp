import { A, B, F, N, O, R, S } from "./types"

import { say, think } from "cowsay"
import fs from "fs"
import gradient from "gradient-string"
import _stringify from "json-stringify-safe"
import { join as _join } from "path"
import _str from "string"
import textTable from "text-table"
import util from "util"
import {
	ARRAY_SIZE,
	CHAR_CODE_MULT,
	DECORATE_SOURCES,
	LOG_DIR,
	LOG_FILE,
	MAX,
	MAX_ENCODED_SIZE,
	MIN,
	TYPEOF
} from "./constants"

const _arr = require("arr")
const { rainbow } = require("lolcats")

//? Shorthands
const { now: _now } = Date
const { format: _format, isDeepStrictEqual: _isDeepEqual } = util
const { log: _log, info: _info, warn: _warn, error: _error, debug: _debug, timeLog: _timeLog } = console
const { random: rand, min: _min, max: _max, abs: _abs, round: _round } = Math
const { isArray } = Array
const { fromCharCode: _fromCharCode } = String
const {
	MAX_SAFE_INTEGER: _MAX_SAFE,
	MIN_SAFE_INTEGER: _MIN_SAFE,
	MAX_VALUE: _MAX_VALUE,
	MIN_VALUE: _MIN_VALUE
} = Number
const {
	keys: _keys,
	values: _values,
	entries: _entries,
	assign: _assign,
	getOwnPropertyNames: _names,
	fromEntries: _from
} = Object

//? Converters
export const toArr = (v: any) => (isArr(v) ? v : [v])
export const toObj = (v: any) => (isObj(v) ? v : { value: v })
export const toNum = (v: any) => (isNum(v) ? v : ~~v)
export const toStr = (...v: A) => v.map(toJson)
export const toJson = (...v: A) => _stringify(v, null, 2)
export const toFunc = (v: any) => (typeof v === "function" ? v : () => v)
export const toType = (v: any) => (TYPEOF.includes(v) ? v : typeof v)

//? Simple message parts
export const getLogExamples = () => DECORATE_SOURCES.map(({ desc, func }) => func(`Example of ${desc} log message.`))
export const getTimestamp = () => new Date().toLocaleString()
export const getSource = (msg = "") => `\n\t${__filename}\n\t${getTimestamp()}\n\t${msg}\n`

//? Loggers
export const showLog = (...values: A) => _log(toJson({ values, level: "Log" }))
export const showInfo = (...values: A) => _info(toJson({ values, level: "Info" }))
export const showWarn = (...values: A) => _warn(toJson({ values, level: "Warn" }))
export const showError = (...values: A) => _error(toJson({ values, level: "Error" }))
export const showDebug = (...values: A) => _debug(toJson({ values, level: "Debug" }))
export const showTime = (...values: A) => _timeLog(toJson({ values, level: "Time" }))

//? Validators
export const is = (v: any) => !!v
export const isLen = (v: any): v is S | A => typeof v?.length === "number"
export const isLenMin = (v: any, l: N = MIN) => isLen(v) && v.length >= l
export const isLenMax = (v: any, l: N = MAX) => isLen(v) && v.length <= l
export const isLenRange = (v: any, min: N = MIN, max: N = MAX) => isLenMin(v, min) && isLenMax(v, max)
export const isExist = (v: any) => v !== null && v !== undefined
export const isUnd = (v: any) => typeof v === "undefined"
export const isNum = (v: any): v is N => typeof v === "number"
export const isStr = (v: any): v is S => typeof v === "string"
export const isFunc = (v: any): v is F => typeof v === "function"
export const isBool = (v: any): v is B => typeof v === "boolean"
export const isBig = (v: any): v is B => typeof v === "bigint"
export const isSym = (v: any): v is S => typeof v === "symbol"
export const isArr = (v: any): v is A => typeof v === "object" && !!v && isArray(v)
export const isObj = (v: any): v is O => typeof v === "object" && !!v && !isArray(v)
export const isRxp = (v: any): v is R => v instanceof RegExp
export const isEqualType = (v1: any, v2: any): v1 is typeof v2 => typeof v1 === typeof v2
export const isEqualStrict = (v1: any, v2: any) => _isDeepEqual(v1, v2)
export const isEvery = (a1: A, a2: A) => isArr(a1) && isArr(a2) && a1.every((el: any) => a2.includes(el))
export const isSome = (a1: A, a2: A) => isArr(a1) && isArr(a2) && a1.some((el: any) => a2.includes(el))

//? String helpers
export const strHumanize = (v: any) => isStr(v) && _str(v).humanize().s
export const strCollapseWhitespace = (v: any) => isStr(v) && _str(v).collapseWhitespace().s
export const strTitleCase = (v: any) => isStr(v) && _str(v).titleCase().s
export const strTrim = (v: any) => isStr(v) && _str(v).trim().s
export const strSay = (v: any) => isStr(v) && say({ text: v })
export const strThink = (v: any) => isStr(v) && think({ text: v })
export const strSayRandom = (v: any) => isStr(v) && say({ text: v, r: true })
export const strThinkRandom = (v: any) => isStr(v) && think({ text: v, r: true })
export const strRainbow = (v: any) => isStr(v) && rainbow(v)
export const strAtlas = (v: any) => isStr(v) && gradient.atlas(v)
export const strInstagram = (v: any) => isStr(v) && gradient.instagram(v)
export const strVice = (v: any) => isStr(v) && gradient.vice(v)
export const strTable = (...v: any) => textTable(v.map(_str), { align: ["l", "c"] })
export const strToMaxLen = (v: A | S, max = MAX) => isStr(v) && (v.length > max ? v.slice(0, max) : v)
export const strToMinLen = (v: A | S, min = MIN) => isStr(v) && (v.length < min ? v.padEnd(min, " ") : v)
export const strToMatchLen = (v: A | S, l: N) => {
	if (!isStr(v)) return false
	const min = strToMaxLen(v, l)
	return min && strToMinLen(min, l)
}
export const strToTitleCase = (s: S) => {
	if (!isStr(s)) return false
	const str = s.trim().toLowerCase()
	return str.slice(0, 1).toUpperCase() + str.slice(1)
}
export const strSplit = (str: S, ch: S, min?: N) => {
	if (!isStr(str)) return [""]
	const arr = str.split(ch)
	return isNum(min) ? arr.filter(String).filter((el: S) => isLenMin(el, min)) : arr
}
export const strChars = (s: S) => strSplit(s, "")
export const strWords = (s: S, min: N = 3) => strSplit(s, " ", min).map((el: S) => el.trim())
export const strPhrases = (s: S, min: N = 3) => strSplit(s, ".", min).map((el: S) => el.replace(".", "").trim())
export const strLines = (s: S, min: N = 3) => strSplit(s, "\n", min).map((el: S) => el.replace("\n", "").trim())
export const strCharsUnical = (str: S) => arrUnical(strChars(str))
export const strWordsUnical = (str: S, min: N = 3) => arrUnical(strWords(str, min))
export const strPhrasesUnical = (str: S, min: N = 3) => arrUnical(strPhrases(str, min))
export const strLinesUnical = (str: S, min: N = 3) => arrUnical(strLines(str, min))
export const strWordFirst = (str: S) => strWords(str)?.[0]
export const strWordLast = (str: S) => strWords(str).reverse()?.[0]
export const strCharCode = (ch: S) => isStr(ch) && ch.charCodeAt(0) / CHAR_CODE_MULT
export const strCharFromCode = (code: N) => isNum(code) && _fromCharCode(code * CHAR_CODE_MULT)
export const strCharCodeMany = (text: S, size: N = MAX_ENCODED_SIZE) => {
	if (!isStr(text)) return false
	const values = text.split("").reduce((acc: A, v: S) => [...acc, strCharCode(v)], [])
	return size ? strToMaxLen(values, size) : values
}

//? Array helpers
export const arrUnical = (v: A) => (isArr(v) ? [...new Set([...v])] : [v])
export const arrLastIndex = (v: A) => isArr(v) && _arr.lastIndex(v)
export const arrFindLast = (v: A) => isArr(v) && _arr.findLast(v)
export const arrNumbers = (v: A) => isArr(v) && _arr.numbers(v)
export const arrStrings = (v: A) => isArr(v) && _arr.strings(v)
export const arrObjects = (v: A) => isArr(v) && _arr.objects(v)
export const arrFunctions = (v: A) => isArr(v) && _arr.functions(v)
export const arrArrays = (v: A) => isArr(v) && _arr.arrays(v)
export const arrFirst = (v: A) => isArr(v) && _arr.first(v)
export const arrLast = (v: A) => isArr(v) && _arr.last(v)
export const arrFindFirst = (v: A) => isArr(v) && _arr.findFirst(v)
export const arrHasType = (v: A) => isArr(v) && _arr.hasType(v)
export const arrReduceText = (arr: A) => arr.reduce((acc: A, v: any) => [...acc, toJson(v)], []).join("\n")
export const arrReduceSum = (arr: A) => arr.reduce((acc: N, v: any) => acc + v, 0)
export const arrReduceElements = (arr: A) => arr.reduce((acc: A, v: any, i: N) => [...acc, { value: v, index: i }], [])
export const arrPhrasesWithWord = (arr: A<S>, word: S) =>
	isArr(arr) && isStr(word) && arr.filter((el: S) => isStr(el) && el.includes(word))
export const arrPhrasesWithoutWord = (arr: A<S>, word: S) =>
	isArr(arr) && isStr(word) && arr.filter((el: S) => isStr(el) && !el.includes(word))
export const arrPhrasesEndsWith = (arr: A<S>, str: S) =>
	isArr(arr) && isStr(str) && arr.filter((el: S) => isStr(el) && el.endsWith(str))
export const arrPhrasesStartsWith = (arr: A<S>, str: S) =>
	isArr(arr) && isStr(str) && arr.filter((el: S) => isStr(el) && el.startsWith(str))
export const arrPhrasesByLength = (arr: A<S>, l: N) => isArr(arr) && isNum(l) && arr.filter((el: S) => el.length === l)

//? Array & String helpers
export const arrSlice = <T extends A | S>(arr: T, i1?: N, i2?: N) => {
	if (!isLenMin(arr, 1)) return [""]
	const start = isNum(i1) ? i1 : randInt(arrLastIndex(arr as A))
	const end = isNum(i2) ? i2 : randInt(arrLastIndex(arr as A), start)
	return arr.slice(start, end)
}
export const arrNeigbours = <T extends A | S>(arr: T, el: T[N], size: N = 1) => {
	if (!isLen(arr) || !arr.includes(el)) return [""]
	const i = arr.indexOf(el)
	const last = arrLastIndex(arr as A)
	const start = i - size > 0 ? i - size : 0
	const end = i + size < last ? i + size : last
	return arr.slice(start, end)
}

export const arrElementNext = <T extends A | S>(arr: T, el: T[N]) => {
	if (!isLen(arr) || !arr.includes(el)) return [""]
	const i = arr.indexOf(el)
	const last = arrLastIndex(arr as A)
	return i < last ? arr[i + 1] : arrFirst(arr as A)
}

export const arrElementPrev = <T extends A | S>(arr: T, el: T[N]) => {
	if (!isLen(arr) || !arr.includes(el)) return [""]
	const i = arr.indexOf(el)
	return i > 0 ? arr[i - 1] : arrLast(arr as A)
}

//? File helpers
export const filePath = (...paths: A<S>) => _join(__dirname, ...paths)
export const fileList = (dir = LOG_DIR) => isStr(dir) && fs.readdirSync(filePath(dir))
export const fileRead = (file = LOG_FILE) => isStr(file) && fs.readFileSync(filePath(file)).toString()
export const fileWrite = (file: S, data: S) => isStr(file) && fs.writeFileSync(filePath(file), data)
export const fileAppend = (file: S, data: S) => isStr(file) && fs.appendFileSync(filePath(file), data)
export const fileCheck = (p = "") => isStr(p) && fs.existsSync(filePath(p))
export const fileStats = (p = "") => isStr(p) && fs.statSync(filePath(p))
export const fileMkdir = (p = "") => isStr(p) && !fileCheck(p) && fs.mkdirSync(filePath(p))

//? Random data generators
export const randStr = () => rand().toString(36).substring(7)
export const randBool = () => rand() > 0.5
export const randInt = (max = MAX, min = MIN) => ~~(rand() * max - min) + min
export const randCoin = (v1: any = true, v2: any = false) => (randBool() ? v1 : v2)
export const randId = () => `${parseInt(`${randInt()}`, 36)}`
export const randKey = () => randId().repeat(5).replace(/[a-z]/gim, "")
export const randArr = (l = ARRAY_SIZE, v = 1) => Array(~~l).fill(v)
export const randObj = (size = ARRAY_SIZE) => _from(randArr(size).map(() => [randStr(), rand()]))
export const randMany = (l = ARRAY_SIZE, cb = rand) => randArr(l).map(isFunc(cb) ? cb : () => cb)
export const randSort = (v: A) => isArr(v) && v.sort(() => randCoin(1, -1))
export const randIndex = (v: A | S) => (isLen(v) && v.length > 2 ? randInt(v.length - 1, 0) : randCoin(1, 0))
export const randElement = (v: A | S) => isLen(v) && v[randIndex(v)]
export const randElementsMany = (v: A | S, l = ARRAY_SIZE) => randMany(l, () => randElement(v))
export const randObjKey = (v: O) => isObj(v) && randElement(_keys(v))
export const randObjValue = (v: O) => isObj(v) && randElement(_values(v))
export const randObjEntry = (v: O) => isObj(v) && randElement(_entries(v))
export const randCharCodeLatin = () => randInt(122, 97)
export const randCharCodeKyrillic = () => randInt(1103, 1072)
export const randPhraseFromWords = (arr: A<S>, size: N = 10) => isArr(arr) && randElementsMany(arr, size).join(" ")

//? Create log dir and file if it not exists
if (!fs.existsSync(LOG_DIR)) {
	fs.mkdirSync(LOG_DIR)
}
if (!fs.existsSync(LOG_FILE)) {
	fs.writeFileSync(LOG_FILE, getSource())
}

export class Helpers {
	static toArr = toArr
	static toObj = toObj
	static toNum = toNum
	static toStr = toStr
	static toJson = toJson
	static toFunc = toFunc
	static toType = toType
	static getLogExamples = getLogExamples
	static getTimestamp = getTimestamp
	static getSource = getSource
	static showLog = showLog
	static showInfo = showInfo
	static showWarn = showWarn
	static showError = showError
	static showDebug = showDebug
	static showTime = showTime
	static is = is
	static isLen = isLen
	static isLenMin = isLenMin
	static isLenMax = isLenMax
	static isLenRange = isLenRange
	static isExist = isExist
	static isUnd = isUnd
	static isNum = isNum
	static isStr = isStr
	static isFunc = isFunc
	static isBool = isBool
	static isBig = isBig
	static isSym = isSym
	static isArr = isArr
	static isObj = isObj
	static isRxp = isRxp
	static isEqualType = isEqualType
	static isEqualStrict = isEqualStrict
	static isEvery = isEvery
	static isSome = isSome
	static strHumanize = strHumanize
	static strCollapseWhitespace = strCollapseWhitespace
	static strTitleCase = strTitleCase
	static strTrim = strTrim
	static strSay = strSay
	static strThink = strThink
	static strSayRandom = strSayRandom
	static strThinkRandom = strThinkRandom
	static strRainbow = strRainbow
	static strAtlas = strAtlas
	static strInstagram = strInstagram
	static strVice = strVice
	static strTable = strTable
	static strToMaxLen = strToMaxLen
	static strToMinLen = strToMinLen
	static strToMatchLen = strToMatchLen
	static strToTitleCase = strToTitleCase
	static strSplit = strSplit
	static strChars = strChars
	static strWords = strWords
	static strPhrases = strPhrases
	static strLines = strLines
	static strCharsUnical = strCharsUnical
	static strWordsUnical = strWordsUnical
	static strPhrasesUnical = strPhrasesUnical
	static strLinesUnical = strLinesUnical
	static strWordFirst = strWordFirst
	static strWordLast = strWordLast
	static strCharCode = strCharCode
	static strCharFromCode = strCharFromCode
	static strCharCodeMany = strCharCodeMany
	static arrUnical = arrUnical
	static arrLastIndex = arrLastIndex
	static arrFindLast = arrFindLast
	static arrNumbers = arrNumbers
	static arrStrings = arrStrings
	static arrObjects = arrObjects
	static arrFunctions = arrFunctions
	static arrArrays = arrArrays
	static arrFirst = arrFirst
	static arrLast = arrLast
	static arrFindFirst = arrFindFirst
	static arrHasType = arrHasType
	static arrReduceText = arrReduceText
	static arrReduceSum = arrReduceSum
	static arrReduceElements = arrReduceElements
	static arrPhrasesWithWord = arrPhrasesWithWord
	static arrPhrasesWithoutWord = arrPhrasesWithoutWord
	static arrPhrasesEndsWith = arrPhrasesEndsWith
	static arrPhrasesStartsWith = arrPhrasesStartsWith
	static arrPhrasesByLength = arrPhrasesByLength
	static arrSlice = arrSlice
	static arrNeigbours = arrNeigbours
	static arrElementNext = arrElementNext
	static arrElementPrev = arrElementPrev
	static filePath = filePath
	static fileList = fileList
	static fileRead = fileRead
	static fileWrite = fileWrite
	static fileAppend = fileAppend
	static fileCheck = fileCheck
	static fileStats = fileStats
	static fileMkdir = fileMkdir
	static randStr = randStr
	static randBool = randBool
	static randInt = randInt
	static randCoin = randCoin
	static randId = randId
	static randKey = randKey
	static randArr = randArr
	static randObj = randObj
	static randMany = randMany
	static randSort = randSort
	static randIndex = randIndex
	static randElement = randElement
	static randElementsMany = randElementsMany
	static randObjKey = randObjKey
	static randObjValue = randObjValue
	static randObjEntry = randObjEntry
	static randCharCodeLatin = randCharCodeLatin
	static randCharCodeKyrillic = randCharCodeKyrillic
	static randPhraseFromWords = randPhraseFromWords
}
