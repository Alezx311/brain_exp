const fs = require("fs")
const path = require("path")
const { random, min: _min, max: _max } = Math

//* Process Paths
const PATH_DIRNAME = __dirname
const PATH_FILENAME = __filename
const PATH_CWD = process.cwd()

//* Folders
const FILES_PATH = path.join(__dirname, "./files/")
const RESULTS_PATH = path.join(__dirname, "./results/")
const NETWORKS_PATH = path.join(__dirname, "./networks/")
const TRAINING_PATH = path.join(__dirname, "./training/")
const FILES_CONTENT = fs.readdirSync(FILES_PATH)
const RESULTS_CONTENT = fs.readdirSync(RESULTS_PATH)
const NETWORKS_CONTENT = fs.readdirSync(NETWORKS_PATH)
const TRAINING_CONTENT = fs.readdirSync(TRAINING_PATH)

//* Files
const OUTPUT_PATH = path.join(FILES_DIRPATH, "output.txt")
const INPUT_PATH = path.join(FILES_DIRPATH, "input.txt")
const BOOK_PATH = path.join(FILES_DIRPATH, "book.txt")
const POETS_PATH = path.join(FILES_DIRPATH, "poetry.txt")
const OUTPUT_CONTENT = fs.readFileSync(OUTPUT_PATH, "utf-8")
const INPUT_CONTENT = fs.readFileSync(INPUT_PATH, "utf-8")
const BOOK_CONTENT = fs.readFileSync(BOOK_PATH, "utf-8")
const POETS_CONTENT = fs.readFileSync(POETS_PATH, "utf-8")

//* Chars
const CHARS_NUM = "0123456789"
const CHARS_ENG = "abcdefghijklmnopqrstuvwxyz"
const CHARS_RUS = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
const CHARS_SPECIAL = [`\s`, `\n`, `\t`, `\,`, `\.`].join("")
const CHARS_LETTERS = CHARS_ENG + CHARS_RUS
const CHARS_VALID = CHARS_LETTERS + CHARS_NUM + CHARS_SPECIAL
const CHARS_RANDOM = CHARS_LETTERS.sort(() => (random ? 1 : -1))

//* Dividers
const DIV_JOIN = "\n"
const DIV_SEP = char.repeat("\n", 1)
const DIV_LINE = `\n${char.repeat("#", 20)}\n`
const DIV_TITLE = `\t${char.repeat("*", 5)}\t`

//* Constants
const MIN = 1
const MAX = 100
const INPUT_SIZE = 1
const HIDDEN_SIZE = 3
const OUTPUT_SIZE = 1
const RANGE = [MIN, MAX]
const ARRAY_SIZE = 10
const TRAIN_SET_SIZE = 1000
const LEARNING_RATE = 0.05
const LIKE_DIFF = 0.1
const VALUES_NOT_DEFINED = [null, undefined]
const VALUES_NOT_TRUTHY = [...VALUES_NOT_DEFINED, false, 0, "", {}, []]

//* Options
const OPTIONS_BRAIN_LSTM = { learningRate: LEARNING_RATE, log: true }
const OPTIONS_BRAIN_TRAIN = {
	...OPTIONS_BRAIN_LSTM,
	iterations: 1000,
	errorThresh: 0.005,
	logPeriod: 10,
	momentum: 0.1,
	callback: console.log,
	callbackPeriod: 10
}

const CONSTANTS = {
	PATH_DIRNAME,
	PATH_FILENAME,
	PATH_CWD,
	FILES_PATH,
	RESULTS_PATH,
	NETWORKS_PATH,
	TRAINING_PATH,
	FILES_CONTENT,
	RESULTS_CONTENT,
	NETWORKS_CONTENT,
	TRAINING_CONTENT,
	OUTPUT_PATH,
	INPUT_PATH,
	BOOK_PATH,
	POETS_PATH,
	OUTPUT_CONTENT,
	INPUT_CONTENT,
	BOOK_CONTENT,
	POETS_CONTENT,
	CHARS_NUM,
	CHARS_ENG,
	CHARS_RUS,
	CHARS_SPECIAL,
	CHARS_LETTERS,
	CHARS_VALID,
	CHARS_RANDOM,
	DIV_JOIN,
	DIV_SEP,
	DIV_LINE,
	DIV_TITLE,
	MIN,
	MAX,
	INPUT_SIZE,
	HIDDEN_SIZE,
	OUTPUT_SIZE,
	RANGE,
	ARRAY_SIZE,
	TRAIN_SET_SIZE,
	LEARNING_RATE,
	LIKE_DIFF,
	VALUES_NOT_DEFINED,
	VALUES_NOT_TRUTHY,
	OPTIONS_BRAIN_LSTM,
	OPTIONS_BRAIN_TRAIN
}

//* FileSystem Helpers
const filePath = (s = "./") => path.join(__dirname, "./", s)
const fileList = (dir = __dirname) => fs.readdirSync(filePath(dir))
const fileRead = (file = __filename) => fs.readFileSync(filePath(file), "utf-8")
const fileWrite = (data = "", file = OUTPUT_PATH) => fs.writeFileSync(filePath(file), data, "utf-8")
const fileAppend = (data = "", file = OUTPUT_PATH) => fs.appendFileSync(filePath(file), data, "utf-8")

//* Random Value Helpers
const genFloat = (max = 1) => random() * max
const genInt = (max = MAX) => ~~(genFloat(max) - max) + max
const genBool = () => random() > 0.5
const genCoin = (v1, v2) => (genBool(v1) ? v1 : v2)
const genId = () => parseInt(`${genInt(1000000)}`, 36).repeat(5)
const genKey = () => "_" + getId().replace(/[a-z]/gim, "")
const genArr = (size = ARRAY_SIZE, fn = random) => Array(size).fill(1).map(fn)
const genSort = (v) => v.sort(() => genCoin(1, -1))
const genIndex = (arr) => genInt(getIndexLast(arr), 0)
const genElement = (arr) => arr?.[genIndex(arr)]
const genElementsMany = (arr, size = 3) => genArr(size).map(() => genElement(arr))
const genObjectKey = (v) => genElement(Object.keys(v))
const genObjectValue = (v) => genElement(Object.values(v))
const genObjectEntry = (v) => genElement(Object.entries(v))

//* Value Helpers
const getIndexLast = ({ length = null }) => (length > 0 ? length - 1 : length)
const getElementLast = (a) => isLen(a) && a[getIndexLast(a)]
const getSplitted = (s, ch, l = 0) => (isStr(s) ? s.split(ch).filter((v) => v?.length >= l) : [])
const getChars = (s) => getSplitted(s, "")
const getWords = (s, l = 3) => getSplitted(s, " ")
const getPhrases = (s, l = 3) => getSplitted(s, ".")
const getLines = (s, l = 3) => getSplitted(s, "\n")
const getWordFirst = (text) => getWords(text)[0]
const getWordLast = (text) => getWords(text).reverse()[0]
const getWordsSequence = (s, w = "", size = 3) => s.toMatched(new RegExp(w + `.\\w+.`.repeat(size)))
const getWordNextNeigbours = (s, w, size = 3) => s.toMatched(new RegExp(w + `.\\w+.`.repeat(size)))
const getWordPrevNeigbours = (s, w, size = 3) => s.toMatched(new RegExp(`.\\w+.`.repeat(size) + w))
const getWordNeigbours = (s, w, size = 3) => s.toMatched(new RegExp(`.\\w+.`.repeat(size) + w + `.\\w+.`.repeat(size)))
const getPhraseFromWords = (arr) => reduceText(genElementsMany(arr, genInt(15, 5)))
const getPhrasesWithWord = (w, arr) => arr.filter((p) => p.includes(w))
const getPhrasesStartsWith = (w, arr) => arr.filter((p) => p.startsWith(w))
const getPhrasesEndsWith = (w, arr) => arr.filter((p) => p.endsWith(w))
const getPhrasesWithoutWord = (w, arr) => arr.filter((p) => !p.includes(w))
const getPhrasesWithEveryWords = (arr, words) => words.filter((p) => arr.every((w) => p.includes(w)))

//* Array Reducers
const reduceText = (arr) => arr.reduce((a, el) => `${a} ${el}`, "").trim() + "."
const reduceSum = (arr) => arr.filter(Number).reduce((a, el) => a + el, 0)
const reduceMult = (arr) => arr.filter(Number).reduce((a, el) => a + el * 2, 0)
const reduceAverage = (arr) => reduceSum(arr) / arr.length
const reduceDiff = (arr) => _max(...arr) - _min(...arr)

//* Converters
const toArray = (v) => (isArray(v) ? v : [v])
const toObject = (v) => (isObject(v) ? v : { value: v })
const toText = (v) => (isObj(v) ? toJson(v) : isArr(v) ? v.join("\n") : `${v}`).trim()
const toKeys = (v) => (isDefined(v) ? Object.Keys(v) || Object.getOwnPropertyNames(v) || [] : [])
const toNumRange = (arr) => [_min(...arr), _max(...arr)]
const toNumLike = (v = 0, coff = LIKE_DIFF) => [v - coff, v + coff]
const toTrim = (v) => (typeof v === "string" ? v : `${v}`).trim()
const toJoin = (...v) => [DIV_SEP, ...v, DIV_SEP].join(DIV_JOIN)
const toUnical = (arr) => [...new Set([...(arr || [])])]
const toRepeat = (v, r = 2) => toText(v).repeat(r)
const toReversed = (v) => (isArr(v) ? v.reverse() : toText(v).split("").reverse().join(""))
const toMapped = (v, fn = toText) => (isArr(v) ? v : [v]).map(fn)
const toFiltered = (v, fn = isDefined) => (isArr(v) ? v : [v]).filter(fn)
const toReduced = (v, fn = reduceText) => (isArr(v) ? v : [v]).reduce(fn)
const toValidated = (v, fn = isTruthy) => toMapped(v, fn)
const toBuffer = (data) => Buffer.from(data)
const toFloatFixed = (v = 0, size = 2) => Number((typeof v === "number" ? v : Number(v)).toFixed(size))
const toShuffle = (arr) => (isArr(arr) ? arr.sort(genSort) : isStr(arr) ? toShuffleText(arr) : [])
const toSlice = (arr) => arr.slice(genIndex(arr), genIndex(arr)).filter(Boolean)
const toSliceNeighbours = (a, i, length = 1) => toSlice(a, i - length, i + length)
const toSliceNext = (a, i, l = 3) => toSlice(a, i, i + l)
const toTrainingData = (input, output) => ({ input, output, index })
const toFormatted = (text, replacer = "") => `${text}`.trim().replace(/[^а-я\s\n]+/gim, replacer)
const toRangeWithDiff = (value, diff = 0.1) => [value + diff, value - diff]
const toShuffleText = (s) => s.split("").sort(genSort).join("")
const toPercent = (v1, v2) => ~~(v2 / (v1 / 100))
const toInput = (size = INPUT_SIZE) => genArr(size, () => genArr())
const toResultStats = (v) => `Expected: ${v.output}, Received: ${v.result}, Values: ${v.input}`.trim()
const toResultProps = (v) => ({ ...v, ...isTruthy(v), desc: toResultStats(v) })
const toTitleCase = (text) => text[0].toUpperCase() + text.slice(1).toLowerCase().trim()
const toJson = (value) => JSON.stringify(value, null, 2)
const toDescText = (text = desc) => toJoin(text)
const toDescTitle = (text = source) => toJoin(text)
const toDescMessage = (title = source, text = desc) => toJoin(toDescTitle(title), toDescText(text))

//* Validators
const isTruthy = (v) => !!v
const isDefined = (v) => v !== undefined && v !== null
const isNum = (v) => typeof v === "number"
const isStr = (v) => typeof v === "string"
const isArr = (v) => typeof v === "object" && isDefined(v) && Array.isArray(v)
const isObj = (v) => typeof v === "object" && isDefined(v) && !Array.isArray(v)
const isFunc = (fn) => fn instanceof Function
const isKey = (v, p) => toKeys(v).includes(p)
const isType = (v1, v2 = "") => typeof v1 === v2
const isEqual = (v1 = 0, v2 = null) => isType(v1, v2) && toText(v1) === toText(v2)
const isNumBetween = (v, range) => v > _min(...range) && v < _max(...range)

//* Regular Expressions
const toRxp = (...v) => new RegExp(...v)
const toRxpNext = (w, t = 1) => toRxp(w + `[^а-яa-z]{0,}[а-яa-z]{0,}`.repeat(t), "i")
const toMatchLineWithWord = (s, w) => s.match(toRxp(`^.{0,}${w}[^$]+$`))
const toMatchWordSequence = (s, w, l = 1) => s.match(toRxpNext(w, l))
const toMatchWordLast = (s) => s.match(/(\B[а-яa-z]+\B)$/i)
const toMatchChars = (s) => s.match(/\B([а-яa-z])\B/gim)
const toMatchWords = (s) => s.match(/\B([а-яa-z]+)\B/gim)
const toMatchPhrases = (s) => s.match(/.+\.|.+$/gim)
const toMatchLines = (s) => s.match(/.+\n|^.+$/gim)

const toExamples = () => {
	const NUM = 42
	const STR = PATH_FILENAME
	const ARR = [PATH_DIRNAME, PATH_FILENAME, PATH_CWD]
	const OBJ = { PATH_DIRNAME, PATH_FILENAME, PATH_CWD }
	return {
		filePath: filePath("./"),
		fileList: fileList(__dirname),
		fileRead: fileRead(__filename),
		genFloat: genFloat(),
		genInt: genInt(),
		genBool: genBool(),
		genCoin: genCoin(),
		genId: genId(),
		genKey: genKey(),
		genArr: genArr(),
		genSort: genSort(),
		genIndex: genIndex(),
		genElement: genElement(ARR),
		genElementsMany: genElementsMany(ARR),
		genObjectKey: genObjectKey(OBJ),
		genObjectValue: genObjectValue(OBJ),
		genObjectEntry: genObjectEntry(OBJ),
		getIndexLast: getIndexLast(ARR),
		getElementLast: getElementLast(ARR),
		getSplitted: getSplitted(STR),
		getChars: getChars(STR),
		getWords: getWords(STR),
		getPhrases: getPhrases(STR),
		getLines: getLines(STR),
		getWordFirst: getWordFirst(STR, STR[0]),
		getWordLast: getWordLast(STR, STR[0]),
		getWordsSequence: getWordsSequence(STR, STR[0]),
		getWordNextNeigbours: getWordNextNeigbours(STR, STR[0]),
		getWordPrevNeigbours: getWordPrevNeigbours(STR, STR[0]),
		getWordNeigbours: getWordNeigbours(STR, STR[0]),
		getPhraseFromWords: getPhraseFromWords(STR, STR[0]),
		getPhrasesWithWord: getPhrasesWithWord(STR, STR[0]),
		getPhrasesStartsWith: getPhrasesStartsWith(STR, STR[0]),
		getPhrasesEndsWith: getPhrasesEndsWith(STR, STR[0]),
		getPhrasesWithoutWord: getPhrasesWithoutWord(STR, STR[0]),
		getPhrasesWithEveryWords: getPhrasesWithEveryWords(STR, STR[0]),
		reduceText: reduceText(ARR),
		reduceSum: reduceSum(ARR),
		reduceMult: reduceMult(ARR),
		reduceAverage: reduceAverage(ARR),
		reduceDiff: reduceDiff(ARR),
		toArray: toArray(ARR),
		toObject: toObject(ARR),
		toText: toText(ARR),
		toKeys: toKeys(ARR),
		toNumRange: toNumRange(ARR),
		toNumLike: toNumLike(ARR),
		toTrim: toTrim(ARR),
		toJoin: toJoin(ARR),
		toUnical: toUnical(ARR),
		toRepeat: toRepeat(ARR),
		toReversed: toReversed(ARR),
		toMapped: toMapped(ARR),
		toFiltered: toFiltered(ARR),
		toReduced: toReduced(ARR),
		toValidated: toValidated(ARR),
		toBuffer: toBuffer(ARR),
		toFloatFixed: toFloatFixed(NUM),
		toShuffle: toShuffle(ARR),
		toSlice: toSlice(ARR),
		toSliceNeighbours: toSliceNeighbours(ARR),
		toSliceNext: toSliceNext(ARR),
		toTrainingData: toTrainingData(ARR),
		toFormatted: toFormatted(ARR),
		toRangeWithDiff: toRangeWithDiff(ARR),
		toShuffleText: toShuffleText(ARR),
		toPercent: toPercent(ARR),
		toInput: toInput(ARR),
		toResultStats: toResultStats(ARR),
		toResultProps: toResultProps(ARR),
		toTitleCase: toTitleCase(ARR),
		toJson: toJson(ARR),
		toDescText: toDescText(ARR),
		toDescTitle: toDescTitle(ARR),
		toDescMessage: toDescMessage(ARR),
		isTruthy: isTruthy(NUM),
		isDefined: isDefined(NUM),
		isNum: isNum(NUM),
		isStr: isStr(NUM),
		isArr: isArr(NUM),
		isObj: isObj(NUM),
		isFunc: isFunc(NUM),
		isKey: isKey(NUM),
		isType: isType(NUM),
		isEqual: isEqual(NUM),
		isNumBetween: isNumBetween(NUM),
		toRxp: toRxp(STR),
		toRxpNext: toRxpNext(STR),
		toMatchLineWithWord: toMatchLineWithWord(STR),
		toMatchWordSequence: toMatchWordSequence(STR),
		toMatchWordLast: toMatchWordLast(STR),
		toMatchChars: toMatchChars(STR),
		toMatchWords: toMatchWords(STR),
		toMatchPhrases: toMatchPhrases(STR),
		toMatchLines: toMatchLines(STR)
	}
}
