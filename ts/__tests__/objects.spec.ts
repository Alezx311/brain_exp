import { objKeys, objValues, objEntries, objAssign, objNames, objDescriptors, objFrom } from "../helpers"
import { _OBJ } from "./values"

const VALUE = _OBJ
const _KEYS = [...Object.keys(_OBJ)]
const _VALUES = [...Object.values(_OBJ)]
const _ENTRIES = [...Object.entries(_OBJ)]

describe("Objects", () => {
	it("objKeys", () => {
		const result = objKeys(VALUE)
		expect(result).toBeDefined()
		expect(_KEYS).toEqual(result)
	})

	it("objValues", () => {
		const result = objValues(VALUE)
		expect(result).toBeDefined()
		expect(_VALUES).toEqual(result)
	})

	it("objEntries", () => {
		const result = objEntries(VALUE)
		expect(result).toBeDefined()
		expect(_ENTRIES).toEqual(result)
	})

	it("objAssign", () => {
		const result = objAssign(VALUE, { key: 42 })
		expect(result).toBeDefined()
		expect(result).toHaveProperty("propKey")
	})

	it("objNames", () => {
		const result = objNames(VALUE)
		expect(result).toBeDefined()
		expect(_KEYS).toEqual(result)
	})

	it("objDescriptors", () => {
		const result = objDescriptors(VALUE)
		expect(result).toBeDefined()
	})

	it("objFrom", () => {
		const result = objFrom(_ENTRIES)
		expect(result).toBeDefined()
		expect(result).toEqual(_OBJ)
	})
})
