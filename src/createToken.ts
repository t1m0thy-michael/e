import { Token } from './types'

export interface IcreateToken {
	(topic: string, id: string, fn: Function): Token
}

export const createToken: IcreateToken = (topic, id, fn) => 
	Object.create({}, {
		t: { value: topic, writable: false },
		i: { value: id, writable: false },
		fn: { value: fn, writable: false },
	})