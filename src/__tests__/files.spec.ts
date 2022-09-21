import { fileAppend, filePath, fileRead, fileWrite, getTimestamp } from "../helpers"
import { _FILE } from "./values"

const filename = _FILE
const filepath = filePath(__dirname, filename)
const filecontent = fileRead(filePath(__dirname, filename))
const timestamp = `\n${getTimestamp()}\n`

describe("FileSystem", () => {
	it("process.cwd()", () => {
		expect(process.cwd()).toBeDefined()
	})

	it("File Path", () => {
		expect(__filename).toBeDefined()
	})

	it("Dir Path", () => {
		expect(__dirname).toBeDefined()
	})

	it("file name", () => {
		expect(filename).toBeDefined()
		expect(filename.length).toBeDefined()
		expect(filename.length).toBeGreaterThan(0)
	})

	it("filePath", () => {
		expect(filepath).toBeDefined()
		expect(filepath.length).toBeDefined()
		expect(filepath.length).toBeGreaterThan(0)
	})

	it("File Content", () => {
		expect(filecontent).toBeDefined()
		expect(filecontent.length).toBeDefined()
		expect(filecontent.length).toBeGreaterThan(0)
	})

	it("File Write", () => {
		fileWrite(filepath, timestamp)
	})

	it("File Append", () => {
		fileAppend(filepath, filecontent)
	})
})
