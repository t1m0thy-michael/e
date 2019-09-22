import { EventInterfacePrototype, EventInterface, Token } from './types'

import { decycle } from 'tim_util'

import sub from './sub'

const Event: EventInterfacePrototype = {

	// methods
	pub: null,
	sub: sub,
	remove: null,
	create: null,

	// language features
	toString: () => '[object EventBus]',
	toJson: function (this: EventInterface) { return decycle(this.topics) }
}

const create = (): EventInterface => Object.create(Event, {
	topics: { value: [], writable: false }
})