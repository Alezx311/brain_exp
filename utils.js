const util = require("util")

const UND = undefined
const NULL = null
const ERR = new Error('Some Error')
const STR = 'Some message'
const NUM = 42
const ARR = [msg, num]
const OBJ = {msg, num}
const FUNC = (...values) => values 
const SYM = new Symbol('Symbol example')
const BIG = NUM * Number.MAX_VALUE
const BLN = false
const SOURCES = [
  { value: ERR, desc: 'ERR', type: typeof ERR},
  { value: STR, desc: 'STR', type: typeof STR},
  { value: UND, desc: 'UND', type: typeof UND},
  { value: NULL, desc: 'NULL', type: typeof NULL},
  { value: NUM, desc: 'NUM', type: typeof NUM},
  { value: ARR, desc: 'ARR', type: typeof ARR},
  { value: OBJ, desc: 'OBJ', type: typeof OBJ},
  { value: FUNC, desc: 'FUNC', type: typeof FUNC},
  { value: SYM, desc: 'SYM', type: typeof SYM},
  { value: BIG, desc: 'BIG', type: typeof BIG},
  { value: BLN, desc: 'BLN', type: typeof BLN},
  
]
const TYPEOF = ["string", "number", "function", "object", "boolean", "bigint", "symbol", "undefined"]
const VALUES = { array: ARR, string: STR, number: NUM, function: FUNC, object: OBJ, boolean: BLN, bigint: BIG, symbol: SYM, undefined: UND, null: NULL, sources: SOURCES, type: TYPEOF }


const valueOr = (v1, v2 = null) => v1 ? v1 : v2
const valueOrArr = (...vArr) => valueOr(vArr.length > 1 ? vArr : vArr[0])
const _type = (...vArr) => vArr.map(el => typeof el)
const _msg = (...vArr) => vArr.reduce((acc, el) => [...acc, toStr(el)], []).join('\n')
const is = (...vArr) => vArr.every((v1) => v1 !== null && v1 !== undefined)
const isStr = (...vArr) => vArr.every(v1 => _type(v1) === 'string') 
const isNum = (...vArr) => vArr.every(v1 => _type(v1) === 'number') 
const isFunc = (...vArr) => vArr.every(v1 => _type(v1) === 'function') 
const isObj = (...vArr) => vArr.every(v1 => _type(v1) === 'object') 
const isBool = (...vArr) => vArr.every(v1 => _type(v1) === 'boolean') 
const isBig = (...vArr) => vArr.every(v1 => _type(v1) === 'bigint') 
const isSym = (...vArr) => vArr.every(v1 => _type(v1) === 'symbol') 
const isUnd = (...vArr) => vArr.every(v1 => _type(v1) === 'undefined') 
const isLen = (...vArr) =>  vArr.every(v1 => isTypeStr(v1) || isTypeArr(v1))
const isLenMin = (v, l) => isLen(v) && v.length > l
const isLenMax = (v, l) => isLen(v) && v.length < l
const toArr = (v1, ...vArr) => vArr.map(el => isArr(el) ? el : [el])
const merge = (v1, v2) => {
  if(isObj(v1, v2)) return {...v1, ...v2}
  if(isArr(v1, v2)) return [...v1, ...v2]
  return [v1,v2]
}
const has = (v1, v2) => {
  const arr1 = toArr(v1)
  const arr2 = toArr(v2)
  return arr1.some((el) => arr2.includes(el))
}
const every = (v1, v2) => {
  const arr1 = toArr(v1)
  const arr2 = toArr(v2)
  return arr1.every((el) => arr2.includes(el))
}
const not = (v1, v2) => {
  const arr1 = toArr(v1)
  const arr2 = toArr(v2)
  return !arr1.some((el) => arr2.includes(el))
}
const not = (v1, v2) => isArr(v1) ? !v1.includes(v2): v1 !== v2
const not = (v, ...vArr) => vArr.every(el => isFunc(el) ? el(v) : el !== v)
const toArr = (...values) => values
const toObj = (value) => isObj(value) ? value : toStatObj(value)
const toStatObj = (value, desc = typeof value, ...args) => ({ desc, value, type: typeof value, json: toStr(value), cb: () => value, isTruthy: !!value, args })
const toType = (...v) =>  TYPEOF.includes(v) ? v : typeof v
const isType = (v1, v2) => {
  const vType = typeof v1
  const vType = isTypeDesc(v2) ? v2 : typeof v2
  if(isArr(tp)) {
    return tp.includes(vType)
  }

  isType(tp) ? typeof v1 === tp : isArr(tp) ? v2.every(el => ) typeof v1 === typeof v2
const is = (v1, v2) =>  isFunc(v2) ? v2(v1) : v1 === v2
const isStr = (v) => isTypeStr(v) && v.length > 0
const isNum = (v) => isTypeNum(v) && v.length > 0
const isFunc = (v) => isTypeFunc(v) && v.length > 0
const isObj = (v) => isTypeObj(v) && v.length > 0
const isBool = (v) => isTypeBool(v) && v.length > 0
const isBig = (v) => isTypeBig(v) && v.length > 0
const isSym = (v) => isTypeSym(v) && v.length > 0
const isUnd = (v) => isTypeUnd(v) && v.length > 0

const isEqual = (v1, ...vArr) => vArr.length > 1 && vArr.includes(v1) 
const isNotEqual = (v1, ...vArr) => vArr.length > 1 && vArr.every(el => el !== v1) 
const isNotType = (v1, ...vArr) => vArr.every(el =>  el !== v1) 
const isEqual = (v1, ...vArr) => vArr.length > 1 && vArr.some(el => el === v1) 
const isNotEqual = (v, ...compares) => compares.length > 1 ? !compares.includes(v) : compares !== v
const isType = (v, typeValue) =>   this.isTypeString(v) && this.TYPEOF.includes(v)
	const isTruthy = (v = null) => !!v
	const isType = (v = null, v2) => typeof v1 === this.isTypeOfValue(v2) ? v2 : typeof v2
	const is = (v1 = null, eq) => v !== null && v !== undefined && eq ? v === eq : v
	const isType = (v1 = null, v2 = null) => this.type(v1) === this.type(v2)
	const toCallback = (v = null) => typeof v === 'function' ? v : (v) => v === v
	const isArrStr = (v = null) => this.isArr(v) && v.every(el => this.isStr(el))
	const isArrNum = (v = null) => this
const isTypeFunc = (v) => toType(v) === 'function'
const toEvery = (fn, ...values) => toType(fn) === 'function' values.map(fn)
const toArr = (...values) => values
const isArr = v => !!v && typeof v === 'object' && Array.isArray(v)
const toObj = (v) => !isArr(v) && isObj(v) ? v : { v }
const toStr = (v) => isArr(v) ? v.join('\n') : JSON.stringify(toObj(v), null, 2)
const isElem = (v, compared) => ().includes(compared)
const isType = (v, ...types) => v !== null && types.includes(typeof v)
const isObj = v => !isArr(v) && isType(v)
const toProps = v => isObj(v) && Object.getOwnPropertyNames(v)
const isArrElement = (v, ...props) => isArr(v) && props.every(p => v.includes(p))
const isObjProperty = (v, ...props) => isObj(v) && props.every(p => v.includes(p))
// const toProps = v => isObj(v) ? Object.getOwnPropertyNames(v) : []
// const isEqual = (v, ...values) => values.some(el => el === v)
// const isNotEqual = (v, ...values) => !isEqual(v, ...values)
// const isHasProp = (v, ...props) => isObj?.type === 'string'
// const func = (v) =>  isHasProps(v, 'v') ? v : ({ v, type: typeof v })  ? v : ({ v, type: typeof v})
//   ? {...v}
// const v = { prop: "Some object property" }
// 		const format = util.format(v)
// 		const formatWithOptions = util.formatWithOptions({ colors: true }, "See object %O", { foo: 42 })
// 		const getSystemErrorMap = util.getSystemErrorMap()
// 		const toUSVString = util.toUSVString(v)
// 		const inspect = util.inspect(v)
// 		const debuglog = util.debuglog(v)
// 		const log = util.log(v)
// 		const isArray = util.isArray(v)
// 		const isRegExp = util.isRegExp(v)
// 		const isDate = util.isDate(v)
// 		const isError = util.isError(v)
// 		const isBoolean = util.isBoolean(v)
// 		const isBuffer = util.isBuffer(v)
// 		const isFunction = util.isFunction(v)
// 		const isNull = util.isNull(v)
// 		const isNullOrUndefined = util.isNullOrUndefined(v)
// 		const isNumber = util.isNumber(v)
// 		const isObject = util.isObject(v)
// 		const isPrimitive = util.isPrimitive(v)
// 		const isString = util.isString(v)
// 		const isSymbol = util.isSymbol(v)
// 		const isUndefined = util.isUndefined(v)
// 		const deprecate = util.deprecate(v)
// 		const isDeepStrictEqual = util.isDeepStrictEqual(v, {...v})
// 		const stripVTControlCharacters = util.stripVTControlCharacters(v.prop)
// 		const promisify = util.promisify()
// 		const parseArgs = util.parseArgs(promisify)
// 		const callbackify = util.callbackify(v)
// const examples = {
// 	format,
// 	formatWithOptions,
// 	getSystemErrorName,
// 	getSystemErrorMap,
// 	log,
// 	toUSVString,
// 	inspect,
// 	isArray,
// 	isRegExp,
// 	isDate,
// 	isError,
// 	inherits,
// 	debuglog,
// 	isBoolean,
// 	isBuffer,
// 	isFunction,
// 	isNull,
// 	isNullOrUndefined,
// 	isNumber,
// 	isObject,
// 	isPrimitive,
// 	isString,
// 	isSymbol,
// 	isUndefined,
// 	deprecate,
// 	isDeepStrictEqual,
// 	stripVTControlCharacters,
// 	callbackify,
// 	promisify,
// 	parseArgs
// }
// console.log(examples);

// module.exports = {
// 	format,
// 	formatWithOptions,
// 	getSystemErrorName,
// 	getSystemErrorMap,
// 	log,
// 	toUSVString,
// 	inspect,
// 	isArray,
// 	isRegExp,
// 	isDate,
// 	isError,
// 	inherits,
// 	debuglog,
// 	isBoolean,
// 	isBuffer,
// 	isFunction,
// 	isNull,
// 	isNullOrUndefined,
// 	isNumber,
// 	isObject,
// 	isPrimitive,
// 	isString,
// 	isSymbol,
// 	isUndefined,
// 	deprecate,
// 	isDeepStrictEqual,
// 	stripVTControlCharacters,
// 	callbackify,
// 	promisify,
// 	parseArgs
// }
