const { print: lolcat, rainbow } = require(`lolcats`)
const { say, think } = require(`cowsay`)

const O = require(`json-stringify-safe`)
const S = require(`string`)
const A = require(`arr`)

const _str = (...v) => S(v).s
const _json = (...v) => O(v, null, 2)

const LoggerConsole = {
	name: "Console logger",
	source: `\n\tName: ${this.name}, Time: ${new Date().toLocaleString()}\n`,
	opt: { colored: false, logger: console.log },
	text: function (v = this.source, opt = this.opt) {
		const text = _json(_str(v))
		return opt.colored === true ? rainbow(text) : text
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
LoggerConsole.custom(["Console custom", "trace logger"], { logger: console.trace })

const LoggerCowsay = {
	...LoggerConsole,
	name: "Cow say logger",
	opt: { ...LoggerConsole.opt, colored: false, random: false, method: say },
	text: function (v = this.source, opt = this.opt) {
		const text = _json(v)
		return opt.colored === true ? rainbow(text) : text
	},
	format: function (v = this.source, opt = this.opt) {
		const text = this.text(v, opt)
		return opt?.random ? { text, r: opt.random } : { text }
	},
	log: function (v = this.source, opt = this.opt) {
		const data = this.format(v, opt)
		return this.opt.logger(this.opt.method(data))
	},
	say: function (v = this.source, opt = this.opt) {
		const data = this.format(v, opt)
		return this.opt.logger(say(data))
	},
	think: function (v = this.source, opt = this.opt) {
		const data = this.format(v, opt)
		return this.opt.logger(think(data))
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
