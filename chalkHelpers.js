const util = require("util")
const chalk = require("chalk")
const gradientString = require("gradient-string")

const { random, floor, max: _max, min: _min } = Math
const { log, info, warn, error, table, dir } = console

class Logger {
  static LOGGERS = ["log", "info", "warn", "error", "table", "dir"]
	static isProp = (prop) => typeof prop === "string" && this.LOGGERS.includes(prop)
	static logByType = (value) => {
    if(isArr)
  }
	static propToLogger = (prop) => {
		if (!prop || !this.LOGGERS.includes(prop)) {
			return console.log
		} else {
			return console[prop]
		}
	}
}
const GRADIENTS = [
	"atlas",
	"cristal",
	"teen",
	"mind",
	"morning",
	"vice",
	"passion",
	"fruit",
	"instagram",
	"retro",
	"summer",
	"rainbow",
	"pastel"
]
const COLORS = [
	"blue",
	"red",
	"blue",
	"blue",
	"red",
	"underline",
	"green",
	"blue",
	"red",
	"green",
	"yellow",
	"rgb",
	"hex"
]

const COLOR_INDEX_MAX = COLORS.length - 1
const LOGGER_INDEX_MAX = LOGGERS.length - 1
const GRADIENT_INDEX_MAX = GRADIENTS.length - 1

const randomInt = (...nums) => {
	const max = _max(...nums, 1)
	const min = _min(...nums, 1)
	const result = floor(random() * max - min) + min

	return result
}
const randomLogger = () => {
	const index = randomInt(LOGGERS.length - 1)
	const prop = LOGGERS[index]
	const func = (...args) => console[prop]

	return func
}
const randomColor = () => {
	const index = randomInt(COLORS.length - 1)
	const prop = COLORS[index]
	const func = (...args) => console[prop]

	return func
}
const randomGradient = () => {
	const index = randomInt(GRADIENTS.length - 1)
	const prop = GRADIENTS[index]
	const func = (...args) => console[prop]

	return func
}
const isColor = (color) => COLORS.includes(color)
const indexToColor = (color) => COLORS.includes(color)
// Combine styled and normal strings
log(chalk.blue("Hello") + " World" + chalk.red("!"))

// Compose multiple styles using the chainable API
log(chalk.blue.bgRed.bold("Hello world!"))

// Pass in multiple arguments
log(chalk.blue("Hello", "World!", "Foo", "bar", "biz", "baz"))

// Nest styles
log(chalk.red("Hello", chalk.underline.bgBlue("world") + "!"))

// Nest styles of the same type even (color, underline, background)
log(
	chalk.green("I am a green line " + chalk.blue.underline.bold("with a blue substring") + " that becomes green again!")
)

// ES2015 template literal
log(`
CPU: ${chalk.red("90%")}
RAM: ${chalk.green("40%")}
DISK: ${chalk.yellow("70%")}
`)

// Use RGB colors in terminal emulators that support it.
log(chalk.rgb(123, 45, 67).underline("Underlined reddish color"))
log(chalk.hex("#DEADED").bold("Bold gray!"))
