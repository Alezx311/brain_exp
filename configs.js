class Config {
	static NEURAL_CONFIG = {
		binaryThresh: 0.5,
		hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
		activation: "sigmoid", // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
		leakyReluAlpha: 0.01 // supported for activation type 'leaky-relu'
	}

	static RNN_CONFIG = {
		inputSize: 20,
		inputRange: 20,
		hiddenLayers: [20, 20],
		outputSize: 20,
		learningRate: 0.01,
		decayRate: 0.999
	}

	static TRAIN_OPT = {
		iterations: 20000, // the maximum times to iterate the training data --> number greater than 0
		errorThresh: 0.005, // the acceptable error percentage from training data --> number between 0 and 1
		log: false, // true to use console.log, when a function is supplied it is used --> Either true or a function
		logPeriod: 10, // iterations between logging out --> number greater than 0
		learningRate: 0.3, // scales with delta to effect training rate --> number between 0 and 1
		momentum: 0.1, // scales with next layer's change value --> number between 0 and 1
		callback: null, // a periodic call back that can be triggered while training --> null or function
		callbackPeriod: 10, // the number of iterations through the training data between callback calls --> number greater than 0
		timeout: number // the max number of milliseconds to train for --> number greater than 0. Default --> Infinity
	}
}
