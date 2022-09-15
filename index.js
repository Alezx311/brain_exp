const synaptic = require("synaptic") // this line is not needed in the browser
const Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
	Architect = synaptic.Architect

const myNetwork = new Architect.Perceptron(2, 2, 1)
const trainer = new Trainer(myNetwork)
const trainingOptions = {
	rate: 0.1,
	iterations: 20000,
	error: 0.005,
	shuffle: true,
	log: 1000,
	cost: Trainer.cost.CROSS_ENTROPY
}

const trainingSet = [
	{
		input: "Jane saw",
		output: "Doug"
	},
	{
		input: "Doug saw",
		output: "Jane"
	},
	{
		input: "Spot saw",
		output: "Doug"
	}
]

const results = trainer.train(trainingSet, trainingOptions)
console.log(results)
// function Perceptron(input, hidden, output) {
// 	// create the layers
// 	const inputLayer = new Layer(input)
// 	const hiddenLayer = new Layer(hidden)
// 	const outputLayer = new Layer(output)

// 	// connect the layers
// 	inputLayer.project(hiddenLayer)
// 	hiddenLayer.project(outputLayer)

// 	// set the layers
// 	this.set({
// 		input: inputLayer,
// 		hidden: [hiddenLayer],
// 		output: outputLayer
// 	})
// }

// // extend the prototype chain
// Perceptron.prototype = new Network()
// Perceptron.prototype.constructor = Perceptron

// const myPerceptron = new Perceptron(2, 3, 1)
// const myTrainer = new Trainer(myPerceptron)

// myTrainer.XOR() // { error: 0.004998819355993572, iterations: 21871, time: 356 }

// myPerceptron.activate([0, 0]) // 0.0268581547421616
// myPerceptron.activate([1, 0]) // 0.9829673642853368
// myPerceptron.activate([0, 1]) // 0.9831714267395621
// myPerceptron.activate([1, 1]) // 0.02128894618097928

// function LSTM(input, blocks, output) {
// 	// create the layers
// 	const inputLayer = new Layer(input)
// 	const inputGate = new Layer(blocks)
// 	const forgetGate = new Layer(blocks)
// 	const memoryCell = new Layer(blocks)
// 	const outputGate = new Layer(blocks)
// 	const outputLayer = new Layer(output)

// 	// connections from input layer
// 	const input = inputLayer.project(memoryCell)
// 	inputLayer.project(inputGate)
// 	inputLayer.project(forgetGate)
// 	inputLayer.project(outputGate)

// 	// connections from memory cell
// 	const output = memoryCell.project(outputLayer)

// 	// self-connection
// 	const self = memoryCell.project(memoryCell)

// 	// peepholes
// 	memoryCell.project(inputGate)
// 	memoryCell.project(forgetGate)
// 	memoryCell.project(outputGate)

// 	// gates
// 	inputGate.gate(input, Layer.gateType.INPUT)
// 	forgetGate.gate(self, Layer.gateType.ONE_TO_ONE)
// 	outputGate.gate(output, Layer.gateType.OUTPUT)

// 	// input to output direct connection
// 	inputLayer.project(outputLayer)

// 	// set the layers of the neural network
// 	this.set({
// 		input: inputLayer,
// 		hidden: [inputGate, forgetGate, memoryCell, outputGate],
// 		output: outputLayer
// 	})
// }

// // extend the prototype chain
// LSTM.prototype = new Network()
// LSTM.prototype.constructor = LSTM
