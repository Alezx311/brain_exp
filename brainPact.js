const pact = require("brain-pact")

let inputOptions = {
	date: {
		type: "date",
		pattern: ["month", "week", "day", "hour"] //prepare pattern for date
	},
	test: {
		weight: 5 //input property test has maximun value of 5
	}
}
let transition = pact.employ(inputOptions)

let prepared = transition.prepare({ date: Date.now(), test: 4 })
console.log(prepared)
// {
//   "month": 0.2727272727272727,
//   "week": 0.3076923076923077,
//   "day": 1,
//   "hour": 1,
//   "test": 0.8
// }

let reversed = transition.reverse({ test: 0.8 })
console.log(reversed)
