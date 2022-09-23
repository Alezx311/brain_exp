const brain = require("brain.js")
const Helpers = require("./helpersOld")

const { now } = performance
const DATA = [
	"рощи",
	"погибал",
	"мной",
	"обычною",
	"князь",
	"торопливый",
	"дом",
	"дня",
	"славит",
	"даже",
	"“ай",
	"нрав",
	"силой",
	"моей",
	"потряс",
	"фарлаф",
	"лучезарный",
	"все",
	"горами"
]

const TIMESTAMP_START = Helpers.timestamp
const TIME_START = now()

const NETWORK_FILE = "/networks/brainPoetsTrained.json"
const RESULTS_FILE = "/results/brainPoetsTrained.json"
const NETWORK_JSON = JSON.parse(Helpers.fileRead(NETWORK_FILE))

const net = new brain.recurrent.LSTM()
net.fromJSON(NETWORK_JSON)
const TIME_CREATED = now()
console.log("Network readed successfully")

const RESULTS = DATA.map((input) => {
	const result = net.run({ input, output: input })
	return { input, result }
})
const TIME_PROCESSED = now()
console.log("Network running success")

Helpers.fileWrite(RESULTS_FILE, JSON.stringify(RESULTS, null, 2))
const TIME_SAVED = now()
console.log("Network results saved success")

console.info(`
Start Time: ${TIMESTAMP_START}


TIME_START: ${TIMESTAMP_START}
TIME_CREATED: ${TIME_CREATED - TIME_START} ms
TIME_PROCESSED: ${TIME_PROCESSED - TIME_CREATED} ms
TIME_SAVED: ${TIME_SAVED - TIME_PROCESSED} ms

End Time: ${Helpers.timestamp}
`)

// const results = TrainingDataPoetry.WORDS_SEQUENCES.map((seq) => ({ ...seq, result: net.run(seq.word) }))
// console.log("Results", results)

// Helpers.fileWrite(RESULTS_FILE, Helpers.toJson(results))
// console.log("Results saved to file")
