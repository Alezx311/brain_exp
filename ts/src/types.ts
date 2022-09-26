export type No = null | undefined
export type R = RegExp
export type U = unknown
export type S = string
export type N = number
export type B = boolean
export type A<T = any> = Array<T>
export type O = Record<S, U> & { [key: S]: U }
export type F<T1 = any, T2 = any> = (...args: tArgs<T1>) => T2

export type tKeys<T> = A<keyof T & S>
export type tValues<T> = A<T[keyof T]>
export type tEntries<T> = A<[keyof T & S, T[keyof T]]>
export type tArgs<T> = T extends A ? [...T] : [T]
