const brain = require("brain.js")
const fs = require("fs")

const getMnistData = function (content) {
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

fs.readFile(__dirname + "/train.csv", function (err1, trainContent) {
	fs.readFile(__dirname + "/test.csv", function (err2, testContent) {
		const trainData = getMnistData(trainContent)

		console.log("Got " + trainData.length + " samples")

		const net = new brain.NeuralNetwork({ hiddenLayers: [784, 392, 196] })

		net.train(trainData, {
			errorThresh: 0.045,
			log: true,
			logPeriod: 1,
			learningRate: 0.1
		})

		// Test it out
		const testData = getMnistData(testContent)

		const numRight = 0

		console.log("Neural Network tests:")
		for (i = 0; i < testData.length; i++) {
			const resultArr = net.run(testData[i].input)
			const result = resultArr.indexOf(Math.max.apply(Math, resultArr))
			const actual = testData[i].output.indexOf(Math.max.apply(Math, testData[i].output))

			const str = "(" + i + ") GOT: " + result + ", ACTUAL: " + actual
			str += result === actual ? "" : " -- WRONG!"

			numRight += result === actual ? 1 : 0

			console.log(str)
		}

		console.log("Got", numRight, "out of 350, or " + String(100 * (numRight / 350)) + "%")

		// Save the network weights
		const json = net.toJSON()

		fs.writeFile(__dirname + "/weights.json", JSON.stringify(json), function (err) {
			if (err) {
				return console.log(err)
			}

			console.log("DONE - Saved results to file.")
		})
	})
})
