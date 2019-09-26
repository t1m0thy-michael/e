import { EventInterface, Sub, Token } from './types'
import { makeSureItsAnArray, makeID } from '@t1m0thy_michael/u'
import { createToken } from './createToken'

const SUBSCRIPTION_ID_LENGTH = 10

/**
 * Subscribe to an event.
 *
 * ```js
 * const myToken = e.sub({
 * 	topic: 'my/event', // topic to subscribe to
 * 	fn: (data, ctx, topic) => do stuff, // function to call on event
 * 	distinct: true, // only call fn if data has changed since last call
 * 	once: false, // unsubscribe after first call
 * 	description: 'An example event subscription' // info only, useful for debugging
 * })
 *```
 *
 */
export const sub: Sub = function (
	this: EventInterface,
	{
		topic,
		fn,
		distinct = false,
		once = false,
		minInterval = 0,
		description = undefined
	}
){
	const newID: string = makeID(SUBSCRIPTION_ID_LENGTH)
	const tokens: Token[] = []

	// can subscribe to more than one event at a time
	const topics = makeSureItsAnArray(topic)
	
	for (let i = 0; i < topics.length; i++){

		topic = topics[i].toLowerCase()

		if (!this.topics[topic]) this.topics[topic] = {}

		// check function is not already subscribed to event
		for (let prop in this.topics[topic]) {
			if (this.topics[topic][prop].fn === fn) {
				return [createToken(topic, prop, fn)]
			}
		}

		// add to topics object
		this.topics[topic][newID] = {
			fn: fn,
			distinct: distinct,
			once: once,
			previousData: undefined,
			minInterval: (minInterval) * 1000,
			lastPublished: 0,
			description: description,
		}

		// return array of tokens
		tokens.push(createToken(topic, newID, fn))

	}
	return tokens
}