import { sub } from './sub'
import { pub } from './pub'
import { remove } from './remove'


const Event = {
	pub: pub,
	sub: sub,
	remove: remove,
	toString: () => '[object Eventbus]',
}

export const create = () => Object.create(Event, {
	topics: { value: [], writable: false }
})

export const event = (() => {
	const gbl = globalThis || window || self || global
	if (!gbl.e) {
		gbl.e = create()
	}
	return gbl.e
})()

export default event