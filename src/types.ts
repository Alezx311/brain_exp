export type UND = undefined
export type NO = UND | null
export type U = unknown
export type B = boolean
export type S = string
export type N = number
export type R = RegExp
export type O = Record<S, U> | { [key: S]: U }
export type A<T = any> = Array<T>
export type P<T> = Promise<T>
