// const RXP = new RegExp("(\\B\\W+\\B)", "gim")
const TEXT = `Представить счастливо себе
Что некто есть еще на свете
Кто думает и о тебе
Челнок ко брегу приплывает
Из темной хаты выбегает
Младая дева стройный стан
Власы небрежно распущенны
Улыбка тихий взор очей
И грудь и плечи обнаженны
Всё мило всё пленяет в ней
И вот они обняв друг друга
Для них с любовью настает
Но в изумленьи молчаливом
Кого же в рыбаке счастливом`
const RXP_CHARS_LETTERS = "а-яa-z0-9"
const RXP_CHARS_SPECIAL = "s\t\n,."
const RXP_CHARS_VALID = `${RXP_CHARS_LETTERS}${RXP_CHARS_SPECIAL}`
const RXP_CUTE = new RegExp(`[^${RXP_CHARS_VALID}]`, "gim")
const RXP_WORD = new RegExp(`[${RXP_CHARS_LETTERS}]+`, `gim`)
const RXP_VALID = new RegExp(`[${RXP_CHARS_LETTERS}]+`, `gim`)
const getUnical = (arr) => [...new Set([...(arr || [])])]
const isLength = (s, min = 1) => typeof s === "string" && s.length >= min
const cute = (s, min = 1) => isLength(s, min) && s.replace(/[^а-яa-z0-9\s\t\n\,\.]/gim, "").trim()

class Chars {
	static CHARS_INVALID = [`\s`, `\n`, `\t`, `\,`, `\.`]
	static CHARS_ALPHABET_ENG = "abcdefghijklmnopqrstuvwxyz".split("")
	static CHARS_ALPHABET_RUS = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя".split("")
	static CHARS_ALPHABET = [...this.CHARS_ALPHABET_ENG, ...this.CHARS_ALPHABET_RUS]
	static CHARS_VALID = [...this.CHARS_ALPHABET, ...this.CHARS_SPECIAL]

	static is = (s1, min = 3) => typeof s1 === "string" && s1.trim().length >= min
	static has = (s1 = "", s2 = "") => s1.includes(s2)
	static join = (chars, div = "") => chars.join(div)
	static getRxp = (chars = this.CHARS_VALID, flags = "gim") => new RegExp(this.join(chars, "|"), flags)
	static getRxpOnly = (chars = this.CHARS_VALID, flags = "gim") => this.getRxp(`[${this.join(chars, "")}]`, flags)
	static getRxpExcept = (chars = this.CHARS_VALID, flags = "gim") => this.getRxp(`[^${this.join(chars, "")}]`, flags)
	static RXP_CHARS_VALID = this.getRxp(`[${this.CHARS_VALID.join("")}]`)
	static RXP_CHARS_NOT_VALID = this.getRxp(`[^${this.CHARS_VALID.join("")}]`, "gim")
	// static getRxp = (chars) => new RegExp(`[${chars.join("")}]+`, "gim")
	static getChars = (s, chars = this.CHARS_VALID) => s.match(this.getRxp(chars))
	static replaceChars = (s, chars = this.CHARS_VALID, replacer = "") => s.replace(this.getRxp(chars), replacer)
	static RXP_NOT_CHAR = new RegExp(`[^${this.ALPHABET}]`, "gim")
	static RXP_CHAR_MANY = new RegExp(`[${this.ALPHABET}]+`, "gim")
	static replaceNotChars = (s, additional = "s\n\t,.") => s.replace(this.RXP_NOT_CHAR, "")
}
const isChar = (s) => typeof s === "string" && ALPHABET.includes(s.toLowerCase())
const Chars = getUnical(TEXT.split(""))
const Words = getUnical(TEXT.match(/[а-яa-z0-9]+/gim).map(cute, 3))
const Phrases = getUnical(TEXT.match(/\B.+.|\n/gim).map(cute, 10))

console.log({
	Words,
	Chars,
	Phrases
})
