import { EventInterface, Subscription, Token } from '../types'

import u from 'tim_util'

const createToken = (topic: string, id: string, fn: Function) => Object.create({}, {
	t: { value: topic, writable: false },
	i: { value: id, writable: false },
	fn: { value: fn, writable: false },
})

const sub = function(
	this: EventInterface,
	{
		topic,
		fn,
		distinct = false,
		once = false,
		minInterval = 0,
		description = undefined
	}: Subscription
): Token[] {

	// must have a topic<string> and fn<function> in obj
	if (!topic || !fn || !u.isFunction(fn)) throw 'Invalid Event Subscription'

	const newID: string = u.makeID(10)

	const tokens: Token[] = []

	u.makeSureItsAnArray(topic).forEach((topic) => {

		topic = topic.toLowerCase()

		if (!this.topics[topic]) this.topics[topic] = {}

		// check function is not already subscribed to event
		for (let prop in this.topics[topic]) {
			if (this.topics[topic][prop].fn === fn) {
				return createToken(topic, prop, fn)
			}
		}

		this.topics[topic][newID] = {
			fn: fn,
			distinct: distinct || false,
			once: once || false,
			previousData: undefined,
			minInterval: (minInterval || 0) * 1000 || 0,
			lastPublished: 0,
			description: description,
		}

		tokens.push(createToken(topic, newID, fn))
	})

	return tokens
}

export default sub