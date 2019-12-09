import { sub } from './sub'
import { pub } from './pub'
import { remove } from './remove'
import { stdEvt } from './stdEvt'

export const create = () => Object.create(Event, {
	topics: { value: [], writable: false }
})

const Event = {
	pub: pub,
	sub: sub,
	remove: remove,
	toString: () => '[object Eventbus]',
}

export const event = (() => {
	const gbl = globalThis || window || self || global
	if (!gbl.e) {
		gbl.e = create()
		stdEvt(gbl.e)
	}
	return gbl.e
})()

export default event