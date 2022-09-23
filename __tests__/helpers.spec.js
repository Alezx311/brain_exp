const Helpers = require("../helpers")

const RESULTS = [
	{ desc: "FUNC", result: Helpers.FUNC("Test log message") },
	{ desc: "_logExamples", result: Helpers._logExamples("Test log message") },
	{ desc: "is", result: Helpers.is() },
	{ desc: "isTypeStr", result: Helpers.isTypeStr() },
	{ desc: "isTypeNum", result: Helpers.isTypeNum() },
	{ desc: "isTypeFunc", result: Helpers.isTypeFunc() },
	{ desc: "isTypeObj", result: Helpers.isTypeObj() },
	{ desc: "isTypeBool", result: Helpers.isTypeBool() },
	{ desc: "isTypeBig", result: Helpers.isTypeBig() },
	{ desc: "isTypeSym", result: Helpers.isTypeSym() },
	{ desc: "isTypeUnd", result: Helpers.isTypeUnd() },
	{ desc: "isLen", result: Helpers.isLen() },
	{ desc: "isDefined", result: Helpers.isDefined() },
	{ desc: "isTypeObjTruthy", result: Helpers.isTypeObjTruthy() },
	{ desc: "isTypeOfValue", result: Helpers.isTypeOfValue() },
	{ desc: "toTypeOf", result: Helpers.toTypeOf() },
	{ desc: "isType", result: Helpers.isType() },
	{ desc: "isEvery", result: Helpers.isEvery() },
	{ desc: "isSome", result: Helpers.isSome() },
	{ desc: "getTimeStamp", result: Helpers.getTimeStamp() },
	{ desc: "getSource", result: Helpers.getSource() },
	{ desc: "toMaxLen", result: Helpers.toMaxLen() },
	{ desc: "toMinLen", result: Helpers.toMinLen() },
	{ desc: "toMatchLen", result: Helpers.toMatchLen() },
	{ desc: "toCharCode", result: Helpers.toCharCode() },
	{ desc: "toCharFromCode", result: Helpers.toCharFromCode() },
	{ desc: "toCharCodeFromText", result: Helpers.toCharCodeFromText() },
	{ desc: "filePath", result: Helpers.filePath() },
	{ desc: "fileList", result: Helpers.fileList() },
	{ desc: "genBool", result: Helpers.genBool() },
	{ desc: "gen", result: Helpers.gen() },
	{ desc: "genInt", result: Helpers.genInt() },
	{ desc: "genCoin", result: Helpers.genCoin() },
	{ desc: "genId", result: Helpers.genId() },
	{ desc: "genKey", result: Helpers.genKey() },
	{ desc: "genArr", result: Helpers.genArr() },
	{ desc: "genMany", result: Helpers.genMany() },
	{ desc: "genSort", result: Helpers.genSort() },
	{ desc: "genIndex", result: Helpers.genIndex() },
	{ desc: "genElement", result: Helpers.genElement() },
	{ desc: "genElementsMany", result: Helpers.genElementsMany() },
	{ desc: "genObjKey", result: Helpers.genObjKey() },
	{ desc: "genObjValue", result: Helpers.genObjValue() },
	{ desc: "genObjEntry", result: Helpers.genObjEntry() },
	{ desc: "genChar", result: Helpers.genChar() },
	{ desc: "genCharLatin", result: Helpers.genCharLatin() },
	{ desc: "genCharKyrillic", result: Helpers.genCharKyrillic() },
	{ desc: "genCharCode", result: Helpers.genCharCode() },
	{ desc: "genCharCodeLatin", result: Helpers.genCharCodeLatin() },
	{ desc: "genCharCodeKyrillic", result: Helpers.genCharCodeKyrillic() },
	{ desc: "genRgb", result: Helpers.genRgb("ffffff") },
	{ desc: "isRxp", result: Helpers.isRxp() },
	{ desc: "toCallback", result: Helpers.toCallback() },
	{ desc: "toLen", result: Helpers.toLen() },
	{ desc: "isLenMin", result: Helpers.isLenMin() },
	{ desc: "isLenMax", result: Helpers.isLenMax() },
	{ desc: "isLenEqual", result: Helpers.isLenEqual() },
	{ desc: "isLenRange", result: Helpers.isLenRange() },
	{ desc: "isNum", result: Helpers.isNum() },
	{ desc: "isStr", result: Helpers.isStr() },
	{ desc: "isArr", result: Helpers.isArr() },
	{ desc: "isObj", result: Helpers.isObj() },
	{ desc: "isCharLatin", result: Helpers.isCharLatin() },
	{ desc: "isCharKyrrylic", result: Helpers.isCharKyrrylic() },
	{ desc: "isCharNum", result: Helpers.isCharNum() },
	{ desc: "isCharSpecial", result: Helpers.isCharSpecial() },
	{ desc: "isCharValid", result: Helpers.isCharValid() },
	{ desc: "isNumLike", result: Helpers.isNumLike() },
	{ desc: "filterStr", result: Helpers.filterStr() },
	{ desc: "filterNum", result: Helpers.filterNum() },
	{ desc: "filterArr", result: Helpers.filterArr() },
	{ desc: "filterBool", result: Helpers.filterBool() },
	{ desc: "filterFunc", result: Helpers.filterFunc() },
	{ desc: "or", result: Helpers.or() },
	{ desc: "and", result: Helpers.and() },
	{ desc: "like", result: Helpers.like() },
	{ desc: "not", result: Helpers.not() },
	{ desc: "getIndexLast", result: Helpers.getIndexLast() },
	{ desc: "getElementLast", result: Helpers.getElementLast() },
	{ desc: "getSlice", result: Helpers.getSlice() },
	{ desc: "getElementNeighbours", result: Helpers.getElementNeighbours() },
	{ desc: "getElementNext", result: Helpers.getElementNext() },
	{ desc: "getSplitted", result: Helpers.getSplitted() },
	{ desc: "getChars", result: Helpers.getChars() },
	{ desc: "getWords", result: Helpers.getWords() },
	{ desc: "getPhrases", result: Helpers.getPhrases() },
	{ desc: "getLines", result: Helpers.getLines() },
	{ desc: "getWordFirst", result: Helpers.getWordFirst(Helpers.STR) },
	{ desc: "getWordLast", result: Helpers.getWordLast(Helpers.STR) },
	{ desc: "genPhraseFromWords", result: Helpers.genPhraseFromWords() },
	{ desc: "getPhrasesWithWord", result: Helpers.getPhrasesWithWord() },
	{ desc: "getPhrasesWithoutWord", result: Helpers.getPhrasesWithoutWord() },
	{ desc: "getPhrasesEndsWith", result: Helpers.getPhrasesEndsWith() },
	{ desc: "getPhrasesStartsWith", result: Helpers.getPhrasesStartsWith() },
	{ desc: "getPhrasesByLength", result: Helpers.getPhrasesByLength() },
	{ desc: "getPhrasesByIndex", result: Helpers.getPhrasesByIndex() },
	{ desc: "reduceText", result: Helpers.ARR.reduce(Helpers.reduceText) },
	{ desc: "reduceSum", result: Helpers.ARR.reduce(Helpers.reduceSum) },
	{ desc: "reduceMult", result: Helpers.ARR.reduce(Helpers.reduceMult) },
	{ desc: "reduceObj", result: Helpers.ARR.reduce(Helpers.reduceObj) },
	{ desc: "reducePropValue", result: Helpers.VALUES_SOURCES.reduce(Helpers.reducePropValue, []) },
	{ desc: "reducePropDesc", result: Helpers.VALUES_SOURCES.reduce(Helpers.reducePropDesc, []) },
	{ desc: "reduceElementStats", result: Helpers.VALUES_SOURCES.reduce(Helpers.reduceElementStats, []) },
	{ desc: "reduceElementKeys", result: Helpers.VALUES_SOURCES.reduce(Helpers.reduceElementKeys, []) },
	{ desc: "reduceElementValues", result: Helpers.VALUES_SOURCES.reduce(Helpers.reduceElementValues, []) },
	{ desc: "reduceElementEntries", result: Helpers.VALUES_SOURCES.reduce(Helpers.reduceElementEntries, []) },
	{ desc: "toArr", result: Helpers.toArr() },
	{ desc: "toObj", result: Helpers.toObj() },
	{ desc: "toText", result: Helpers.toText() },
	{ desc: "toKeys", result: Helpers.toKeys() },
	{ desc: "toNumDiff", result: Helpers.toNumDiff() },
	{ desc: "toNumRange", result: Helpers.toNumRange() },
	{ desc: "toTrim", result: Helpers.toTrim() },
	{ desc: "toTrimLine", result: Helpers.toTrimLine() },
	{ desc: "toUnical", result: Helpers.toUnical() },
	{ desc: "toJoin", result: Helpers.toJoin() },
	{ desc: "toRepeat", result: Helpers.toRepeat() },
	{ desc: "toReversed", result: Helpers.toReversed() },
	{ desc: "toBuffer", result: Helpers.toBuffer() },
	{ desc: "toFloatFixed", result: Helpers.toFloatFixed() },
	{ desc: "toTrainingData", result: Helpers.toTrainingData() },
	{ desc: "toFormatted", result: Helpers.toFormatted() },
	{ desc: "toPercent", result: Helpers.toPercent() },
	{ desc: "toResultStats", result: Helpers.toResultStats() },
	{ desc: "toResultProps", result: Helpers.toResultProps() },
	{ desc: "toTitleCase", result: Helpers.toTitleCase() },
	{ desc: "jsonParse", result: Helpers.jsonParse() },
	{ desc: "jsonCreate", result: Helpers.jsonCreate() },
	{ desc: "toAverage", result: Helpers.toAverage() },
	{ desc: "toRxp", result: Helpers.toRxp() },
	{ desc: "toRxpNext", result: Helpers.toRxpNext() },
	{ desc: "toMatchWordFirst", result: Helpers.toMatchWordFirst() },
	{ desc: "toMatchWordLast", result: Helpers.toMatchWordLast() },
	{ desc: "toMatchLineWithWord", result: Helpers.toMatchLineWithWord() },
	{ desc: "toMatchChars", result: Helpers.toMatchChars() },
	{ desc: "toMatchWords", result: Helpers.toMatchWords() },
	{ desc: "toMatchPhrases", result: Helpers.toMatchPhrases() },
	{ desc: "toMatchLines", result: Helpers.toMatchLines() },
	{ desc: "toMatchDividered", result: Helpers.toMatchDividered() },
	{ desc: "toMatchNextWords", result: Helpers.toMatchNextWords() },
	{ desc: "toArrValues", result: Helpers.toArrValues() },
	{ desc: "toNotUnical", result: Helpers.toNotUnical() },
	{ desc: "replaceManyChars", result: Helpers.replaceManyChars() },
	{ desc: "replaceChars", result: Helpers.replaceChars() },
	{ desc: "getIndex", result: Helpers.getIndex() },
	{ desc: "getIndexAll", result: Helpers.getIndexAll() },
	{ desc: "getMatch", result: Helpers.getMatch() },
	{ desc: "getMatchAll", result: Helpers.getMatchAll() },
	{ desc: "getElementsSequence", result: Helpers.getElementsSequence() },
	{ desc: "msToTimeDesc", result: Helpers.msToTimeDesc() },
	{ desc: "toFixed", result: Helpers.toFixed() },
	{ desc: "sliceToSize", result: Helpers.sliceToSize() },
	{ desc: "encode", result: Helpers.encode() },
	{ desc: "decode", result: Helpers.decode() },
	{ desc: "isStrEqual", result: Helpers.isStrEqual() },
	{ desc: "isLineBreak", result: Helpers.isLineBreak() },
	{ desc: "isSharp", result: Helpers.isSharp() },
	{ desc: "isSpace", result: Helpers.isSpace() },
	{ desc: "isStar", result: Helpers.isStar() },
	{ desc: "character", result: Helpers.character() },
	{ desc: "_toObj", result: Helpers._toObj() },
	{ desc: "_toArr", result: Helpers._toArr() },
	{ desc: "_toStr", result: Helpers._toStr() }
]
const SUMMARY = Object.keys(Helpers)
	.filter((k) => k !== "UND")
	.map((desc, index) => {
		const value = Helpers?.[desc]
		const finded = RESULTS.find((el) => el.desc === desc)
		return { index, desc, value, type: typeof value, result: finded?.result ?? "Unknown" }
	})

describe("Helpers summary", () => {
	SUMMARY.map((v) => {
		it(v.desc, () => {
			expect(v.index).toBeDefined()
			expect(v.desc).toBeDefined()
			expect(v.value).toBeDefined()
			expect(v.type).toBeDefined()
			expect(v.result).toBeDefined()
			expect(Helpers).toHaveProperty(v.desc)
		})
	})
})

describe("Helpers constants", () => {
	SUMMARY.filter((v) => v.type !== "function").map((v) => {
		it(v.desc, () => {
			expect(v.desc).toBeDefined()
			expect(v.value).toBeDefined()
			expect(v.type).toBeDefined()
			expect(v.desc).toBeDefined()
			expect(v.value).toBeDefined()
			expect(v.result).toBeDefined()
			expect(v.index).toBeDefined()
			expect(Helpers).toHaveProperty(v.desc)
		})
	})
})

describe("Helpers functions", () => {
	SUMMARY.filter((v) => v.type === "function").map((v) => {
		it(v.desc, () => {
			expect(v.index).toBeDefined()
			expect(v.type).toBeDefined()
			expect(v.desc).toBeDefined()
			expect(v.value).toBeDefined()
			expect(v.result).toBeDefined()
			expect(Helpers).toHaveProperty(v.desc)
		})
	})
})
