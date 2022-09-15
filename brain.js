const brain = require("brain.js")
const Values = require("./values")

const getNetwork = (outputFn) => {
	const network = new brain.NeuralNetwork()
	const trainData = Values.getTrainData(10000, () => Values.getArray(2), outputFn)
	network.train(trainData, Values.BRAIN_TRAINING_OPTIONS)
	const results = trainData.map((v) => ({ ...v, result: Number(network.run(v.input)) }))
	const truthy = results.filter((v) => !!Values.inRange(v.result, Values.getRangeDiff(v.output[0])))
	return { results, trainData, truthy, desc: `Truthy: ${truthy.length} / ${results.length}` }
}

console.log(getNetwork(Values.reduceSum).desc)
