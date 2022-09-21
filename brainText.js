const brain = require("brain.js")
const Helpers = require("./helpers")
const { TrainingDataPoetry } = require("./trainingData")
const { now } = performance

const TIMESTAMP_START = Helpers.timestamp
const TIME_START = now()

const NETWORK_FILE = "/networks/brainPoets.json"
const RESULTS_FILE = "/results/brainPoets.json"

const OPTIONS_NET = Helpers.OPTIONS_BRAIN_LSTM
const OPTIONS_TRAIN = Helpers.OPTIONS_BRAIN_TRAIN

const net = new brain.NeuralNetwork(OPTIONS_NET)
// const net = new brain.recurrent.LSTM(OPTIONS_NET)
console.log("Network created successfully")

const trainingData = TrainingDataPoetry.dataGenerate(1000)
const TIME_TRAIN_DATA_GENERATED = now()

// const trainingDataJson = JSON.stringify(trainingData)
// Helpers.fileWrite(`./training/poetry_${Date.now()}.json`, trainingDataJson)
// console.log("Training data saved")

console.log("Network Training started")
net.train(trainingData, { log: true, callback: console.info })
const TIME_TRAINING = now()
console.log("Network Training success")

Helpers.fileWrite(NETWORK_FILE, JSON.stringify(net.toJSON()))
const TIME_NETWORK_SAVED = now()
console.log("Network saved success")

console.info(`
Start Time: ${TIMESTAMP_START}

Training data generated on ${TIME_TRAIN_DATA_GENERATED - TIME_START} milliseconds.
Network trained on ${TIME_TRAINING - TIME_TRAIN_DATA_GENERATED} milliseconds.
Network backup on ${TIME_NETWORK_SAVED - TIME_TRAINING} milliseconds

End Time: ${Helpers.timestamp}
`)

// const results = TrainingDataPoetry.WORDS_SEQUENCES.map((seq) => ({ ...seq, result: net.run(seq.word) }))
// console.log("Results", results)

// Helpers.fileWrite(RESULTS_FILE, Helpers.toJson(results))
// console.log("Results saved to file")
