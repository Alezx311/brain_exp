const brain = require("brain.js")
const { getUnical } = require("./values")
const Values = require("./values")
const { format, fileRead, FILE_POETS, getLines, BRAIN_TRAINING_OPTIONS, fileWrite, getJson } = Values

const NETWORK_FILE = "/networks/brainPoets.json"
const RESULTS_FILE = "/results/brainPoets.json"

const net = new brain.recurrent.LSTM()

const CONTENT = fileRead(FILE_POETS)
const LINES = getLines(CONTENT).filter(String).map(Values.getTrainingProps)
const RUN_DATA = LINES.filter(({ input }) => input.length > 3)

const trainResults = net.train(RUN_DATA, BRAIN_TRAINING_OPTIONS)
console.log("Network Training success", trainResults)
fileWrite(getJson(net.toJSON()), NETWORK_FILE)
console.log("Network Saved to file")

console.log("Run data", RUN_DATA.length)

const results = RUN_DATA.map((v) => ({ ...v, result: net.run(v.input) }))
console.log("Results", results)
fileWrite(getJson(results), RESULTS_FILE)
console.log("Results saved to file")
