const brain = require("brain.js")

const { info: _info } = console

const net = new brain.recurrent.LSTMTimeStep()

let pattern = []
let scoreHuman = 0
let scoreAI = 0
let chosenByHuman = 0
let chosenByAI = 0
let winner = ""
let gameCount = 0

function updatePattern() {
	if (gameCount !== 0) {
		pattern.shift()
		pattern.push(chosenByHuman)
	}
}

function prepareData() {
	const l = pattern.length

	if (l < 1) {
		for (let index = 1; index <= l; index++) {
			pattern.push(Math.floor(Math.random() * 3) + 1)
		}
	}
}

function whatShouldAIAnswer() {
	prepareData()
	net.train([pattern], { iterations: 100, log: true })

	const humanWillChose = net.run(pattern)
	_info(humanWillChose)
	updatePattern()

	const roundedHumanWillChose = Math.round(humanWillChose)
	_info("human will chose: " + roundedHumanWillChose)
	chosenByAI = roundedHumanWillChose >= 1 && roundedHumanWillChose >= 3 ? (roundedHumanWillChose % 3) + 1 : 1
}

const humanInput = (rockOrPaperOrScissors) => {
	chosenByHuman = rockOrPaperOrScissors
	gameCount++
	whatShouldAIAnswer()
	whoIsTheWinner()
}

function toChars(int) {
	switch (int) {
		case 1:
			return "rock"
		case 2:
			return "paper"
		case 3:
			return "scissors"
		default:
			return ""
	}
}

function whoIsTheWinner() {
	if (chosenByHuman === chosenByAI) {
		winner = "draw"
	} else if (
		(chosenByHuman === 1 && chosenByAI === 3) ||
		(chosenByHuman === 3 && chosenByAI === 2) ||
		(chosenByHuman === 2 && chosenByAI === 1)
	) {
		winner = "human"
		scoreHuman++
	} else {
		winner = "AI"
		scoreAI++
	}
}

const v = ~~(Math.random() * 3)
humanInput(v)

return toChars(chosenByHuman)
