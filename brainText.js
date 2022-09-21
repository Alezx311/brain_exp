const BrainText = require("brain-text")
const brain = require("brain.js")

let brainText = new BrainText()

brainText.setConfiguration({
	iterations: 3000, // the maximum times to iterate the training data
	errorThresh: 0.006, // the acceptable error percentage from training data
	log: true, // true to use console.log, when a function is supplied it is used
	logPeriod: 10, // iterations between logging out
	learningRate: 0.3, // multiply's against the input and the delta then adds to momentum
	momentum: 0.1 // multiply's against the specified "change" then adds to learning rate for change
})

const modelJSON =
	'{"encender_lampara": ["enciende la luz","esto está muy oscuro"],"apagar_lampara": ["apaga la luz","apaga la lámpara"]}'
brainText.loadTrainDataFromInputDataString(modelJSON)

let result = brainText.train()
result.then(() => {
	let r = brainText.run("encender luz")
	console.log(r)
})

brainText.addData([
	{ label: "encender_lampara", text: "dale a la lamparita" },
	{ label: "apagar_lampara", text: "quita la lamparita" }
])
brainText.addOneData({ label: "encender_lampara", text: "dale a la lamparita" })
result = brainText.train()

let jsonModel = brainText.train()
let net = new new brain.NeuralNetwork()()
net.fromJSON(jsonModel.net)
