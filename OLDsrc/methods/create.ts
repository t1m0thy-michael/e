import { EventInterfacePrototype, EventInterface } from '../types'

import u from 'tim_util'

import pub from './pub'
import sub from './sub'
import remove from './remove'

const create = (): EventInterface => Object.create(Event, {
	topics: { value: [], writable: false }
})

const Event: EventInterfacePrototype = {

	pub: pub,
	sub: sub,
	remove: remove,
	create: create,

	toString: () => '[object EventBus]',
	toJson: function( this: EventInterface ) { return u.decycle(this.topics) }
}

export default create