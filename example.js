const brain = require("brain.js")

const trainingData = `В приятну ночь при лунном свете
Представить счастливо себе
Что некто есть еще на свете
Кто думает и о тебе
Челнок ко брегу приплывает
Из темной хаты выбегает
Младая дева стройный стан
Власы небрежно распущенны
Улыбка тихий взор очей
И грудь и плечи обнаженны
Всё мило всё пленяет в ней
И вот они обняв друг друга
Для них с любовью настает
Но в изумленьи молчаливом
Кого же в рыбаке счастливом
Наш юный витязь узнает?`.split("\n")

const lstm = new brain.recurrent.LSTM()
const result = lstm.train(trainingData, {
	iterations: 1500,
	log: (details) => console.log(details),
	errorThresh: 0.011
})

const run1 = lstm.run("Представить")
const run2 = lstm.run("Что")
const run3 = lstm.run("Кто")
const run4 = lstm.run("Челнок")
const run5 = lstm.run("Из")
const run6 = lstm.run("Младая")
const run7 = lstm.run("Улыбка")
const run8 = lstm.run("И")
const run9 = lstm.run("Всё")
const run10 = lstm.run("И")
const run11 = lstm.run("друга")
const run12 = lstm.run("настает")
const run13 = lstm.run("молчаливом")
const run14 = lstm.run("счастливом")
const run15 = lstm.run("Власы")

console.log("Training result: ", {
	result,
	run1,
	run2,
	run3,
	run4,
	run5,
	run6,
	run7,
	run8,
	run9,
	run10,
	run11,
	run12,
	run13,
	run14,
	run15
})
