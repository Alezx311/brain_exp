import {
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
	genIndex,
	genElement,
	genElementsMany,
	genObjName,
	genObjKey,
	genObjValue,
	genObjEntry,
	genSort,
	_random
} from "../helpers"
import { _ARR, _NUM, _OBJ, _SIZE } from "./values"

describe("Generators", () => {
	it("gen", () => {
		const result = gen()
		expect(result).toBeDefined()
		expect(result).toBeGreaterThan(0)
	})

	it("genBool", () => {
		const result = genBool()
		expect(result).toBeDefined()
	})

	it("genInt", () => {
		const result = genInt()
		expect(result).toBeDefined()
		expect(result).toBeGreaterThan(0)
	})

	it("genCoin", () => {
		const result = genCoin(1, 2)
		expect(result).toBeDefined()
		expect([1, 2]).toContain(0)
	})

	it("genId", () => {
		const result = genId()
		expect(result).toBeDefined()
		expect(result.length).toBeGreaterThan(0)
	})

	it("genDice", () => {
		const result = genDice()
		expect(result).toBeDefined()
		expect(result).toBeGreaterThan(0)
		expect(result).toBeLessThan(1000000)
	})

	it("genDice6", () => {
		const result = genDice6()
		expect(result).toBeDefined()
		expect(result).toBeGreaterThan(0)
		expect(result).toBeLessThan(7)
	})

	it("genDice21", () => {
		const result = genDice21()
		expect(result).toBeDefined()
		expect(result).toBeGreaterThan(0)
		expect(result).toBeLessThan(22)
	})

	it("genDice100", () => {
		const result = genDice100()
		expect(result).toBeDefined()
		expect(result).toBeGreaterThan(0)
		expect(result).toBeLessThan(101)
	})

	it("genKey", () => {
		const result = genKey()
		expect(result).toBeDefined()
		expect(result.length).toBeGreaterThan(0)
	})

	it("genArr", () => {
		const result = genArr(_SIZE)
		expect(result).toBeDefined()
		expect(result.length).toBeGreaterThan(0)
	})

	it("genMany", () => {
		const result = genMany(_SIZE, () => _random)
		expect(result).toBeDefined()
		expect(result.length).toBeGreaterThan(0)
	})

	it("genSort", () => {
		const result = _ARR.sort(genSort)
		expect(result).not.toEqual(_ARR)
	})

	it("genIndex", () => {
		const result = genIndex(_ARR)
		expect(result).toBeDefined()
		expect(result).toBeLessThanOrEqual(_ARR.length)
	})

	it("genElement", () => {
		const result = genElement(_ARR)
		expect(result).toBeDefined()
		expect(_ARR).toContain(result)
	})

	it("genElementsMany", () => {
		const result = genElementsMany(_ARR, _SIZE)
		expect(result).toBeDefined()
		expect(result.length).toBeGreaterThan(0)
	})

	it("genObjName", () => {
		const result = genObjName(_OBJ)
		expect(result).toBeDefined()
	})

	it("genObjKey", () => {
		const result = genObjKey(_OBJ)
		expect(result).toBeDefined()
	})

	it("genObjValue", () => {
		const result = genObjValue(_OBJ)
		expect(result).toBeDefined()
	})

	it("genObjEntry", () => {
		const result = genObjEntry(_OBJ)
		expect(result).toBeDefined()
	})
})
