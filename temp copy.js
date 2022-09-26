const cowsay = require(`cowsay`)
const lolcats = require(`lolcats`)
const S = require(`string`)
const A = require(`arr`)
const O = require(`json-stringify-safe`)

const { print: _print, rainbow: _rainbow } = lolcats
const _json = (...v) => O(v, null, 2)
const _str = (...v) => S(v).s

const { log } = console

const UND = undefined
const NULL = null
const STR = `Some string value`
// const ERR = new Error(STR)
const RND = Math.random()
const NUM = ~~(RND * 1000)
const BLN = RND > 0.5
const ARR = [STR, NUM]
const OBJ = { STR: STR, NUM: NUM }
const SYM = Symbol(`Symbol example`)
const BIG = NUM * RND
const VALUES = [
	{ desc: `UND`, value: UND },
	{ desc: `NULL`, value: NULL },
	{ desc: `STR`, value: STR },
	{ desc: `RND`, value: RND },
	{ desc: `NUM`, value: NUM },
	{ desc: `BLN`, value: BLN },
	{ desc: `ARR`, value: ARR },
	{ desc: `OBJ`, value: OBJ },
	{ desc: `BIG`, value: BIG }
]

const init = (...values) => {
	const text = _json(values.map(S))
	// _log(cowsay.say({ text: "cow say: " + text, r: true }))
	// _log(cowsay.think({ text: "cow think: " + text, r: true }))
	// _print("lolcat: " + text)
	// _log(_rainbow("rainbow: " + text))
	// _print("lolcat + cowsay: " + cowsay.say({ text }))
	// _log(cowsay.say({ text: _print("cowsay + lolcat: " + text) }))
	// _log(cowsay.say({ text: _rainbow(text) }))
}

const test = () =>
	VALUES.map((element) => {
		_log("Next value: " + element?.desc)
		// let el = element
		// let desc = el.desc
		// let json = _json(el)
		// let str = _str(el)
		// let jsonPlain = O(el)
		// let strPlain = S(el).s

		_log("Preparing")
		try {
			desc = `\n\t =====> ${element.desc} DESC <=====\n` + element.desc
			json = `\n\t =====> ${element.desc} JSON <=====\n` + _json(element)
			str = `\n\t =====> ${element.desc} STR <=====\n` + _str(element)
			jsonPlain = `\n\t =====> ${element.desc} JSONPLAIN <=====\n` + O(element)
			strPlain = `\n\t =====> ${element.desc} STRPLAIN <=====\n` + S(element).s

			arr = [desc, json, str]
			arrPlain = [jsonPlain, strPlain]
			arrElement = [element]
		} catch (err) {
			console.error(`Error on preparing _log values for ${element.desc}`)
			console.error(err?.message ?? err)
		}

		_log("Preparing default console _log")
		try {
			// arr.map((v) => _default.log(v))
			_log(...arr)
			// arrPlain.map((v) => _default.log(v))
			// arrElement.map((v) => _default.log(v))
		} catch (err) {
			console.error(`Error on console._log logger with value ${desc}`)
			console.error(err?.message ?? err)
		}

		// _log("Preparing cowsay.say")
		// try {
		// 	arr.map((text) => _default.log(cowsay.say({ text })))
		// 	// arrPlain.map((text) => _default.log(cowsay.say({ text })))
		// 	// arrElement.map((text) => _default.log(cowsay.say({ text })))
		// } catch (err) {
		// 	console.error(`Error on cowsay.say logger with value ${desc}`)
		// 	console.error(err?.message ?? err)
		// }

		// _log("Preparing cowsay.random")
		// try {
		// 	arr.map((text) => _default.log(cowsay.say({ text, r: true })))
		// 	// arrPlain.map((text) => _default.log(cowsay.say({ text })))
		// 	// arrElement.map((text) => _default.log(cowsay.say({ text })))
		// } catch (err) {
		// 	console.error(`Error on cowsay.say logger with value ${desc}`)
		// 	console.error(err?.message ?? err)
		// }

		// _log("Preparing cowsay.think")
		// try {
		// 	arr.map((text) => _default.log(cowsay.think({ text })))
		// 	// arrPlain.map((text) => _default.log(cowsay.think({ text })))
		// 	// arrElement.map((text) => _default.log(cowsay.think({ text })))
		// } catch (err) {
		// 	console.error(`Error on cowsay.think logger with value ${desc}`)
		// 	console.error(err?.message ?? err)
		// }

		// _log("Preparing lolcat.print logger")
		// try {
		// 	arr.map((text) => _print(text))
		// 	// arrPlain.map((text) => _print(text))
		// 	// arrElement.map((text) => _print(text))
		// } catch (err) {
		// 	console.error(`Error on _print logger with value ${desc}`)
		// 	console.error(err?.message ?? err)
		// }

		// _log("Preparing lolcat.rainbow logger")
		// try {
		// 	arr.map((text) => _default.log(_rainbow(text)))
		// 	// arrPlain.map((text) => _default.log(_rainbow(text)))
		// 	// arrElement.map((text) => _default.log(_rainbow(text)))
		// } catch (err) {
		// 	console.error(`Error on _rainbow logger with value ${desc}`)
		// 	console.error(err?.message ?? err)
		// }
	})

// test()

const LoggerConsole = {
	name: "Console logger",
	opt: { colored: false, logger: console.log },
	source: `\n\tName: ${this.name}, Time: ${new Date().toLocaleString()}\n`,
	text: function (v = this.source, opt = this.opt) {
		const text = _json(S(v).s)
		return opt.colored === true ? _rainbow(text) : text
	},
	format: function (v = this.source, opt = this.opt) {
		const text = this.text(v, opt)
		return text
	},
	log: function (v = this.source, opt = this.opt) {
		const data = this.format(v, opt)
		return console.log(data)
	},
	info: function (v = this.source, opt = this.opt) {
		const data = this.format(v, opt)
		return console.info(data)
	},
	warn: function (v = this.source, opt = this.opt) {
		const data = this.format(v, opt)
		return console.warn(data)
	},
	error: function (v = this.source, opt = this.opt) {
		const data = this.format(v, opt)
		return console.error(data)
	},
	trace: function (v = this.source, opt = this.opt) {
		const data = this.format(v, opt)
		return console.trace(data)
	},
	debug: function (v = this.source, opt = this.opt) {
		const data = this.format(v, opt)
		return console.debug(data)
	},
	custom: function (v = this.source, options = this.opt) {
		const { logger, ...opt } = Object.assign({}, this.opt, options)
		const data = this.format(v, opt)
		return logger(data)
	},
	options: function () {
		return this.options
	}
}

LoggerConsole.log("Console log")
LoggerConsole.info("Console info")
LoggerConsole.warn("Console warn")
LoggerConsole.error("Console error")
LoggerConsole.custom(["Console custom", "trace logger"], { logger: console.info })

const LoggerCowsay = {
	...LoggerConsole,
	name: "Cow say logger",
	opt: Object.assign({}, LoggerConsole.opt, { method: cowsay.say }),
	text: function (v = this.source, opt = this.opt) {
		const text = _json(S(v).s)
		return opt.colored === true ? _rainbow(text) : text
	},
	format: function (v = this.source, opt = this.opt) {
		const text = this.text(v, opt)
		return { text, r: opt.random }
	},
	log: function (v = this.source, opt = this.opt) {
		const data = this.format(v, opt)
		return this.opt.logger(this.opt.method(data))
	},
	say: function (v = this.source, opt = this.opt) {
		const data = this.format(v, opt)
		return this.opt.logger(cowsay.say(data))
	},
	think: function (v = this.source, opt = this.opt) {
		const data = this.format(v, opt)
		return this.opt.logger(cowsay.think(data))
	},
	custom: function (v = this.source, options = this.opt) {
		const { logger, method, ...opt } = Object.assign({}, this.opt, options)
		const data = this.format(v, opt)
		return logger(method(data))
	}
}

LoggerCowsay.log("Hello")
LoggerCowsay.say("Is Say message")
LoggerCowsay.think("Is think message", { colored: true })
LoggerCowsay.say("Is rainbow message", { colored: true })
LoggerCowsay.info("Is all methods from default console logger", { colored: false })
LoggerCowsay.say("It can be customised", { random: true, colored: true })
