const brain = require("brain.js")
const Helpers = require("./helpers")

const fileContent = Helpers.fileRead("./training/users.json")
const data = JSON.parse(fileContent)

const dataEmails = data.reduce((acc, obj) => [...acc, obj?.email], []).filter(Boolean)
const dataNames = data.reduce((acc, v) => [...acc, `${v?.first_name} ${v?.last_name}`], []).filter(Boolean)
const dataIps = data.reduce((acc, v) => [...acc, v?.ip_address], []).filter(Boolean)

const networkEmails = new brain.recurrent.LSTM(Helpers.OPTIONS_BRAIN_LSTM)
const networkNames = new brain.recurrent.LSTM(Helpers.OPTIONS_BRAIN_LSTM)
const networkIps = new brain.recurrent.LSTM(Helpers.OPTIONS_BRAIN_LSTM)
console.log("Network created successfully")

const trainEmailResults = networkEmails.train(dataEmails, Helpers.OPTIONS_BRAIN_TRAIN)
const trainNameResults = networkNames.train(dataNames, Helpers.OPTIONS_BRAIN_TRAIN)
const trainIpResults = networkIps.train(dataIps, Helpers.OPTIONS_BRAIN_TRAIN)
console.log("Network Training success")

Helpers.fileWrite("./training/Emails.json", JSON.stringify(trainEmailResults))
Helpers.fileWrite("./training/Names.json", JSON.stringify(trainNameResults))
Helpers.fileWrite("./training/Ips.json", JSON.stringify(trainIpResults))
console.log("Training Results saved to file")

const EmailResults = Helpers.genMany(100, () => ({ result: networkEmails.run() }))
const NameResults = Helpers.genMany(100, () => ({ result: networkNames.run() }))
const IpResults = Helpers.genMany(100, () => ({ result: networkIps.run() }))

Helpers.fileWrite("./results/Emails.json", JSON.stringify(EmailResults))
Helpers.fileWrite("./results/Names.json", JSON.stringify(NameResults))
Helpers.fileWrite("./results/Ips.json", JSON.stringify(IpResults))
console.log("Results saved to file")
