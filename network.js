const brain = require("brain.js")
const Helpers = require("./helpers")

class NetworkHelpers {
	network = null
	name = null

	constructor(name = "network", net = null, opt = { log: true }) {
		this.name = name
		this.opt = opt

		if (!name || name === "network") {
			this.network = net
		} else if (name.toLowerCase() === "lstm") {
			this.network = new brain.recurrent.LSTM()
		} else {
			this.network = new brain.NeuralNetwork()
		}

		this.filename = `${this.name}_${Date.now()}`
		this.fileNetwork = `./network/${this.filename}.json`
		this.fileResults = `./results/${this.filename}.json`
		this.fileTraining = `./training/${this.filename}.json`
		this.fileLogs = `./logs/${this.filename}.log`

		const message = Helpers.toJson({ timestamp: Helpers.timestamp, message: `Network Initialised!` })
		Helpers.fileWrite(this.fileLogs, message)
		console.info(message)
	}

	log(message = "Log Message", values = null) {
		try {
			console.info(message, values)
			const json = Helpers.toJson({ timestamp: Helpers.timestamp, message, values })
			Helpers.fileAppend(this.fileLogs, json)
		} catch (error) {
			console.error(error)
			console.error("Error on logging...")
		}
	}

	save() {
		try {
			const json = JSON.stringify(this.network.toJSON())
			Helpers.fileWrite(this.fileNetwork, json)

			this.log("Network was saved to file")
		} catch (error) {
			this.log("Error on saving network", { error })
		}
	}

	load() {
		try {
			const content = Helpers.readFile(this.fileNetwork)
			const json = JSON.parse(content)
			this.network.fromJSON(this.json)
			this.log({ content, json }, "Loading network from JSON file success")
		} catch (error) {
			this.log({ error }, "Error on parsing network file")
		}
	}

	train(data, options) {
		try {
			const results = this.network.train(data, options)
			this.log("Training network successfully completed", { data, options, results })

			Helpers.fileWrite(this.fileTraining, Helpers.toJson(results))
			this.log("Training results was saved to file", { file: this.fileTraining })

			this.save()
		} catch (error) {
			this.log("Error on training network", { error, data, options })
		}
	}

	run(input) {
		try {
			const result = this.network.run(input)
			this.log("Running network successfully completed", { input, result })

			Helpers.fileWrite(this.fileResults, Helpers.toJson(result))
			this.log("Running result was saved to file", { file: this.fileResults })
		} catch (error) {
			this.log("Error on running network", { error, input })
		}
	}
}

const trainingData = [
	{ input: [1], output: [1] },
	{ input: [0], output: [0] },
	{ input: [1], output: [1] },
	{ input: [0], output: [0] },
	{ input: [1], output: [1] },
	{ input: [0], output: [0] },
	{ input: [1], output: [1] },
	{ input: [0], output: [0] },
	{ input: [1], output: [1] },
	{ input: [0], output: [0] },
	{ input: [1], output: [1] },
	{ input: [0], output: [0] },
	{ input: [1], output: [1] },
	{ input: [0], output: [0] },
	{ input: [1], output: [1] },
	{ input: [0], output: [0] },
	{ input: [1], output: [1] },
	{ input: [0], output: [0] },
	{ input: [1], output: [1] },
	{ input: [0], output: [0] },
	{ input: [1], output: [1] },
	{ input: [0], output: [0] }
]

// Test
const net1 = new NetworkHelpers("LSTM")
net1.train(trainingData)
net1.run([0])
net1.run([1])
net1.run([2])

module.exports = NetworkHelpers
