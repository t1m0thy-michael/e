import { CreateToken } from './types.d'

export const createToken: CreateToken = (topic, id, fn) => 
	Object.create({}, {
		t: { value: topic, writable: false },
		i: { value: id, writable: false },
		fn: { value: fn, writable: false },
	})