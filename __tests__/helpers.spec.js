const { LOG_FILE } = require("../helpers")
const Helpers = require("../helpers")
const { ARR, STR, NUM, OBJ, FUNC, SYM } = Helpers

const CONSTANT_SOURCES = [
	{ desc: "NULL", value: Helpers.NULL },
	{ desc: "STR", value: Helpers.STR },
	{ desc: "ERR", value: Helpers.ERR },
	{ desc: "RND", value: Helpers.RND },
	{ desc: "NUM", value: Helpers.NUM },
	{ desc: "BLN", value: Helpers.BLN },
	{ desc: "ARR", value: Helpers.ARR },
	{ desc: "OBJ", value: Helpers.OBJ },
	{ desc: "VALUES_SOURCES", value: Helpers.VALUES_SOURCES },
	{ desc: "VALUES", value: Helpers.VALUES },
	{ desc: "TYPEOF", value: Helpers.TYPEOF },
	{ desc: "DECORATE_SOURCES", value: Helpers.DECORATE_SOURCES },
	{ desc: "DECORATE_METHODS", value: Helpers.DECORATE_METHODS },
	{ desc: "CHAR_LINE", value: Helpers.CHAR_LINE },
	{ desc: "CHAR_TAB", value: Helpers.CHAR_TAB },
	{ desc: "CHAR_SPACE", value: Helpers.CHAR_SPACE },
	{ desc: "CHAR_COMMA", value: Helpers.CHAR_COMMA },
	{ desc: "CHAR_DOT", value: Helpers.CHAR_DOT },
	{ desc: "CHAR_DIV", value: Helpers.CHAR_DIV },
	{ desc: "CHARS_ENG", value: Helpers.CHARS_ENG },
	{ desc: "CHARS_RUS", value: Helpers.CHARS_RUS },
	{ desc: "CHARS_NUM", value: Helpers.CHARS_NUM },
	{ desc: "CHARS_SIMPLE", value: Helpers.CHARS_SIMPLE },
	{ desc: "CHARS_SPECIAL", value: Helpers.CHARS_SPECIAL },
	{ desc: "CHARS_VALID", value: Helpers.CHARS_VALID },
	{ desc: "DIV_CONTENT", value: Helpers.DIV_CONTENT },
	{ desc: "DIV_LINE", value: Helpers.DIV_LINE },
	{ desc: "DIV_TITLE", value: Helpers.DIV_TITLE },
	{ desc: "MIN", value: Helpers.MIN },
	{ desc: "MAX", value: Helpers.MAX },
	{ desc: "RANGE", value: Helpers.RANGE },
	{ desc: "RANGE_LENGTH", value: Helpers.RANGE_LENGTH },
	{ desc: "ARRAY_SIZE", value: Helpers.ARRAY_SIZE },
	{ desc: "LIKE_DIFF", value: Helpers.LIKE_DIFF },
	{ desc: "OPTIONS_FS", value: Helpers.OPTIONS_FS },
	{ desc: "INPUT_SIZE", value: Helpers.INPUT_SIZE },
	{ desc: "HIDDEN_SIZE", value: Helpers.HIDDEN_SIZE },
	{ desc: "OUTPUT_SIZE", value: Helpers.OUTPUT_SIZE },
	{ desc: "TRAIN_SET_SIZE", value: Helpers.TRAIN_SET_SIZE },
	{ desc: "LEARNING_RATE", value: Helpers.LEARNING_RATE },
	{ desc: "ITERATIONS", value: Helpers.ITERATIONS },
	{ desc: "ERROR_THRESHOLD", value: Helpers.ERROR_THRESHOLD },
	{ desc: "LOG_PERIOD", value: Helpers.LOG_PERIOD },
	{ desc: "OPTIONS_BRAIN_LSTM", value: Helpers.OPTIONS_BRAIN_LSTM },
	{ desc: "OPTIONS_BRAIN_TRAIN", value: Helpers.OPTIONS_BRAIN_TRAIN },
	{ desc: "ROOT", value: Helpers.ROOT },
	{ desc: "DIR", value: Helpers.DIR },
	{ desc: "FILE", value: Helpers.FILE },
	{ desc: "TIME", value: Helpers.TIME },
	{ desc: "LOG_DIR", value: Helpers.LOG_DIR },
	{ desc: "LOG_FILE", value: Helpers.LOG_FILE },
	{ desc: "CHAR_CODE_MULT", value: Helpers.CHAR_CODE_MULT },
	{ desc: "MAX_ENCODED_SIZE", value: Helpers.MAX_ENCODED_SIZE }
].map(({ desc, value }, index) => {
	return { desc, value, index }
})

const FUNC_SOURCES = [
	{ desc: "arrArrays", func: Helpers.arrArrays, args: [ARR] },
	{ desc: "arrElementNext", func: Helpers.arrElementNext, args: [ARR] },
	{ desc: "arrElementPrev", func: Helpers.arrElementPrev, args: [ARR] },
	{ desc: "arrFindFirst", func: Helpers.arrFindFirst, args: [ARR] },
	{ desc: "arrFindLast", func: Helpers.arrFindLast, args: [ARR] },
	{ desc: "arrFirst", func: Helpers.arrFirst, args: [ARR] },
	{ desc: "arrFunctions", func: Helpers.arrFunctions, args: [ARR] },
	{ desc: "arrHasType", func: Helpers.arrHasType, args: [ARR] },
	{ desc: "arrLast", func: Helpers.arrLast, args: [ARR] },
	{ desc: "arrLastIndex", func: Helpers.arrLastIndex, args: [ARR] },
	{ desc: "arrNumbers", func: Helpers.arrNumbers, args: [ARR] },
	{ desc: "arrObjects", func: Helpers.arrObjects, args: [ARR] },
	{ desc: "arrStrings", func: Helpers.arrStrings, args: [ARR] },
	{ desc: "arrUnical", func: Helpers.arrUnical, args: [ARR] },
	{ desc: "arrNeigbours", func: Helpers.arrNeigbours, args: [ARR] },
	{ desc: "filePath", func: Helpers.filePath, args: ["./"] },
	{ desc: "getLogExamples", func: Helpers.getLogExamples, args: [null] },
	{ desc: "getSource", func: Helpers.getSource, args: [ARR] },
	{ desc: "getTimestamp", func: Helpers.getTimestamp, args: [ARR] },
	{ desc: "getPhrasesByIndex", func: Helpers.getPhrasesByIndex, args: [[STR], 0] },
	{ desc: "getPhrasesByLength", func: Helpers.getPhrasesByLength, args: [[STR], STR.length] },
	{ desc: "getPhrasesEndsWith", func: Helpers.getPhrasesEndsWith, args: [[STR], STR.at(-1)] },
	{ desc: "getPhrasesStartsWith", func: Helpers.getPhrasesStartsWith, args: [[STR], STR.at(0)] },
	{ desc: "getPhrasesWithoutWord", func: Helpers.getPhrasesWithoutWord, args: [[STR], "test"] },
	{ desc: "getPhrasesWithWord", func: Helpers.getPhrasesWithWord, args: [[STR], STR] },
	{ desc: "is", func: Helpers.is, args: [ARR] },
	{ desc: "isArr", func: Helpers.isArr, args: [ARR] },
	{ desc: "isBig", func: Helpers.isBig, args: [Number.MAX_VALUE] },
	{ desc: "isBool", func: Helpers.isBool, args: [true] },
	{ desc: "isEqualStrict", func: Helpers.isEqualStrict, args: [OBJ, OBJ] },
	{ desc: "isEqualType", func: Helpers.isEqualType, args: [STR, STR] },
	{ desc: "isEvery", func: Helpers.isEvery, args: [ARR, ...ARR] },
	{ desc: "isSome", func: Helpers.isSome, args: [ARR, ...ARR] },
	{ desc: "isExist", func: Helpers.isExist, args: [ARR, ...ARR] },
	{ desc: "isFunc", func: Helpers.isFunc, args: [FUNC] },
	{ desc: "isLen", func: Helpers.isLen, args: [ARR] },
	{ desc: "isLenMax", func: Helpers.isLenMax, args: [ARR, 1000] },
	{ desc: "isLenMin", func: Helpers.isLenMin, args: [ARR, 0] },
	{ desc: "isLenRange", func: Helpers.isLenRange, args: [ARR, 1, 1000] },
	{ desc: "isNum", func: Helpers.isNum, args: [NUM] },
	{ desc: "isObj", func: Helpers.isObj, args: [OBJ] },
	{ desc: "isRxp", func: Helpers.isRxp, args: [new RegExp(STR)] },
	{ desc: "isStr", func: Helpers.isStr, args: [STR] },
	{ desc: "isSym", func: Helpers.isSym, args: [SYM] },
	{ desc: "isUnd", func: Helpers.isUnd, args: [undefined] },
	{ desc: "randArr", func: Helpers.randArr, args: [3] },
	{ desc: "randBool", func: Helpers.randBool, args: [null] },
	{ desc: "randCharCodeKyrillic", func: Helpers.randCharCodeKyrillic, args: [null] },
	{ desc: "randCharCodeLatin", func: Helpers.randCharCodeLatin, args: [null] },
	{ desc: "randCoin", func: Helpers.randCoin, args: [null] },
	{ desc: "randElement", func: Helpers.randElement, args: [ARR] },
	{ desc: "randElementsMany", func: Helpers.randElementsMany, args: [ARR, 3] },
	{ desc: "randId", func: Helpers.randId, args: [null] },
	{ desc: "randIndex", func: Helpers.randIndex, args: [ARR] },
	{ desc: "randInt", func: Helpers.randInt, args: [null] },
	{ desc: "randKey", func: Helpers.randKey, args: [OBJ] },
	{ desc: "randMany", func: Helpers.randMany, args: [ARR] },
	{ desc: "randObj", func: Helpers.randObj, args: [null] },
	{ desc: "randObjEntry", func: Helpers.randObjEntry, args: [OBJ] },
	{ desc: "randObjKey", func: Helpers.randObjKey, args: [OBJ] },
	{ desc: "randObjValue", func: Helpers.randObjValue, args: [OBJ] },
	{ desc: "randPhraseFromWords", func: Helpers.randPhraseFromWords, args: [[STR, STR]] },
	{ desc: "randSort", func: Helpers.randSort, args: [ARR] },
	{ desc: "randStr", func: Helpers.randStr, args: [null] },
	{ desc: "reduceElements", func: Helpers.reduceElements, args: [ARR] },
	{ desc: "reduceSum", func: Helpers.reduceSum, args: [ARR] },
	{ desc: "reduceText", func: Helpers.reduceText, args: [ARR] }
].map(({ desc, func, args }, index) => {
	const result = func(...args)
	return { desc, result, args, func, index }
})

describe("Helpers functions...", () => {
	FUNC_SOURCES.map(({ desc, result, func, args, index }) => {
		it(desc, () => {
			expect(desc).toBeDefined()
			expect(result).toBeDefined()
			expect(func).toBeDefined()
			expect(args).toBeDefined()
			expect(index).toBeDefined()

			expect(Helpers).toHaveProperty(desc)
			expect(typeof Helpers[desc]).toBe("function")
		})
	})
})

describe("Helpers constants...", () => {
	CONSTANT_SOURCES.map(({ desc, value, index }) => {
		it(desc, () => {
			expect(desc).toBeDefined()
			expect(value).toBeDefined()
			expect(index).toBeDefined()

			expect(Helpers).toHaveProperty(desc)
			expect(typeof Helpers[desc]).not.toBe("function")
			expect(Helpers[desc]).toEqual(value)
		})
	})
})
