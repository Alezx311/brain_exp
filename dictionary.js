const brain = require("brain.js")

const TRAIN_DATA = [
	{
		input: "what",
		output: { INFORMATION: 1, COMMAND: 0, WEATHER: 0 }
	},
	{
		input: "why",
		output: { INFORMATION: 1, COMMAND: 0, WEATHER: 0 }
	},
	{
		input: "how",
		output: { INFORMATION: 1, COMMAND: 0, WEATHER: 0 }
	},
	{
		input: "what's the weather",
		output: { INFORMATION: 1, COMMAND: 0, WEATHER: 0.9 }
	},
	{
		input: "what's the weather in",
		output: { INFORMATION: 1, COMMAND: 0, WEATHER: 0.9 }
	},
	{
		input: "open google",
		output: { INFORMATION: 0, COMMAND: 1, WEATHER: 0 }
	},
	{
		input: "open",
		output: { INFORMATION: 0, COMMAND: 1, WEATHER: 0 }
	},
	{
		input: "do",
		output: { INFORMATION: 0, COMMAND: 1, WEATHER: 0 }
	},
	{
		input: "execute",
		output: { INFORMATION: 0, COMMAND: 1, WEATHER: 0 }
	},
	{
		input: "create",
		output: { INFORMATION: 0, COMMAND: 1, WEATHER: 0 }
	}
]

class DictionaryService {
	constructor(data) {
		this.data = data
		this.dictionary = this.buildWordDictionary(data)
	}

	// build dictionary of recognized words, based on the phrases inside the data file
	buildWordDictionary(trainingData) {
		const tokenisedArray = trainingData.map((item) => {
			const tokens = item.input.split(" ")
			return tokens
		})

		const flattenedArray = [].concat.apply([], tokenisedArray)
		return flattenedArray.filter((item, pos, self) => self.indexOf(item) == pos)
	}

	// encode strings to numbers
	encode(phrase) {
		const phraseTokens = phrase.split(" ")
		const encodedPhrase = this.dictionary.map((word) => (phraseTokens.includes(word) ? 1 : 0))

		return encodedPhrase
	}

	// encode dataset for training
	encodeTrainingSet() {
		return this.data.map((dataSet) => {
			const encodedValue = this.encode(dataSet.input)
			return { input: encodedValue, output: dataSet.output }
		})
	}
}

class NetworkService {
	net = new brain.NeuralNetwork()

	constructor(data) {
		this.dictService = new DictionaryService(data)
		this.trainingSet = this.dictService.encodeTrainingSet()
		this.net.train(this.trainingSet)
		return this
	}

	execute(e) {
		// run network iteration
		const encoded = this.dictService.encode(e)
		return this.net.run(encoded)
		// const result = brain.likely(encoded, this.net);
		// return result
	}
}

const net = new NetworkService(TRAIN_DATA)

const myString = "how is the weather in Dubai"

const iteration = net.execute(myString)
// {
//   INFORMATION: 0.9914395213127136,
//   COMMAND: 0.008984310552477837,
//   WEATHER: 0.7017410397529602
// }

console.log(iteration, "\n")
