const brain = require("brain.js")
const { timestamp, fileRead, fileWrite, msToTimeDesc } = require("./helpers")

const { random: _random } = Math
const { now: _now } = performance
const { info: _info } = console
const ERROR_INVALID_VALUE = new Error("Invalid values")

class NetworkHelpersBasic {
	static FILE_NETWORK = "./networks/basic.json"
	static FILE_RESULTS = "./results/basic.json"

	static NET_NEURAL = new brain.NeuralNetwork()
	static NET_LSTM = new brain.recurrent.LSTM()
	static NET_RNN = new brain.recurrent.RNN()
	static NET = this.NET_NEURAL

	static netToJson = () => JSON.stringify(this.NET.toJSON())
	static netFromJson = (json) => JSON.parse(this.NET.fromJSON(json))
	static save = () => fileWrite(this.FILE_NETWORK, this.netToJson())
	static load = () => this.netFromJson(fileRead(this.FILE_NETWORK))
	static train = (data, opt) => this.NET.train(data, opt)
	static run = (input) => this.NET.run(input)
	static forecast = (data, size = 3) => this.NET.forecast(data, size)
}
class NetworkHelpers extends NetworkHelpersBasic {
	static RESULTS_DIR = "./results/generated/"
	static NETWORK_DIR = "./networks/generated/"
	static RESULTS_TRAINING_DIR = "./results/generated/training/"

	static NOW = Date.now()
	static CREATED_AT = timestamp
	static SIZE = 10000
	static MAGIC = _random()
	static CHANCE = 0.8

	static _mult = (x = 0, y = 0) => x * y
	static _sum = (x = 0, y = 0) => x + y
	static _sub = (x = 0, y = 0) => Math.max(x, y) - Math.min(x, y)
	static _div = (x = 0, y = 0) => Math.max(x, y) / Math.min(x, y)
	static _average = (x = 0, y = 0) => (x + y) / 2
	static _bool = (x = 0, y = 0) => (x + y > this.CHANCE ? 1 : 0)
	static _xor = (x = 0, y = 0) => (x !== y ? 1 : 0)
	static _xand = (x = 0, y = 0) => (x === y ? 1 : 0)
	static _values = (x = 0, y = 0) => ({
		x,
		y,
		mult: this._mult(x, y),
		sum: this._sum(x, y),
		sub: this._sub(x, y),
		div: this._div(x, y),
		bool: this._bool(x, y),
		average: this._average(x, y),
		xor: this._xor(x, y),
		xand: this._xand(x, y)
	})
	static DATA_ARRAY = Array(this.SIZE).fill(1)

	static DATA = this.DATA_ARRAY.map((v, index) => {
		const x = _random()
		const y = _random()
		const values = this._values(x, y)
		return { ...values, index, input: [x, y], output: [values.sum] }
	})
	static DATA_MULT = this.DATA.map((v) => ({ ...v, output: [v.mult] }))
	static DATA_SUM = this.DATA.map((v) => ({ ...v, output: [v.sum] }))
	static DATA_SUB = this.DATA.map((v) => ({ ...v, output: [v.sub] }))
	static DATA_DIV = this.DATA.map((v) => ({ ...v, output: [v.div] }))
	static DATA_BOOL = this.DATA.map((v) => ({ ...v, output: [v.bool] }))
	static DATA_AVERAGE = this.DATA.map((v) => ({ ...v, output: [v.average] }))
	static DATA_XOR = this.DATA.map((v) => ({ ...v, output: [v.xor] }))
	static DATA_XAND = this.DATA.map((v) => ({ ...v, output: [v.xand] }))

	static TYPE = "neural"
	static NAME = "Network"
	static CALLBACK = _info
	static ITERATIONS = 10000
	static LEARNING_RATE = 0.1
	static INTERVAL = 10

	static OPT_CREATE = { log: true, callback: this.CALLBACK }
	static OPT_TRAIN = {
		...this.OPT_CREATE,
		learningRate: this.LEARNING_RATE,
		iterations: this.ITERATIONS,
		interval: this.INTERVAL
	}
	static OPT = { type: this.TYPE, name: this.NAME, opt: this.OPT_CREATE, data: this.DATA, isTrained: false }

	static netName = (name) => `${name}_${Date.now()}`
	static netOptions = (values = this.OPT) => Object.assign({}, this.OPT, values)
	static netValues = (values = this.OPT) => {
		const { net = null, ...rest } = { ...this.OPT, ...values }

		if (!net) {
			return this.netCreate(values)
		}

		return { ...rest, net }
	}

	//? Create network
	static netCreate = (values = this.OPT) => {
		const name = this.netName(values?.name ?? type)
		const { type, data, opt = this.OPT_CREATE, ...rest } = this.netValues({ net: true, ...values })
		if (!type || !name || !data) {
			throw ERROR_INVALID_VALUE
		}

		const TIMESTAMP_START = timestamp
		const TIME_START = _now()
		let net = null

		_info(`${name} create started`)
		if (type.toLowerCase() === "lstm") {
			net = new brain.recurrent.LSTM(opt)
		} else {
			net = new brain.NeuralNetwork(opt)
		}
		_info(`${name} created successfully`)

		const msg = `
Network name: ${name}
Created on: ${msToTimeDesc(TIME_START - _now())}
Time start: ${TIMESTAMP_START}
Time end: ${timestamp}`
		_info(msg)

		return { ...rest, msg, type, net, name, data, opt }
	}

	//? Train network
	static netTrain = (values) => {
		const { net, name, data, opt, ...rest } = this.netValues({
			...values,
			opt: this.OPT_TRAIN
		})

		if (!net || !name || !data) {
			throw ERROR_INVALID_VALUE
		}

		const TIMESTAMP_START = timestamp
		const TIME_START = _now()

		const NETWORK_FILE = this.NETWORK_DIR + `${name}.json`
		const TRAINING_RESULTS_FILE = this.RESULTS_TRAINING_DIR + `${name}.json`

		this.CALLBACK(`${name} Training started`)
		const trainResults = net.train(data, opt)
		const TIME_TRAINING = _now()
		this.CALLBACK(`${name} Training success`)

		this.CALLBACK(`${name} saving started...`)
		const json = JSON.stringify(net.toJSON(), null, 2)
		fileWrite(NETWORK_FILE, json)
		this.CALLBACK(`${name} saved success`)

		this.CALLBACK(`${name} saving started...`)
		const resultsJson = JSON.stringify(trainResults, null, 2)
		fileWrite(TRAINING_RESULTS_FILE, resultsJson)
		const TIME_SAVING = _now()
		this.CALLBACK(`${name} saved success`)

		const msg = `
    Network name: ${name}
    Start Time: ${TIMESTAMP_START}
    Network file: ${NETWORK_FILE}
    Training results file: ${TRAINING_RESULTS_FILE}
    Training data length: ${data.length}
    Training results length: ${trainResults.length}
    Trained on ${msToTimeDesc(TIME_START - TIME_TRAINING)}
    Taved on ${msToTimeDesc(TIME_TRAINING - TIME_SAVING)}
    End Time: ${timestamp}`
		_info(msg)

		return { ...rest, msg, net, name, data, opt, isTrained: true }
	}

	//? Run network
	static netRun = (values) => {
		const { net, name, data, isTrained = false, ...rest } = this.netValues(values)
		if (!net || !name || !data) {
			throw ERROR_INVALID_VALUE
		}

		const TIMESTAMP_START = timestamp
		const TIME_START = _now()

		const NETWORK_FILE = this.NETWORK_DIR + `${name}.json`
		const RESULTS_FILE = this.RESULTS_DIR + `${name}.json`

		this.CALLBACK(`${name} Loading...`)
		net.fromJSON(JSON.parse(fileRead(NETWORK_FILE)))
		const TIME_LOADING = _now()
		this.CALLBACK(`${name} Loading success`)

		this.CALLBACK(`${name} results started...`)
		const results = data.map((v) => ({ ...v, result: net.run(v.input) }))
		const TIME_RESULTS = _now()
		this.CALLBACK(`${name} results success`)

		this.CALLBACK(`${name} results saving started...`)
		const json = JSON.stringify(results, null, 2)
		fileWrite(RESULTS_FILE, json)
		const TIME_SAVED = _now()
		this.CALLBACK(`${name} results saving success`)

		const msg = `
Network name: ${name}
Start Time: ${TIMESTAMP_START}
Network file: ${NETWORK_FILE}
Results file: ${RESULTS_FILE}
Results length: ${results.length}
Loaded on ${msToTimeDesc(TIME_START - TIME_LOADING)}
Results ready on ${msToTimeDesc(TIME_LOADING - TIME_RESULTS)}
Saved on ${msToTimeDesc(TIME_RESULTS - TIME_SAVED)}
End Time: ${timestamp}`
		_info(msg)

		return { ...rest, msg, net, name, data, isTrained }
	}

	static INIT_NETWORKS = () => {
		const MULT = this.netCreate({ name: `MULT_${this.NOW}`, data: this.DATA_MULT })
		const SUM = this.netCreate({ name: `SUM_${this.NOW}`, data: this.DATA_SUM })
		const SUB = this.netCreate({ name: `SUB_${this.NOW}`, data: this.DATA_SUB })
		const DIV = this.netCreate({ name: `DIV_${this.NOW}`, data: this.DATA_DIV })
		const BOOL = this.netCreate({ name: `BOOL_${this.NOW}`, data: this.DATA_BOOL })
		const AVERAGE = this.netCreate({ name: `AVERAGE_${this.NOW}`, data: this.DATA_AVERAGE })
		const XOR = this.netCreate({ name: `XOR_${this.NOW}`, data: this.DATA_XOR })
		const XAND = this.netCreate({ name: `XAND_${this.NOW}`, data: this.DATA_XAND })

		const CREATED = [MULT, SUM, SUB, DIV, BOOL, AVERAGE, XOR, XAND]
		_info("Networks created successfully")

		const TRAINED = CREATED.map((n) => ({ ...n, ...this.netTrain(n) }))
		_info("Networks trained successfully")

		const RESULTS = TRAINED.map((n) => ({ ...n, ...this.netRun(n) }))
		_info("Networks runned successfully")

		return RESULTS
	}
}

NetworkHelpers.INIT_NETWORKS()

module.exports = NetworkHelpers
