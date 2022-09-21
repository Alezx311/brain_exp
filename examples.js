const brain = require("brain.js")
const fs = require("fs")
const Helpers = require("./helpers")

const { info: _info } = console
const { keys: _keys, fromEntries: _from } = Object

const MAGIC = Math.PI
const HIDDEN_INPUTS = [20]
const ITERATIONS = 1000
const TRAIN_DATA_SIZE = 100
const PREDICT_SIZE = 3
const NET_OPT = { hiddenLayers: HIDDEN_INPUTS }
const TRAIN_OPT = {
	iterations: ITERATIONS,
	errorThresh: 0.005,
	learningRate: 0.2,
	log: true,
	interval: 1000
}

class Examples extends Helpers {
	static LSTM = () => {
		const net = new brain.recurrent.LSTM()
		const trainData = [
			{ input: "my unit-tests failed.", output: "software" },
			{ input: "tried the program, but it was buggy.", output: "software" },
			{ input: "i need a new power supply.", output: "hardware" },
			{ input: "the drive has a 2TB capacity.", output: "hardware" },
			{ input: "unit-tests", output: "software" },
			{ input: "program", output: "software" },
			{ input: "power supply", output: "hardware" },
			{ input: "drive", output: "hardware" }
		]

		net.train(trainData)

		const result = net.run("drive")
		_info("output", result)

		return result
	}

	static PREDICT_ENCODED = () => {
		const net = new brain.recurrent.LSTMTimeStep(NET_OPT)

		const FILE_CONTENT = "./files/poetry.txt"
		const FILE_NETWORK = "./networks/predict_encoded.json"
		const FILE_RESULTS = "./results/predict_encoded.json"

		const TEXT = this.fileRead(FILE_CONTENT)
			.toLowerCase()
			.replace(/\n|\s+/gim, " ")
		const WORDS_UNICAL = this.toUnical(TEXT.split(" ")).filter((s, i) => s.length > 3)
		const WORDS = WORDS_UNICAL.filter((v, i) => i < TRAIN_DATA_SIZE)

		const wordEncode = (word) => word.split("").map((ch) => ch.charCodeAt(0) / 256)
		const wordDecode = (arr) => arr.reduce((acc, n) => [...acc, String.fromCharCode(n * 256)], []).join("")

		// const json = this.fileRead(FILE_NETWORK)
		// net.fromJSON(JSON.parse(json))
		// _info("Network loaded")

		const trainData = WORDS.map((word) => wordEncode(word))
		const runData = WORDS_UNICAL.map((word) => wordEncode(word))

		const trainResults = net.train([...trainData, ...runData], TRAIN_OPT)
		_info("Training results", trainResults)

		this.fileWrite(FILE_NETWORK, JSON.stringify(net.toJSON(), null, 2))
		_info("Network saved")

		const results = trainData.map((input) => {
			const result = net.run(input)
			const forecast = net.forecast(input, PREDICT_SIZE)
			const decodedInput = wordDecode(input)
			const decodedPredict = wordDecode(forecast)
			const decodedResult = String.fromCharCode(result * 256)

			return { input, result, forecast, decodedInput, decodedPredict, decodedResult }
		})
		this.fileWrite(FILE_RESULTS, JSON.stringify(results, null, 2))
		_info("Results saved")

		return results
	}

	static PREDICT_WORDS = () => {
		const net = new brain.recurrent.LSTMTimeStep(NET_OPT)

		const FILE_CONTENT = "./files/poetry.txt"
		const FILE_NETWORK = "./networks/predict_words.json"
		const FILE_RESULTS = "./results/predict_words.json"

		const TEXT = this.fileRead(FILE_CONTENT)
			.toLowerCase()
			.replace(/\n|\s+/gim, " ")
		const WORDS_UNICAL = this.toUnical(TEXT.split(" ")).filter((s, i) => s.length > 3)
		const WORDS = WORDS_UNICAL.filter((v, i) => i < TRAIN_DATA_SIZE)

		const indexEncode = (i) => i / MAGIC
		const indexDecode = (i) => (i > 0 ? i : 1 * MAGIC)
		const wordDecode = (i) => WORDS_UNICAL[~~indexDecode(i)]
		const wordEncode = (w) => indexEncode(WORDS_UNICAL.indexOf(w))

		// const json = this.fileRead(FILE_NETWORK)
		// net.fromJSON(JSON.parse(json))
		// _info("Network loaded")

		const trainData = WORDS.map((word) => [wordEncode(word)])
		const runData = WORDS_UNICAL.map((word) => [wordEncode(word)])

		const trainResults = net.train([trainData], TRAIN_OPT)
		_info("Training results", trainResults)

		this.fileWrite(FILE_NETWORK, JSON.stringify(net.toJSON(), null, 2))
		_info("Network saved")

		const results = runData.map((input) => {
			const result = net.forecast([input], PREDICT_SIZE)
			const decoded = input.map(wordDecode)
			const output = this.toUnical(result.map(wordDecode)).filter(Boolean)

			return { input, result, decoded, output }
		})
		this.fileWrite(FILE_RESULTS, JSON.stringify(results, null, 2))
		_info("Results saved")

		return results
	}

	static PREDICT_LINES = () => {
		const net = new brain.recurrent.LSTMTimeStep(NET_OPT)

		const FILE_CONTENT = "./files/poetry.txt"
		const FILE_NETWORK = "./networks/predict_lines.json"
		const FILE_RESULTS = "./results/predict_lines.json"

		const TEXT = this.fileRead(FILE_CONTENT).toLowerCase()
		const LINES_UNICAL = this.toUnical(TEXT.split("\n"))
			.filter((s, i) => s.length > 3)
			.map((l) => l.replace("\n", " ").replace(/\s+/gim, " "))
		const LINES = LINES_UNICAL.filter((v, i) => i < TRAIN_DATA_SIZE)

		const indexEncode = (i) => i / MAGIC
		const indexDecode = (i) => (i > 0 ? i : 1 * MAGIC)
		const lineDecode = (i) => LINES_UNICAL[~~indexDecode(i)]
		const lineEncode = (w) => indexEncode(LINES_UNICAL.indexOf(w))

		// const json = this.fileRead(FILE_NETWORK)
		// net.fromJSON(JSON.parse(json))
		// _info("Network loaded")

		const trainData = LINES.map((line) => [lineEncode(line)])
		const runData = LINES_UNICAL.map((line) => [lineEncode(line)])

		const trainResults = net.train([trainData], TRAIN_OPT)
		_info("Training results", trainResults)

		this.fileWrite(FILE_NETWORK, JSON.stringify(net.toJSON(), null, 2))
		_info("Network saved")

		const results = runData.map((input) => {
			const result = net.forecast([input], PREDICT_SIZE)
			const decoded = input.map(lineDecode)
			const output = this.toUnical(result.map(lineDecode)).filter(Boolean)

			return { input, result, decoded, output }
		})
		this.fileWrite(FILE_RESULTS, JSON.stringify(results, null, 2))
		_info("Results saved")

		return results
	}

	static TRAINED_MODEL_TRAIN_OPT = {
		logPeriod: 100,
		log: true,
		errorThresh: 0.001
	}
	static TRAINED_MODEL_TRAIN_DATA = [
		{
			input: `Fuck being on some chill shit
					We go 0 to 100 nigga, real quick
					They be on that rap-to-pay-the-bill shit`,
			output: { Drake: 1 }
		},
		{
			input: `Still like, "Can you hit it with your OVO goose on?"
					I'm like, "What are you on?"
					Told me that she two on, ha, that's cute we a few on
					I could show you what to do in this bitch`,
			output: { Drake: 1 }
		},
		{
			input: `All you self promoters are janky
					We established like the Yankees
					This whole fucking game thank us
					We movin' militant but somehow you the one tankin'`,
			output: { Drake: 1 }
		},
		{
			input: `You underestimated greatly
Most number ones ever, how long did it really take me
The part I love most is they need me more than they hate me
So they never take shots, I got everybody on safety
I could load every gun with bullets that fire backwards`,
			output: { Drake: 1 }
		},
		{
			input: `Yeah uh yeah
These are my one St Thomas flows
Me and my niggas and some Madonna hoes
That look just like virgins`,
			output: { Drake: 1 }
		},
		{
			input: `Stance on lean, leg up on the wall
My people they chill, why you haters wanna ball
I'm satisfied with a little, why you haters want it all
You waiting for the Spring, and I'm gettin it in the fall
But uh, do what you do what you, I do what I do
Do's what you do, I do what I do`,
			output: { Drake: 1 }
		},
		{
			input: `Yo I wake up every morning, shower, gather my belongings
Yo I wake up every morning, shower, gather my belongings
Head to works, I get some breakfast 'cause, still a nigga yawning
From the night before, at the club I was up I'm tryna live
Only twenty two my nig, 'bout to be twenty three ya dig?`,
			output: { Drake: 1 }
		},
		{
			input: `This the record that my backpack underground fans get to get to skippin
Back back, Southern town fans get to tippin
Chasin fat stacks, runnin down grands and submission
I don't back track, every single sound for me different
I don't own no ice, just got clean rap`,
			output: { Drake: 1 }
		},
		{
			input: `Yesterday when we were getting high, you were invited.
You would've liked it. I-I know you all too well.
I said that we could kiss the past goodbye, but you weren't excited, there's no way to fight it.
You can stay but shawty here I go...`,
			output: { Drake: 1 }
		},
		{
			input: `I know way too many people here right now that I didn't know last year
Who the fuck are y'all?
I swear it feels like the last few nights we've been everywhere and back
But I just can't remember it all
What am I doing, what am I doing?
Oh, yeah, that's right.
I'm doing me, I'm doing me
I'm living life right now, man
And this what I'mma do 'til it's over
'Til it's over. It's far from over`,
			output: { Drake: 1 }
		},
		{
			input: `Hi kids! Do you like violence? (Yeah yeah yeah!)
Wanna see me stick Nine Inch Nails through each one of my eyelids? (Uh-huh!)
Wanna copy me and do exactly like I did? (Yeah yeah!)
Try 'cid and get fucked up worse that my life is? (Huh?)`,
			output: { Eminem: 1 }
		},
		{
			input: `Meet Eddie, twenty-three-years-old
Fed up with life and the way things are going, he decides to rob a liquor store
("I can't take this no more, I can't take it no more homes")
But on his way in, he has a sudden change of heart
And suddenly, his conscience comes into play
("Shit is mine, I gotta do this, gotta do this")`,
			output: { Eminem: 1 }
		},
		{
			input: `My tea's gone cold I'm wondering why I got out of bed at all
The morning rain clouds up my window and I can't see at all
And even if I could it'll all be gray, but your picture on my wall
It reminds me, that it's not so bad, it's not so bad`,
			output: { Eminem: 1 }
		},
		{
			input: `America, we love you
How many people are proud to be citizens of this beautiful country of ours
The stripes and the stars for the rights that men have died for to protect the women and men who have broke their necks for the freedom of speech the United States Government has sworn to uphold
(Yo', I want everybody to listen to the words of this song) or so we're told...`,
			output: { Eminem: 1 }
		},
		{
			input: `
I'm sorry mama!
I never meant to hurt you!
I never meant to make you cry; but tonight
I'm cleaning out my closet (one more time)
I said I'm sorry mama!
I never meant to hurt you!
I never meant to make you cry, but tonight
I'm cleaning out my closet`,
			output: { Eminem: 1 }
		},
		{
			input: `Look, I was gonna go easy on you not to hurt your feelings
But I'm only going to get this one chance
(Six minutes, six minutes)
Something's wrong, I can feel it
(Six minutes, six minutes, Slim Shady, you're on)
Just a feeling I've got
Like something's about to happen`,
			output: { Eminem: 1 }
		},
		{
			input: `His palms are sweaty, knees weak, arms are heavy
There's vomit on his sweater already, mom's spaghetti
He's nervous, but on the surface he looks calm and ready to drop bombs,
But he keeps on forgetting what he wrote down,
The whole crowd goes so loud`,
			output: { Eminem: 1 }
		},
		{
			input: `'Cause I know you want me baby
I think I want you too
"I think I love you baby"
I think I love you too
I'm here to save you girl
Come be in Shady's world
I wanna grow together
Let's let our love unfurl`,
			output: { Eminem: 1 }
		},
		{
			input: `I'm a soldier, I'm a soldier, I'm a soldier, I'm a soldier
Yo', never was a thug, just infatuated with guns
Never was a gangster, 'til I graduated to one
And got the rep of a villain
For weapon concealin'
Took the image of a thug, kept shit appealin'`,
			output: { Eminem: 1 }
		},
		{
			input: `two trailer park girls go 'round the outside, 'round the outside, 'round the outside
Guess who's back, back again
Shady's back, tell a friend
Guess who's back`,
			output: { Eminem: 1 }
		}
	].map((d) => ({
		text: d.input,
		input: this.encode(d.input),
		output: d.output
	}))

	//? Classificate
	static CLASSIFICATE_TRAIN_DATA = [
		{ input: "Argon", output: "a" },
		{ input: "Argentina", output: "a" },
		{ input: "Aron", output: "a" },
		{ input: "August", output: "a" },
		{ input: "Australia", output: "a" },
		{ input: "America", output: "a" },
		{ input: "Allison", output: "a" },
		{ input: "Alex", output: "a" },
		{ input: "Arthur", output: "a" },
		{ input: "Also", output: "a" },
		{ input: "Barcelona", output: "b" },
		{ input: "Baseball", output: "b" },
		{ input: "Bayern", output: "b" },
		{ input: "Batch", output: "b" },
		{ input: "Brasillia", output: "b" },
		{ input: "Brass", output: "b" },
		{ input: "Bateman", output: "b" },
		{ input: "Bose", output: "b" },
		{ input: "Biscuit", output: "b" },
		{ input: "Bhutan", output: "b" },
		{ input: "China", output: "c" },
		{ input: "Chile", output: "c" },
		{ input: "Cheat", output: "c" },
		{ input: "Caught", output: "c" },
		{ input: "Colombia", output: "c" },
		{ input: "Colorado", output: "c" },
		{ input: "Cult", output: "c" },
		{ input: "Cristiano", output: "c" },
		{ input: "Choke", output: "c" },
		{ input: "Cut", output: "c" }
	]
	static CLASSIFICATE_TRAIN_OPT = { iterations: 1500, log: true, logPeriod: 50, layers: [10] }

	//? Tense
	static TENSE_TRAIN_DATA = [
		{ input: "I will write a book.", output: "future" },
		{ input: "He will be writing a book.", output: "future" },
		{ input: "They will have written the book.", output: "future" },
		{ input: "I will not cry.", output: "future" },
		{ input: "You will find happiness", output: "future" },
		{ input: "I am about to leave.", output: "future" },
		{ input: "Will you go out?", output: "future" },
		{ input: "I shall leave.", output: "future" },
		{ input: "We will rock you.", output: "future" },
		{ input: "I shall bring the laptop.", output: "future" },
		{ input: "Will Smith was late.", output: "past" },
		{ input: "I had been to that place.", output: "past" },
		{ input: "I was selfish.", output: "past" },
		{ input: "We had money.", output: "past" },
		{ input: "You were so young!", output: "past" },
		{ input: "It was the best day.", output: "past" },
		{ input: "What were you saying?", output: "past" },
		{ input: "I had been to London.", output: "past" },
		{ input: "I should not have left.", output: "past" },
		{ input: "What was I thinking?", output: "past" },
		{ input: "I am here.", output: "present" },
		{ input: "Are you eating regularly?", output: "present" },
		{ input: "Let me in.", output: "present" },
		{ input: "I am running.", output: "present" },
		{ input: "Please stop screaming.", output: "present" },
		{ input: "I cannot help you", output: "present" },
		{ input: "Obey the rules.", output: "present" },
		{ input: "Call me a lawyer.", output: "present" },
		{ input: "Am I wrong?", output: "present" },
		{ input: "Right this way.", output: "present" }
	]
	static TENSE_TRAIN_OPT = { iterations: 1500, log: true, logPeriod: 500, layers: [10] }

	//? Book
	static BOOK_TRAIN_OPT = { iterations: 1500, log: (details) => _info(details), errorThresh: 0.011 }
	static BOOK_TRAIN_DATA = [
		"Jane saw Doug.",
		"Doug saw Jane.",
		"Spot saw Doug and Jane looking at each other.",
		"It was love at first sight, and Spot had a frontrow seat. It was a very special moment for all."
	]
	static BOOK_RUN_DATA = ["Jane", "Doug", "Spot", "It"]

	//? Characters
	static CHARACTERS_RAW = {
		a: ".#####." + "#.....#" + "#.....#" + "#######" + "#.....#" + "#.....#" + "#.....#",
		b: "######." + "#.....#" + "#.....#" + "######." + "#.....#" + "#.....#" + "######.",
		c: "#######" + "#......" + "#......" + "#......" + "#......" + "#......" + "#######"
	}
	static CHARACTERS_KEYS = [..._keys(this.CHARACTERS_RAW)]
	static CHARACTERS_TRAIN_OPT = { log: (detail) => _info(detail) }
	static CHARACTERS = this.CHARACTERS_KEYS.reduce((acc, k, index) => {
		const raw = this.CHARACTERS_RAW[k]
		const input = this.character(raw)
		const letter = k
		const output = _from([[k, 1]])
		return [...acc, { index, raw, input, letter, output }]
	}, [])

	//? Math
	static MATH_TRAIN_OPT = { log: true, errorThresh: 0.03 }
	static MATH_TRAIN_DATA = [
		"0+0=0",
		"0+1=1",
		"1+0=1",
		"0+2=2",
		"2+0=2",
		"0+3=3",
		"3+0=3",
		"0+4=4",
		"4+0=4",
		"0+5=5",
		"5+0=5",
		"0+6=6",
		"6+0=6",
		"0+7=7",
		"7+0=7",
		"0+8=8",
		"8+0=8",
		"0+9=9",
		"9+0=9",
		"1+1=2",
		"1+2=3",
		"2+1=3",
		"1+3=4",
		"3+1=4",
		"1+4=5",
		"4+1=5",
		"1+5=6",
		"5+1=6",
		"1+6=7",
		"6+1=7",
		"1+7=8",
		"7+1=8",
		"1+8=9",
		"8+1=9",
		"1+9=10",
		"9+1=10",
		"2+2=4",
		"2+3=5",
		"3+2=5",
		"2+4=6",
		"4+2=6",
		"2+5=7",
		"5+2=7",
		"2+6=8",
		"6+2=8",
		"2+7=9",
		"7+2=9",
		"2+8=10",
		"8+2=10",
		"2+9=11",
		"9+2=11",
		"3+3=6",
		"3+4=7",
		"4+3=7",
		"3+5=8",
		"5+3=8",
		"3+6=9",
		"6+3=9",
		"3+7=10",
		"7+3=10",
		"3+8=11",
		"8+3=11",
		"3+9=12",
		"9+3=12",
		"4+4=8",
		"4+5=9",
		"5+4=9",
		"4+6=10",
		"6+4=10",
		"4+7=11",
		"7+4=11",
		"4+8=12",
		"8+4=12",
		"4+9=13",
		"9+4=13",
		"5+5=10",
		"5+6=11",
		"6+5=11",
		"5+7=12",
		"7+5=12",
		"5+8=13",
		"8+5=13",
		"5+9=14",
		"9+5=14",
		"6+6=12",
		"6+7=13",
		"7+6=13",
		"6+8=14",
		"8+6=14",
		"6+9=15",
		"9+6=15",
		"7+7=14",
		"7+8=15",
		"8+7=15",
		"7+9=16",
		"9+7=16",
		"8+8=16",
		"8+9=17",
		"9+8=17",
		"9+9=18"
	]

	//? Predict
	static PREDICT_NET_OPT = { inputSize: 2, hiddenLayers: [10], outputSize: 2 }
	static PREDICT_TRAIN_OPT = { log: true, errorThresh: 0.09 }
	static PREDICT_TRAIN_DATA = [
		[1, 5],
		[2, 4],
		[3, 3],
		[4, 2],
		[5, 1]
	]
	static PREDICT_RUN_DATA = [
		[1, 5],
		[2, 4],
		[3, 3],
		[4, 2]
	]
	static PREDICT_FORECAST_DATA = [
		[1, 5],
		[2, 4]
	]

	static PREDICT = () => {
		const netOpt = this.PREDICT_NET_OPT
		const net = new brain.recurrent.LSTMTimeStep(netOpt)

		const trainData = this.PREDICT_TRAIN_DATA
		const trainOpt = this.PREDICT_TRAIN_OPT
		const trainResults = net.train(trainData, trainOpt)
		_info("Training result: ", trainResults)

		const results = net.forecast(trainData, 10)
		_info("next 10 predictions", { input: trainData, results })

		return results
	}

	static TRAIN_OPT_DEFAULT = {
		iterations: 1000, // the maximum times to iterate the training data --> number greater than 0
		errorThresh: 0.09, // the acceptable error percentage from training data --> number between 0 and 1
		log: true, // true to use _info, when a function is supplied it is used --> Either true or a function
		logPeriod: 100, // iterations between logging out --> number greater than 0
		learningRate: 0.05, // scales with delta to effect training rate --> number between 0 and 1
		momentum: 0.1, // scales with next layer's change value --> number between 0 and 1
		callback: null, // a periodic call back that can be triggered while training --> null or function
		callbackPeriod: 100, // the number of iterations through the training data between callback calls --> number greater than 0
		timeout: Infinity // the max number of milliseconds to train for --> number greater than 0. Default --> Infinity
	}

	static MATH = () => {
		const net = new brain.recurrent.LSTM()

		const trainData = this.MATH_TRAIN_DATA
		const trainOpt = this.MATH_TRAIN_OPT
		const trainResults = net.train(trainData, trainOpt)
		_info("Training result: ", trainResults)

		let errors = 0
		let results = []
		const len = trainData.length
		for (let i = 0; i < len; i++) {
			const input = trainData[i].split("=")[0] + "="
			const result = net.run(input)
			const predictedMathProblem = input + result
			const error = trainData.indexOf(predictedMathProblem) <= -1 ? 1 : 0
			results.push({ input, result, error })
			errors += error
			_info(input + result + (error ? " - error" : ""))
		}

		_info("Errors: " + errors / len)
		_info("Results: ", results)

		return results
	}

	static RECOGNIZE = () => {
		const net = new brain.NeuralNetwork()

		const trainData = this.CHARACTERS
		const trainOpt = this.CHARACTERS_TRAIN_OPT
		const trainResults = net.train(trainData, trainOpt)
		_info("Training result: ", trainResults)

		const results = trainData.map(({ input }) => {
			const result = brain.likely(input, net)
			return { input, result }
		})
		_info("results", results)

		return results
	}

	static BOOK = () => {
		const lstm = new brain.recurrent.LSTM()

		const trainData = this.BOOK_TRAIN_DATA
		const trainOpt = this.BOOK_TRAIN_OPT
		const trainResults = lstm.train(trainData, trainOpt)
		_info("Training result: ", trainResults)

		const results = this.BOOK_RUN_DATA.map((input) => ({
			input,
			result: lstm.run(input)
		}))
		_info(results)

		return results
	}

	static TENSE = () => {
		const net = new brain.recurrent.LSTM()

		const trainOpt = this.TENSE_TRAIN_OPT
		const trainData = this.TENSE_TRAIN_DATA
		const trainResults = net.train(trainData, trainOpt)
		_info("Training result: ", trainResults)

		const results = trainData.map(({ input, output }) => {
			const result = { input, result: net.run(input), output }
			return result
		})
		_info("Result: ", results)

		return results
	}

	static CLASSIFICATE = () => {
		const net = new brain.recurrent.LSTM()

		const trainData = this.CLASSIFICATE_TRAIN_DATA
		const trainOpt = this.CLASSIFICATE_TRAIN_OPT
		const trainResults = net.train(trainData, trainOpt)
		_info("Training result: ", trainResults)

		const results = trainData.map(({ input, output }) => {
			return { input, result: net.run(input), output }
		})
		_info("Results", results) // It starts with: c

		return results
	}

	static TRAINED_MODEL = () => {
		const file = "./trained-model.json"
		const net = new brain.NeuralNetwork()
		// const content = fs.readFileSync(file, "utf-8")
		// net.fromJSON(JSON.parse(content))

		const trainData = this.TRAINED_MODEL_TRAIN_DATA
		net.train(trainData, this.TRAINED_MODEL_TRAIN_OPT)

		// const json = net.toJSON()
		// fs.writeFileSync(file, JSON.stringify(json))

		const results = trainData.map(({ input, output, text }) => {
			const result = net.run(input)
			const decoded = this.decode(input)
			return { input, output, result, decoded, text }
		})
		_info("Trained model", results)

		return results
	}

	static INIT = () => {
		_info("PREDICT started...")
		const PREDICT = this.PREDICT()
		_info("PREDICT ready", PREDICT)

		_info("MATH started...")
		const MATH = this.MATH()
		_info("MATH ready", MATH)

		_info("RECOGNIZE started...")
		const RECOGNIZE = this.RECOGNIZE()
		_info("RECOGNIZE ready", RECOGNIZE)

		_info("BOOK started...")
		const BOOK = this.BOOK()
		_info("BOOK ready", BOOK)

		_info("TENSE started...")
		const TENSE = this.TENSE()
		_info("TENSE ready", TENSE)

		_info("CLASSIFICATE started...")
		const CLASSIFICATE = this.CLASSIFICATE()
		_info("CLASSIFICATE ready", CLASSIFICATE)

		_info("TRAINED_MODEL started...")
		const TRAINED_MODEL = this.TRAINED_MODEL()
		_info("TRAINED_MODEL ready", TRAINED_MODEL)

		_info("PREDICT_ENCODED started...")
		const PREDICT_ENCODED = this.PREDICT_ENCODED()
		_info("PREDICT_ENCODED ready", PREDICT_ENCODED)

		_info("PREDICT_WORDS started...")
		const PREDICT_WORDS = this.PREDICT_WORDS()
		_info("PREDICT_WORDS ready", PREDICT_WORDS)

		_info("PREDICT_LINES started...")
		const PREDICT_LINES = this.PREDICT_LINES()
		_info("PREDICT_LINES ready", PREDICT_LINES)

		_info("Results Saving...")
		const results = {
			PREDICT,
			MATH,
			RECOGNIZE,
			BOOK,
			TENSE,
			CLASSIFICATE,
			TRAINED_MODEL,
			PREDICT_ENCODED,
			PREDICT_WORDS,
			PREDICT_LINES
		}
		const json = JSON.stringify(results, null, 2)
		this.fileWrite("./results/examples.json", json)
		_info("Results Saved")

		return results
	}
}

module.exports = Examples
