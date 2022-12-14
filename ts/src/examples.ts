import { Helpers } from "./helpers"
import { Constants } from "./constants"
import { A, S } from "./types"

export const ExampleConstants = [
	{ desc: "UND", value: Constants.UND },
	{ desc: "SYM", value: Constants.SYM },
	{ desc: "BIG", value: Constants.BIG },
	{ desc: "NULL", value: Constants.NULL },
	{ desc: "STR", value: Constants.STR },
	{ desc: "ERR", value: Constants.ERR },
	{ desc: "RND", value: Constants.RND },
	{ desc: "NUM", value: Constants.NUM },
	{ desc: "BLN", value: Constants.BLN },
	{ desc: "ARR", value: Constants.ARR },
	{ desc: "OBJ", value: Constants.OBJ },
	{ desc: "FUNC", value: Constants.FUNC },
	{ desc: "VALUES_SOURCES", value: Constants.VALUES_SOURCES },
	{ desc: "VALUES", value: Constants.VALUES },
	{ desc: "TYPEOF", value: Constants.TYPEOF },
	{ desc: "CHAR_LINE", value: Constants.CHAR_LINE },
	{ desc: "CHAR_TAB", value: Constants.CHAR_TAB },
	{ desc: "CHAR_SPACE", value: Constants.CHAR_SPACE },
	{ desc: "CHAR_COMMA", value: Constants.CHAR_COMMA },
	{ desc: "CHAR_DOT", value: Constants.CHAR_DOT },
	{ desc: "CHAR_DIV", value: Constants.CHAR_DIV },
	{ desc: "CHARS_ENG", value: Constants.CHARS_ENG },
	{ desc: "CHARS_RUS", value: Constants.CHARS_RUS },
	{ desc: "CHARS_NUM", value: Constants.CHARS_NUM },
	{ desc: "CHARS_SIMPLE", value: Constants.CHARS_SIMPLE },
	{ desc: "CHARS_SPECIAL", value: Constants.CHARS_SPECIAL },
	{ desc: "CHARS_VALID", value: Constants.CHARS_VALID },
	{ desc: "DIV_CONTENT", value: Constants.DIV_CONTENT },
	{ desc: "DIV_LINE", value: Constants.DIV_LINE },
	{ desc: "DIV_TITLE", value: Constants.DIV_TITLE },
	{ desc: "MIN", value: Constants.MIN },
	{ desc: "MAX", value: Constants.MAX },
	{ desc: "RANGE", value: Constants.RANGE },
	{ desc: "RANGE_LENGTH", value: Constants.RANGE_LENGTH },
	{ desc: "ARRAY_SIZE", value: Constants.ARRAY_SIZE },
	{ desc: "LIKE_DIFF", value: Constants.LIKE_DIFF },
	{ desc: "CHAR_CODE_MULT", value: Constants.CHAR_CODE_MULT },
	{ desc: "MAX_ENCODED_SIZE", value: Constants.MAX_ENCODED_SIZE },
	{ desc: "TIME", value: Constants.TIME },
	{ desc: "OPTIONS_FS", value: Constants.OPTIONS_FS },
	{ desc: "INPUT_SIZE", value: Constants.INPUT_SIZE },
	{ desc: "HIDDEN_SIZE", value: Constants.HIDDEN_SIZE },
	{ desc: "OUTPUT_SIZE", value: Constants.OUTPUT_SIZE },
	{ desc: "TRAIN_SET_SIZE", value: Constants.TRAIN_SET_SIZE },
	{ desc: "LEARNING_RATE", value: Constants.LEARNING_RATE },
	{ desc: "ITERATIONS", value: Constants.ITERATIONS },
	{ desc: "ERROR_THRESHOLD", value: Constants.ERROR_THRESHOLD },
	{ desc: "LOG_PERIOD", value: Constants.LOG_PERIOD },
	{ desc: "OPTIONS_BRAIN_LSTM", value: Constants.OPTIONS_BRAIN_LSTM },
	{ desc: "OPTIONS_BRAIN_TRAIN", value: Constants.OPTIONS_BRAIN_TRAIN },
	{ desc: "DECORATE_SOURCES", value: Constants.DECORATE_SOURCES },
	{ desc: "DECORATE_METHODS", value: Constants.DECORATE_METHODS },
	{ desc: "ROOT", value: Constants.ROOT },
	{ desc: "DIR", value: Constants.DIR },
	{ desc: "FILE", value: Constants.FILE },
	{ desc: "LOG_DIR", value: Constants.LOG_DIR },
	{ desc: "LOG_FILE", value: Constants.LOG_FILE }
]

export const ExampleResults = [
	{ desc: "toArr", func: Helpers.toArr, args: ["", null] },
	{ desc: "toObj", func: Helpers.toObj, args: ["", null] },
	{ desc: "toNum", func: Helpers.toNum, args: ["", null] },
	{ desc: "toStr", func: Helpers.toStr, args: ["", null] },
	{ desc: "toJson", func: Helpers.toJson, args: ["", null] },
	{ desc: "toFunc", func: Helpers.toFunc, args: ["", null] },
	{ desc: "toType", func: Helpers.toType, args: ["", null] },
	{ desc: "getLogExamples", func: Helpers.getLogExamples, args: ["", null] },
	{ desc: "getTimestamp", func: Helpers.getTimestamp, args: ["", null] },
	{ desc: "getSource", func: Helpers.getSource, args: ["", null] },
	{ desc: "showLog", func: Helpers.showLog, args: ["", null] },
	{ desc: "showInfo", func: Helpers.showInfo, args: ["", null] },
	{ desc: "showWarn", func: Helpers.showWarn, args: ["", null] },
	{ desc: "showError", func: Helpers.showError, args: ["", null] },
	{ desc: "showDebug", func: Helpers.showDebug, args: ["", null] },
	{ desc: "showTime", func: Helpers.showTime, args: ["", null] },
	{ desc: "is", func: Helpers.is, args: ["", null] },
	{ desc: "isLen", func: Helpers.isLen, args: ["", null] },
	{ desc: "isLenMin", func: Helpers.isLenMin, args: ["", null] },
	{ desc: "isLenMax", func: Helpers.isLenMax, args: ["", null] },
	{ desc: "isLenRange", func: Helpers.isLenRange, args: ["", null] },
	{ desc: "isExist", func: Helpers.isExist, args: ["", null] },
	{ desc: "isUnd", func: Helpers.isUnd, args: ["", null] },
	{ desc: "isNum", func: Helpers.isNum, args: ["", null] },
	{ desc: "isStr", func: Helpers.isStr, args: ["", null] },
	{ desc: "isFunc", func: Helpers.isFunc, args: ["", null] },
	{ desc: "isBool", func: Helpers.isBool, args: ["", null] },
	{ desc: "isBig", func: Helpers.isBig, args: ["", null] },
	{ desc: "isSym", func: Helpers.isSym, args: ["", null] },
	{ desc: "isArr", func: Helpers.isArr, args: ["", null] },
	{ desc: "isObj", func: Helpers.isObj, args: ["", null] },
	{ desc: "isRxp", func: Helpers.isRxp, args: ["", null] },
	{ desc: "isEqualType", func: Helpers.isEqualType, args: ["", null] },
	{ desc: "isEqualStrict", func: Helpers.isEqualStrict, args: ["", null] },
	{ desc: "isEvery", func: Helpers.isEvery, args: ["", null] },
	{ desc: "isSome", func: Helpers.isSome, args: ["", null] },
	{ desc: "strHumanize", func: Helpers.strHumanize, args: ["", null] },
	{ desc: "strCollapseWhitespace", func: Helpers.strCollapseWhitespace, args: ["", null] },
	{ desc: "strTitleCase", func: Helpers.strTitleCase, args: ["", null] },
	{ desc: "strTrim", func: Helpers.strTrim, args: ["", null] },
	{ desc: "strSay", func: Helpers.strSay, args: ["", null] },
	{ desc: "strThink", func: Helpers.strThink, args: ["", null] },
	{ desc: "strSayRandom", func: Helpers.strSayRandom, args: ["", null] },
	{ desc: "strThinkRandom", func: Helpers.strThinkRandom, args: ["", null] },
	{ desc: "strRainbow", func: Helpers.strRainbow, args: ["", null] },
	{ desc: "strAtlas", func: Helpers.strAtlas, args: ["", null] },
	{ desc: "strInstagram", func: Helpers.strInstagram, args: ["", null] },
	{ desc: "strVice", func: Helpers.strVice, args: ["", null] },
	{ desc: "strTable", func: Helpers.strTable, args: ["", null] },
	{ desc: "strToMaxLen", func: Helpers.strToMaxLen, args: ["", null] },
	{ desc: "strToMinLen", func: Helpers.strToMinLen, args: ["", null] },
	{ desc: "strToMatchLen", func: Helpers.strToMatchLen, args: ["", null] },
	{ desc: "strToTitleCase", func: Helpers.strToTitleCase, args: ["", null] },
	{ desc: "strSplit", func: Helpers.strSplit, args: ["", null] },
	{ desc: "strChars", func: Helpers.strChars, args: ["", null] },
	{ desc: "strWords", func: Helpers.strWords, args: ["", null] },
	{ desc: "strPhrases", func: Helpers.strPhrases, args: ["", null] },
	{ desc: "strLines", func: Helpers.strLines, args: ["", null] },
	{ desc: "strCharsUnical", func: Helpers.strCharsUnical, args: ["", null] },
	{ desc: "strWordsUnical", func: Helpers.strWordsUnical, args: ["", null] },
	{ desc: "strPhrasesUnical", func: Helpers.strPhrasesUnical, args: ["", null] },
	{ desc: "strLinesUnical", func: Helpers.strLinesUnical, args: ["", null] },
	{ desc: "strWordFirst", func: Helpers.strWordFirst, args: ["", null] },
	{ desc: "strWordLast", func: Helpers.strWordLast, args: ["", null] },
	{ desc: "strCharCode", func: Helpers.strCharCode, args: ["", null] },
	{ desc: "strCharFromCode", func: Helpers.strCharFromCode, args: ["", null] },
	{ desc: "strCharCodeMany", func: Helpers.strCharCodeMany, args: ["", null] },
	{ desc: "arrUnical", func: Helpers.arrUnical, args: ["", null] },
	{ desc: "arrLastIndex", func: Helpers.arrLastIndex, args: ["", null] },
	{ desc: "arrFindLast", func: Helpers.arrFindLast, args: ["", null] },
	{ desc: "arrNumbers", func: Helpers.arrNumbers, args: ["", null] },
	{ desc: "arrStrings", func: Helpers.arrStrings, args: ["", null] },
	{ desc: "arrObjects", func: Helpers.arrObjects, args: ["", null] },
	{ desc: "arrFunctions", func: Helpers.arrFunctions, args: ["", null] },
	{ desc: "arrArrays", func: Helpers.arrArrays, args: ["", null] },
	{ desc: "arrFirst", func: Helpers.arrFirst, args: ["", null] },
	{ desc: "arrLast", func: Helpers.arrLast, args: ["", null] },
	{ desc: "arrFindFirst", func: Helpers.arrFindFirst, args: ["", null] },
	{ desc: "arrHasType", func: Helpers.arrHasType, args: ["", null] },
	{ desc: "arrReduceText", func: Helpers.arrReduceText, args: ["", null] },
	{ desc: "arrReduceSum", func: Helpers.arrReduceSum, args: ["", null] },
	{ desc: "arrReduceElements", func: Helpers.arrReduceElements, args: ["", null] },
	{ desc: "arrPhrasesWithWord", func: Helpers.arrPhrasesWithWord, args: ["", null] },
	{ desc: "arrPhrasesWithoutWord", func: Helpers.arrPhrasesWithoutWord, args: ["", null] },
	{ desc: "arrPhrasesEndsWith", func: Helpers.arrPhrasesEndsWith, args: ["", null] },
	{ desc: "arrPhrasesStartsWith", func: Helpers.arrPhrasesStartsWith, args: ["", null] },
	{ desc: "arrPhrasesByLength", func: Helpers.arrPhrasesByLength, args: ["", null] },
	{ desc: "arrSlice", func: Helpers.arrSlice, args: ["", null] },
	{ desc: "arrNeigbours", func: Helpers.arrNeigbours, args: ["", null] },
	{ desc: "arrElementNext", func: Helpers.arrElementNext, args: ["", null] },
	{ desc: "arrElementPrev", func: Helpers.arrElementPrev, args: ["", null] },
	{ desc: "filePath", func: Helpers.filePath, args: ["", null] },
	{ desc: "fileList", func: Helpers.fileList, args: ["", null] },
	{ desc: "fileRead", func: Helpers.fileRead, args: ["", null] },
	{ desc: "fileWrite", func: Helpers.fileWrite, args: ["", null] },
	{ desc: "fileAppend", func: Helpers.fileAppend, args: ["", null] },
	{ desc: "fileCheck", func: Helpers.fileCheck, args: ["", null] },
	{ desc: "fileStats", func: Helpers.fileStats, args: ["", null] },
	{ desc: "fileMkdir", func: Helpers.fileMkdir, args: ["", null] },
	{ desc: "randStr", func: Helpers.randStr, args: ["", null] },
	{ desc: "randBool", func: Helpers.randBool, args: ["", null] },
	{ desc: "randInt", func: Helpers.randInt, args: ["", null] },
	{ desc: "randCoin", func: Helpers.randCoin, args: ["", null] },
	{ desc: "randId", func: Helpers.randId, args: ["", null] },
	{ desc: "randKey", func: Helpers.randKey, args: ["", null] },
	{ desc: "randArr", func: Helpers.randArr, args: ["", null] },
	{ desc: "randObj", func: Helpers.randObj, args: ["", null] },
	{ desc: "randMany", func: Helpers.randMany, args: ["", null] },
	{ desc: "randSort", func: Helpers.randSort, args: ["", null] },
	{ desc: "randIndex", func: Helpers.randIndex, args: ["", null] },
	{ desc: "randElement", func: Helpers.randElement, args: ["", null] },
	{ desc: "randElementsMany", func: Helpers.randElementsMany, args: ["", null] },
	{ desc: "randObjKey", func: Helpers.randObjKey, args: ["", null] },
	{ desc: "randObjValue", func: Helpers.randObjValue, args: ["", null] },
	{ desc: "randObjEntry", func: Helpers.randObjEntry, args: ["", null] },
	{ desc: "randCharCodeLatin", func: Helpers.randCharCodeLatin, args: ["", null] },
	{ desc: "randCharCodeKyrillic", func: Helpers.randCharCodeKyrillic, args: ["", null] },
	{ desc: "randPhraseFromWords", func: Helpers.randPhraseFromWords, args: ["", null] }
].map((src: { desc: S; func: any; args: A }) => {
	const { desc, func, args } = src
	const value = func(...args)
	return { desc, func, args, value }
})
