const Helpers = require("../helpers")
const { _STR, _ARR, _OBJ, _NUM } = require("./values")

const _KEYS = Object.keys(Helpers)
const _NAMES = Object.getOwnPropertyNames(Helpers)
log({ _KEYS, _NAMES })

describe("Total", () => {
	it("Constants", () => {
		const values = [
			Helpers.FILENAME_OUTPUT,
			Helpers.FILENAME_INPUT,
			Helpers.FILENAME_LOG,
			Helpers.PATH_FILES,
			Helpers.PATH_RESULTS,
			Helpers.PATH_NETWORKS,
			Helpers.PATH_TRAINING,
			Helpers.CONTENT_FILES,
			Helpers.CONTENT_RESULTS,
			Helpers.CONTENT_NETWORKS,
			Helpers.CONTENT_TRAINING,
			Helpers.PATH_OUTPUT,
			Helpers.PATH_INPUT,
			Helpers.PATH_LOG,
			Helpers.LINE,
			Helpers.TAB,
			Helpers.SPACE,
			Helpers.COMMA,
			Helpers.DOT,
			Helpers.DIV,
			Helpers.CHARS_NUM,
			Helpers.CHARS_ENG,
			Helpers.CHARS_RUS,
			Helpers.CHARS_SPECIAL,
			Helpers.CHARS_LETTERS,
			Helpers.CHARS_VALID,
			Helpers.DIV_LINE,
			Helpers.DIV_TITLE,
			Helpers.MIN,
			Helpers.MAX,
			Helpers.RANGE,
			Helpers.ARRAY_SIZE,
			Helpers.LIKE_DIFF,
			Helpers.MIN_LENGTH,
			Helpers.MAX_LENGTH,
			Helpers.VALUES_FALSY,
			Helpers.INPUT_SIZE,
			Helpers.HIDDEN_SIZE,
			Helpers.OUTPUT_SIZE,
			Helpers.TRAIN_SET_SIZE,
			Helpers.LEARNING_RATE,
			Helpers.OPTIONS_FS,
			Helpers.OPTIONS_BRAIN_LSTM,
			Helpers.OPTIONS_BRAIN_TRAIN
		]

		values.map((value) => {
			expect(value).toBeDefined()
		})
	})

	it("Simple", () => {
		const values = [
			Helpers.gen(),
			Helpers.genBool(),
			Helpers.genInt(),
			Helpers.genCoin(),
			Helpers.genId(),
			Helpers.genKey(),
			Helpers.genArr(3),
			Helpers.genMany(3),
			Helpers.genIndex(_ARR),
			Helpers.genElement(_ARR),
			Helpers.genElementsMany(_ARR),
			Helpers.genObjKey(_OBJ),
			Helpers.genObjValue(_OBJ),
			Helpers.genObjEntry(_OBJ),
			Helpers.is(_STR),
			Helpers.is(_STR),
			Helpers.isEqualType(_STR),
			Helpers.isLenMin(_STR),
			Helpers.isKey(_STR),
			Helpers.isFunc(_STR),
			Helpers.isNum(_STR),
			Helpers.isStr(_STR),
			Helpers.isArr(_STR),
			Helpers.isObj(_STR),
			Helpers.isEqual(_STR, _STR),
			Helpers.isNumBetween(_NUM, [0, 1000000]),
			Helpers.getIndexLast(_ARR),
			Helpers.getElementLast(_ARR),
			Helpers.getSplitted(_STR),
			Helpers.getChars(_STR),
			Helpers.getWords(_STR),
			Helpers.getPhrases(_STR),
			Helpers.getLines(_STR),
			Helpers.getWordFirst(_STR),
			Helpers.getWordLast(_STR),
			Helpers.reduceText(_ARR),
			Helpers.reduceSum(_ARR),
			Helpers.reduceMult(_ARR),
			Helpers.reduceObj(_ARR),
			Helpers.toArr(_OBJ),
			Helpers.toObj(_STR),
			Helpers.toText(_OBJ),
			Helpers.toKeys(_OBJ)
		]

		values.map((value) => {
			expect(value).toBeDefined()
		})
	})
})
