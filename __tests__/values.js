const _FILE = "values.json"
const _FUNC = (v = null) => v
const _SIZE = 3
const _NUM = Math.random()
const _INT = Date.now()
const _STR = new Date().toLocaleString()
const _ARR = [_NUM, _INT, _STR]
const _OBJ = { NUMBER: _NUM, INTEGER: _INT, STRING: _STR, FUNC: _FUNC }
const _TYPES = [
	{ desc: `Type ${typeof _NUM}, Value ${_NUM}`, value: _NUM },
	{ desc: `Type ${typeof _INT}, Value ${_INT}`, value: _INT },
	{ desc: `Type ${typeof _STR}, Value ${_STR}`, value: _STR },
	{ desc: `Type ${typeof _ARR}, Value ${_ARR}`, value: _ARR },
	{ desc: `Type ${typeof _OBJ}, Value ${_OBJ}`, value: _OBJ },
	{ desc: `Type ${typeof _FUNC}, Value ${_FUNC}`, value: _FUNC }
]

module.exports = { _FUNC, _FILE, _NUM, _INT, _STR, _SIZE, _ARR, _OBJ, _TYPES }
