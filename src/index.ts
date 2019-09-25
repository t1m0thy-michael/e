import { EventInterfacePrototype, EventInterface } from './types'

import { sub } from './sub'
import { pub } from './pub'
import { remove } from './remove'
import { stdEvt } from './stdEvt'

export interface Create {
	(): EventInterface
}

export const create: Create = (): EventInterface => Object.create(Event, {
	topics: { value: [], writable: false }
})

const Event: EventInterfacePrototype = {
	pub: pub,
	sub: sub,
	remove: remove,
	toString: () => '[object Eventbus]',
}

const gbl = (<any>globalThis) || (<any>window) || (<any>self) || (<any>global) // node and browser compatible
if (!gbl.__event) {
	gbl.__event = create()
	stdEvt(gbl.__event)
}

export const event = gbl.__event
export default gbl.__event