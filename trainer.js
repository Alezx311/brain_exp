const { Layer, Network } = require("synaptic")
const Values = require("./values")

const inputLayer1 = new Layer(2)
const inputLayer2 = new Layer(2)
const inputLayer3 = new Layer(2)

const hiddenLayer1 = new Layer(3)
const hiddenLayer2 = new Layer(3)
const hiddenLayer3 = new Layer(3)

const outputLayer1 = new Layer(1)
const outputLayer2 = new Layer(1)
const outputLayer3 = new Layer(1)

inputLayer1.project(hiddenLayer1)
inputLayer2.project(hiddenLayer2)
inputLayer3.project(hiddenLayer3)

hiddenLayer1.project(outputLayer1)
hiddenLayer2.project(outputLayer2)
hiddenLayer3.project(outputLayer3)

const PERF_START = performance.now()
const DESC = Values.getDesc()

const SUM = Values.TRAINING.SUM
const AVERAGE = Values.TRAINING.AVERAGE
const DOUBLE = Values.TRAINING.DOUBLE

const TRAINING_SUM = Values.toTrainSet(SUM)
const TRAINING_AVERAGE = Values.toTrainSet(AVERAGE)
const TRAINING_DOUBLE = Values.toTrainSet(DOUBLE)

const NET_SUM = new Network({
	input: inputLayer1,
	hidden: [hiddenLayer1],
	output: outputLayer1
})
const NET_AVERAGE = new Network({
	input: inputLayer2,
	hidden: [hiddenLayer2],
	output: outputLayer2
})
const NET_DOUBLE = new Network({
	input: inputLayer3,
	hidden: [hiddenLayer3],
	output: outputLayer3
})

for (let i = 0; i < TRAINING_SUM.length; i++) {
	const { input, output } = TRAINING_SUM[i]
	NET_SUM.activate(input)
	NET_SUM.propagate(Values.LEARNING_RATE, output)
}

for (let i = 0; i < TRAINING_AVERAGE.length; i++) {
	const { input, output } = TRAINING_AVERAGE[i]
	NET_AVERAGE.activate(input)
	NET_AVERAGE.propagate(Values.LEARNING_RATE, output)
}

for (let i = 0; i < TRAINING_DOUBLE.length; i++) {
	const { input, output } = TRAINING_DOUBLE[i]
	NET_DOUBLE.activate(input)
	NET_DOUBLE.propagate(Values.LEARNING_RATE, output)
}

const addProps = (v, i) => ({
	...v,
	isTrue: v.output.includes(v.result),
	desc: `${i}. Expected: ${v.output[0]}, Received: ${v.result}, Values: ${v.input.join(", ")}`.trim()
})

const PERF_END = performance.now() - PERF_START

const RESULTS_SUM = SUM.map((v) => ({ ...v, result: NET_SUM.activate(v.input) }))
	.filter((v) => v.result != 1)
	.map(addProps)
const RESULTS_AVERAGE = AVERAGE.map((v) => ({ ...v, result: NET_AVERAGE.activate(v.input) }))
	.filter((v) => v.result != 1)
	.map(addProps)
const RESULTS_DOUBLE = DOUBLE.map((v) => ({ ...v, result: NET_DOUBLE.activate(v.input) }))
	.filter((v) => v.result != 1)
	.map(addProps)
const RESULTS_TOTAL = [...RESULTS_SUM, ...RESULTS_AVERAGE, ...RESULTS_DOUBLE]
const RESULTS_TRUTHY = RESULTS_TOTAL.filter((v) => !!v.isTrue)
const RESULTS_DESC = `
<=============================>
${DESC}
Processed on: ${PERF_END}
Truthy Percent: ${Values.getPerc(RESULTS_TOTAL.length, RESULTS_TRUTHY.length)}

RESULTS_SUM
Size: ${RESULTS_SUM.length}
Truthy: ${RESULTS_SUM.filter((v) => v.isTrue).length}
Example: ${RESULTS_SUM[0].desc}

RESULTS_AVERAGE
Size: ${RESULTS_AVERAGE.length}
Truthy: ${RESULTS_AVERAGE.filter((v) => v.isTrue).length}
Example: ${RESULTS_AVERAGE[0].desc}

RESULTS_DOUBLE
Size: ${RESULTS_DOUBLE.length}
Truthy: ${RESULTS_DOUBLE.filter((v) => v.isTrue).length}
Example: ${RESULTS_DOUBLE[0].desc}

RESULTS_TOTAL
Truthy: ${RESULTS_TRUTHY.length}
<=============================>
`
console.log(RESULTS_DESC)

const RESULTS_TEXT = `${RESULTS_DESC}\n${RESULTS_TRUTHY.reduce((a, v) => [...a, v.desc], []).join("\n")}`

Values.writeOutput(JSON.stringify(RESULTS_SUM, null, 2), "./results/SUM.txt")
Values.writeOutput(JSON.stringify(RESULTS_AVERAGE, null, 2), "./results/AVERAGE.txt")
Values.writeOutput(JSON.stringify(RESULTS_DOUBLE, null, 2), "./results/DOUBLE.txt")
Values.writeOutput(JSON.stringify(RESULTS_TOTAL, null, 2), "./results/TOTAL.txt")
Values.writeOutput(JSON.stringify(RESULTS_TRUTHY, null, 2), "./results/TRUTHY.txt")
Values.writeOutput(RESULTS_TEXT, "./results/TEXT.txt")
console.log("RESULTS_TEXT Saved")
