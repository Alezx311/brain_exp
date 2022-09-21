import { filePath, fileRead, getLines, getWords, toUnical } from "./helpers"

const FILENAME = "book.txt"
const FILEPATH = filePath(FILENAME)
const FILECONTENT = fileRead(FILEPATH)
if (!FILECONTENT) {
	throw new Error("File not found")
}

const FILE_NETWORK = "./network/words.json"
const FILE_RESULTS = "./results/words.json"

const LINES = toUnical(getLines(FILECONTENT))
const WORDS = toUnical(getWords(FILECONTENT))

//? Input is word, output is line with this word
const WORDS_TRAIN = WORDS.map((word) => ({ input: word, output: LINES.find((l) => l.includes(word)) }))
