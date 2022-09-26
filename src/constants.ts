import { A, S } from "./types"

import chalk from "chalk"
import gradient from "gradient-string"
import path from "path"
import util from "util"
import _cowsay from "cowsay"

const _lolcats = require("lolcats")

//? Shorthands
const { say, think } = _cowsay
const { print: lolcat, rainbow } = _lolcats
const { join: _join } = path
const { now: _now } = Date
const { cwd } = process
const { format: _format, isDeepStrictEqual: _isDeepEqual } = util
const { log: _log, info: _info, warn: _warn, error: _error, debug: _debug, timeLog: _timeLog } = console
const { random: rand, min: _min, max: _max, abs: _abs, round: _round } = Math
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

//? Default values & constants
export const UND = undefined
export const SYM = Symbol("Example Symbol")
export const BIG = _MAX_VALUE
export const NULL = null
export const STR = "Some string value"
export const ERR = new Error("Example Error")
export const RND = rand()
export const NUM = ~~(rand() * 1000)
export const BLN = RND > 0.5
export const ARR = [STR, NUM]
export const OBJ = { STR, NUM }
export const FUNC = (...values: A) => values
export const VALUES_SOURCES = [
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
	return { ...obj, text: _entries(obj).map(([k, v]) => [k, v].map((el) => JSON.stringify(el, null, 2))) }
})
export const VALUES = VALUES_SOURCES.reduce((acc: A, v) => [...acc, v.value], [])
export const TYPEOF = ["string", "number", "function", "object", "boolean", "bigint", "symbol", "undefined"]

//? Char constants
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

//? Message divider constants
export const DIV_CONTENT = `\n${CHAR_DIV.repeat(30)}\n`
export const DIV_LINE = `\n${CHAR_DIV.repeat(20)}\n`
export const DIV_TITLE = `\t${CHAR_DIV.repeat(5)}\t`

//? Argument constants
export const MIN = 1
export const MAX = 2000
export const RANGE = [MIN, MAX]
export const RANGE_LENGTH = [MIN, MAX]
export const ARRAY_SIZE = 10
export const LIKE_DIFF = 0.1
export const CHAR_CODE_MULT = 256
export const MAX_ENCODED_SIZE = 100
export const TIME = new Date().toLocaleString()
export const OPTIONS_FS = { encoding: "utf-8" }

//? Brain network option constants
export const INPUT_SIZE = 1
export const HIDDEN_SIZE = 3
export const OUTPUT_SIZE = 1
export const TRAIN_SET_SIZE = 1000
export const LEARNING_RATE = 0.05
export const ITERATIONS = 1000
export const ERROR_THRESHOLD = 0.005
export const LOG_PERIOD = 100
export const OPTIONS_BRAIN_LSTM = { log: true }
export const OPTIONS_BRAIN_TRAIN = {
	log: true,
	learningRate: LEARNING_RATE,
	iterations: ITERATIONS,
	errorThresh: ERROR_THRESHOLD,
	logPeriod: LOG_PERIOD,
	callback: _log
}

//? Logger constants
export const DECORATE_SOURCES = [
	{ desc: "console log", func: (text: S) => _log(text) },
	{ desc: "console info", func: (text: S) => _info(text) },
	{ desc: "console warn", func: (text: S) => _warn(text) },
	{ desc: "console error", func: (text: S) => _error(text) },
	{ desc: "console debug", func: (text: S) => _debug(text) },
	{ desc: "atlas gradient", func: (text: S) => _log(gradient.atlas(text)) },
	{ desc: "cristal gradient", func: (text: S) => _log(gradient.cristal(text)) },
	{ desc: "teen gradient", func: (text: S) => _log(gradient.teen(text)) },
	{ desc: "mind gradient", func: (text: S) => _log(gradient.mind(text)) },
	{ desc: "morning gradient", func: (text: S) => _log(gradient.morning(text)) },
	{ desc: "vice gradient", func: (text: S) => _log(gradient.vice(text)) },
	{ desc: "passion gradient", func: (text: S) => _log(gradient.passion(text)) },
	{ desc: "fruit gradient", func: (text: S) => _log(gradient.fruit(text)) },
	{ desc: "instagram gradient", func: (text: S) => _log(gradient.instagram(text)) },
	{ desc: "retro gradient", func: (text: S) => _log(gradient.retro(text)) },
	{ desc: "summer gradient", func: (text: S) => _log(gradient.summer(text)) },
	{ desc: "rainbow gradient", func: (text: S) => _log(gradient.rainbow(text)) },
	{ desc: "pastel gradient", func: (text: S) => _log(gradient.pastel(text)) },
	{ desc: "red color", func: (text: S) => _log(chalk.red(text)) },
	{ desc: "blue color", func: (text: S) => _log(chalk.blue(text)) },
	{ desc: "underline color", func: (text: S) => _log(chalk.underline(text)) },
	{ desc: "green color", func: (text: S) => _log(chalk.green(text)) },
	{ desc: "yellow color", func: (text: S) => _log(chalk.yellow(text)) },
	{ desc: "rainbow color", func: (text: S) => _log(rainbow(text)) },
	{ desc: "cow say", func: (text: S) => _log(say({ text })) },
	{ desc: "cow think", func: (text: S) => _log(think({ text })) },
	{ desc: "cow say random", func: (text: S) => _log(say({ text, r: true })) },
	{ desc: "cow think rkRandom", func: (text: S) => _log(think({ text, r: true })) }
]
export const DECORATE_METHODS = _from(DECORATE_SOURCES.reduce((acc: A, { desc, func }) => [...acc, [desc, func]], []))

//? Filesystem paths
export const ROOT = cwd()
export const DIR = __dirname
export const FILE = __filename
export const LOG_DIR = _join(__dirname, "logs")
export const LOG_FILE = _join(LOG_DIR, "logs.log")
