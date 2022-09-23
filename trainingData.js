const { toMatchLines } = require("./helpersOld")
const Helpers = require("./helpersOld")

class TrainingDataPoetry {
	static TEXT = Helpers.fileRead("./files/poetry.txt").toLowerCase().trim()
	static LINES = Helpers.getLines(this.TEXT)
	static WORDS = Helpers.getWords(this.TEXT)
	static WORDS_UNICAL = Helpers.toUnical(this.WORDS)
	static WORDS_NOT_UNICAL = Helpers.toNotUnical(this.WORDS)
	static WORDS_SEQUENCES = this.WORDS.map((word) => Helpers.getElementsSequence(this.WORDS, word)).filter(
		(v) => v.index > 0
	)

	static DESC = `${Helpers.source} -> TrainingDataPoetry
TEXT length: ${this.TEXT.length}
LINES length: ${this.LINES.length}
WORDS length: ${this.WORDS.length}
WORDS_UNICAL length: ${this.WORDS_UNICAL.length}
WORDS_NOT_UNICAL length: ${this.WORDS_NOT_UNICAL.length}
WORDS_SEQUENCES length: ${this.WORDS_SEQUENCES.length}`

	static JSON = JSON.stringify({
		TEXT: this.TEXT,
		LINES: this.LINES,
		WORDS: this.WORDS,
		WORDS_UNICAL: this.WORDS_UNICAL,
		WORDS_NOT_UNICAL: this.WORDS_NOT_UNICAL,
		WORDS_SEQUENCES: this.WORDS_SEQUENCES,
		DESC: this.DESC
	})

	static get word() {
		return Helpers.genElement(this.WORDS)
	}

	static get line() {
		return Helpers.genElement(this.LINES)
	}

	static get unical() {
		return Helpers.genElement(this.WORDS_UNICAL)
	}

	static get notUnical() {
		return Helpers.genElement(this.WORDS_NOT_UNICAL)
	}

	static get sequence() {
		return Helpers.genElement(this.WORDS_SEQUENCES)
	}

	static get examples() {
		return `${Helpers.source}
		
word: ${this.word}
line: ${this.line}
unical: ${this.unical}
notUnical: ${this.notUnical}
sequence: ${Helpers.jsonCreate(this.sequence)}`
	}

	static data = (size = Helpers.genInt(10000, 500)) => {
		return Helpers.genElementsMany(this.WORDS_SEQUENCES, size).map((seq) => ({ input: seq.word, output: seq.text }))
	}

	static dataGenerate = (size = Helpers.genInt(10000, 500)) => {
		const words = Helpers.genElementsMany(this.WORDS, size)
		const data = words.map((input) => {
			const result = Helpers.getElementsSequence(this.WORDS, input)
			return result.index > 0 ? { input, output: result.text } : false
		})

		return data.filter(Boolean)
	}

	static sequenceUpdate = (word = this.word, size = Helpers.dice6) =>
		Helpers.getElementsSequence(this.WORDS, word, size).text

	static sequenceFind = (word) => this.WORDS_SEQUENCES.find((el) => el.word === word).text
}

module.exports = TrainingDataPoetry
