const { Layer, Network, Architect, Trainer } = require("synaptic")
const Values = require("./values")

const PERF_START = performance.now()
const inputLayer = new Layer(2)
const hiddenLayer = new Layer(1)
const outputLayer = new Layer(1)

const DESC = Values.getDesc()
inputLayer.project(hiddenLayer)
hiddenLayer.project(outputLayer)
const NET_SUM = new Network({
	input: inputLayer,
	hidden: [hiddenLayer],
	output: outputLayer
})
const SUM = Values.TRAINING.SUM
for (let i = 0; i < SUM.length; i++) {
	const { input, output } = SUM[i]
	NET_SUM.activate(input)
	NET_SUM.propagate(Values.LEARNING_RATE, output)
}

const RESULTS_SUM = SUM.map((v) => ({ ...v, result: NET_SUM.activate(v.input) }))
	.filter((v) => v.result != 1)
	.map(Values.addProps)
const RESULTS_TRUTHY = RESULTS_SUM.filter((v) => !!v.isTrue)
const PERF_END = performance.now() - PERF_START
const RESULTS_DESC = `
<=============================>
${DESC}
Processed on: ${PERF_END}
Truthy Percent: ${Values.getPerc(RESULTS_SUM.length, RESULTS_TRUTHY.length)}

RESULTS: ${RESULTS_SUM.length}
RESULTS_TRUTHY: ${RESULTS_TRUTHY.length}
<=============================>
`

Values.writeOutput(JSON.stringify({ NET_SUM: NET_SUM.toJSON() }, null, 2), "./results/NET_SUM.txt")
Values.writeOutput(JSON.stringify(RESULTS_SUM, null, 2), "./results/SUM.txt")
Values.writeOutput(JSON.stringify(RESULTS_TRUTHY, null, 2), "./results/SUM_TRUTHY.txt")

console.log(RESULTS_DESC)
