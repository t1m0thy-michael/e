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
	stdEvt: stdEvt,
	toString: () => '[object Eventbus]',
}

const gbl = (globalThis) || (window) || (self) || (global) // node and browser compatible
if (!gbl.__event) {
	gbl.__event = create()
}

export const event = gbl.__event
export default gbl.__event