import { getTimestamp, _random, _now } from "../helpers"

export const _FUNC = (v?: any) => v
export const _FILE = 'values.json'
export const _NUM = _random()
export const _INT = _now()
export const _STR = getTimestamp()
export const _SIZE = 3
export const _ARR = [_NUM, _INT, _STR]
export const _OBJ = { NUMBER: _NUM, INTEGER: _INT, STRING: _STR, FUNC: _FUNC }
export const _TYPES = [
  { desc: `Type ${typeof _NUM}, Value ${_NUM}`, value: _NUM },
	{ desc: `Type ${typeof _INT}, Value ${_INT}`, value: _INT },
	{ desc: `Type ${typeof _STR}, Value ${_STR}`, value: _STR },
	{ desc: `Type ${typeof _ARR}, Value ${_ARR}`, value: _ARR },
	{ desc: `Type ${typeof _OBJ}, Value ${_OBJ}`, value: _OBJ }
	{ desc: `Type ${typeof _FUNC}, Value ${_FUNC}`, value: _FUNC },
]
