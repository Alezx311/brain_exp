import { _ARR, _STR, _TYPES, _OBJ } from "./values"
import { log, info, warn, error } from "../helpers"

describe("Loggers", () => {
	it("log all types", () => {
		_TYPES.map(({ desc, value }) => {
			log(desc, value, "started")

			log(value)
			info(value)
			warn(value)
			error(value)

			log("Success")
		})
	})

	it("log with many values", () => {
		log("started")

		log(..._ARR)
		info(..._ARR)
		warn(..._ARR)
		error(..._ARR)

		log("Success")
	})

	it("log with object values", () => {
		log("started")

		log(_OBJ)
		info(_OBJ)
		warn(_OBJ)
		error(_OBJ)

		log("Success")
	})
})
