const brain = require("brain")
const fs = require("fs")

const getMnistData = (content) => {
	const lines = content.toString().split("\n")

	const data = []
	for (const i = 0; i < lines.length; i++) {
		const input = lines[i].split(",").map(Number)

		const output = Array.apply(null, Array(10)).map(Number.prototype.valueOf, 0)
		output[input.shift()] = 1

		data.push({
			input: input,
			output: output
		})
	}

	return data
}

fs.readFile(__dirname + "/train.csv", (err, trainContent) => {
	if (err) {
		console.log("Error:", err)
	}

	const trainData = getMnistData(trainContent)

	console.log("Got " + trainData.length + " samples")

	const net = new brain.NeuralNetwork({ hiddenLayers: [784, 392, 196] })

	net.train(trainData, {
		errorThresh: 0.025,
		log: true,
		logPeriod: 1,
		learningRate: 0.1
	})
})

// const getNetwork = (outputFn) => {
// 	const network = new brain.NeuralNetwork()

// 	const trainData = Values.getTrainData(10000, () => Values.getArray(2), outputFn)
// 	network.train(trainData, Values.BRAIN_TRAINING_OPTIONS)

// 	const results = trainData.map((v) => ({ ...v, result: Number(network.run(v.input)) }))
// 	const truthy = results.filter((v) => !!Values.inRange(v.result, Values.getRangeDiff(v.output[0])))

// 	return { results, trainData, truthy, desc: `Truthy: ${truthy.length} / ${results.length}` }
// }

// console.log(getNetwork(Values.reduceSum).desc)
