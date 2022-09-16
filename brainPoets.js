const brain = require("brain.js")
const Helpers = require("./helpers")
const { TrainingDataPoetry } = require("./trainingData")

const NETWORK_FILE = "/networks/brainPoets.json"
const RESULTS_FILE = "/results/brainPoets.json"

// const OPTIONS_TRAIN = { log: true }
// const OPTIONS_NET = { log: true }
const OPTIONS_NET = Helpers.OPTIONS_BRAIN_LSTM
const OPTIONS_TRAIN = Helpers.OPTIONS_BRAIN_TRAIN

const net = new brain.recurrent.LSTM(OPTIONS_NET)
console.log("Network created successfully")

console.log(TrainingDataPoetry.DESC)
console.log(TrainingDataPoetry.examples)

const trainingData = TrainingDataPoetry.dataGenerate(1000)
const trainingDataJson = JSON.stringify(trainingData)
Helpers.fileWrite(`./training/poetry_${Date.now()}.json`, trainingDataJson)
console.log("Training data saved")

const trainResults = net.train(trainingData, OPTIONS_TRAIN)
console.log("Network Training success", trainResults)

const json = net.toJSON()
Helpers.fileWrite(NETWORK_FILE, Helpers.toJson(json))
console.log("Network Saved to file")

const results = TrainingDataPoetry.WORDS_SEQUENCES.map((seq) => ({ ...seq, result: net.run(seq.word) }))
console.log("Results", results)

Helpers.fileWrite(RESULTS_FILE, Helpers.toJson(results))
console.log("Results saved to file")
