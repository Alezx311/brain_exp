import { _ARR, _FUNC, _NUM, _OBJ, _STR, _TYPES } from "./values"
import {
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
} from "../helpers"

const BOOL = [true, false]

describe("is", () => {
	it("Is _STR", () => {
		const result = is(_STR)
		expect(result).toBe(true)
	})

	it("Is _NUM", () => {
		const result = is(_NUM)
		expect(result).toBe(true)
	})

	it("Is _ARR", () => {
		const result = is(_ARR)
		expect(result).toBe(true)
	})

	it("Is _OBJ", () => {
		const result = is(_OBJ)
		expect(result).toBe(true)
	})

	it("Is false", () => {
		const result = is(false)
		expect(result).toBe(false)
	})

	it("Is null", () => {
		const result = is(null)
		expect(result).toBe(false)
	})

	it("Is undefined", () => {
		const result = is(undefined)
		expect(result).toBe(false)
	})
})
describe("isLen", () => {
	it("_STR", () => {
		const result = isLen(_STR)
		expect(result).toBe(true)
	})

	it("_STR, 1000", () => {
		const result = isLen(_STR, 1000)
		expect(result).toBe(false)
	})

	it("_NUM", () => {
		const result = isLen(_NUM)
		expect(result).toBe(false)
	})

	it("_ARR", () => {
		const result = isLen(_ARR)
		expect(result).toBe(true)
	})

	it("_ARR, 1000", () => {
		const result = isLen(_ARR, 1000)
		expect(result).toBe(false)
	})

	it("_OBJ", () => {
		const result = isLen(_OBJ)
		expect(result).toBe(false)
	})

	it("null", () => {
		const result = isLen(null)
		expect(result).toBe(false)
	})

	it("undefined", () => {
		const result = isLen(undefined)
		expect(result).toBe(false)
	})
})

describe("Is", () => {
	it("isExist", () => {
		const result = isExist(_STR)
		expect(result).toBeDefined()
	})

	it("isType", () => {
		const result = isType(_STR, _STR)
		expect(result).toBe(true)
	})

	it("isKey", () => {
		const result = isKey(_OBJ, "NUMBER")
		expect(result).toBeDefined()
	})

	it("isFunc", () => {
		const result = isFunc(_FUNC)
		expect(result).toBe(true)
	})

	it("isNum", () => {
		const result = isNum(_NUM)
		expect(result).toBe(true)
	})

	it("isStr", () => {
		const result = isStr(_STR)
		expect(result).toBe(true)
	})

	it("isArr", () => {
		const result = isArr(_ARR)
		expect(result).toBe(true)
	})

	it("isObj", () => {
		const result = isObj(_OBJ)
		expect(result).toBe(true)
	})

	it("isEqual", () => {
		const result = isEqual(_OBJ, Object.assign({}, _OBJ))
		expect(result).toBeDefined()
	})

	it("isNumBetween", () => {
		const result = isNumBetween(_NUM, [_NUM + 1, _NUM - 1])
		expect(result).toBeDefined()
	})
})
