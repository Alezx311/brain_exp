const { Layer, Network, Architect, Trainer } = require("synaptic")
const Values = require("./values")

const PERF_START = performance.now()
const inputLayer = new Layer(2)
const hiddenLayer = new Layer(1)
const outputLayer = new Layer(1)

const DESC = Values.getDesc()
inputLayer.project(hiddenLayer)
hiddenLayer.project(outputLayer)
const NET_AVERAGE = new Network({
	input: inputLayer,
	hidden: [hiddenLayer],
	output: outputLayer
})
const AVERAGE = Values.TRAINING.AVERAGE
for (let i = 0; i < AVERAGE.length; i++) {
	const { input, output } = AVERAGE[i]
	NET_AVERAGE.activate(input)
	NET_AVERAGE.propagate(Values.LEARNING_RATE, output)
}

const RESULTS_AVERAGE = AVERAGE.map((v) => ({ ...v, result: NET_AVERAGE.activate(v.input) }))
	.filter((v) => v.result != 1)
	.map(Values.addProps)
const RESULTS_TRUTHY = RESULTS_AVERAGE.filter((v) => !!v.isTrue)
const PERF_END = performance.now() - PERF_START
const RESULTS_DESC = `
<=============================>
${DESC}
Processed on: ${PERF_END}
Truthy Percent: ${Values.getPerc(RESULTS_AVERAGE.length, RESULTS_TRUTHY.length)}

RESULTS: ${RESULTS_AVERAGE.length}
RESULTS_TRUTHY: ${RESULTS_TRUTHY.length}
<=============================>
`

Values.writeOutput(JSON.stringify({ NET_AVERAGE: NET_AVERAGE.toJSON() }, null, 2), "./results/NET_AVERAGE.txt")
Values.writeOutput(JSON.stringify(RESULTS_AVERAGE, null, 2), "./results/AVERAGE.txt")
Values.writeOutput(JSON.stringify(RESULTS_TRUTHY, null, 2), "./results/AVERAGE_TRUTHY.txt")

console.log(RESULTS_DESC)
