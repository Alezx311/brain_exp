const path = require("path")
const fs = require("fs")

const filepath = path.join(__dirname, "./book.txt")
const filecontent = fs.readFileSync(filepath, "utf8").toString()

const arrFormat = (arr) =>
	arr
		.map((w) => w.match(/[а-яa-z]+/gim))
		.filter(Boolean)
		.reduce((a, w) => [...a, ...w], [])
		.filter((w) => w.length > 3)

const words = [...new Set([...arrFormat(filecontent.split(" "))])]
const lines = [...new Set([...arrFormat(filecontent.split("\n"))])]

fs.writeFileSync(path.join(__dirname, "./words.txt"), words.join("\n"))
console.log(`${words.length} words was saved`)

fs.writeFileSync(path.join(__dirname, "./lines.txt"), lines.join("\n"))
console.log(`${lines.length} lines was saved`)

fs.writeFileSync(path.join(__dirname, "./values.json"), JSON.stringify({ words, lines }, null, 2))
console.log(`Values was saved`)
