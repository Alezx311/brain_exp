const brain = require("brain.js")
const { getWords, getUnical } = require("./values")
const Values = require("./values")
const { getWordFirst } = Values

const NET_FILE = "/networks/brainText.json"
const RESULTS_FILE = "/results/brainText.json"

// const book = Values.fileRead(Values.FILE_INPUT)
const book = `В приятну ночь при лунном свете
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
Наш юный витязь узнает?
Хазарский хан избранный славой
Ратмир в любви в войне кровавой
Его соперник молодой
Ратмир в пустыне безмятежной
Людмилу славу позабыл
И им навеки изменил
В объятиях подруги нежной
Герой приближился и вмиг
Отшельник узнает Руслана
Встает летит Раздался крик
И обнял князь младого хана
“Что вижу я?  спросил герой
Зачем ты здесь зачем оставил
Тревоги жизни боевой
И меч который ты прославил?`
const lines = Values.getLines(book).filter(Boolean)
const words = Values.getWords(book).filter(Boolean)

const network = new brain.recurrent.LSTM()
const trainData = Values.getArray(100).map(() => {
	const input = [Values.getInt(20), Values.getInt(20)]
	const output = "" + input[1] + " " + Values.getArrayElementMany(words, input[0]).join(" ")
	return { input, output: [output] }
})
network.train(trainData, { ...Values.BRAIN_TRAINING_OPTIONS, hidden: [5] })
Values.getArray(100).map(() => {
	const values = [Values.getInt(20), Values.getInt(20)]
	console.log(`${values} ->`, { values, results: network.run(values) })
})
