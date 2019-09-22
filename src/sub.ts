import { EventInterface, Subscription, Token } from './types'

import { createToken } from './createToken'

import { makeSureItsAnArray, makeID, isFunction } from 'tim_util'

export interface Sub {
	(s: Subscription): Token[]
}

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

	// must have a topic<string> and fn<function> in obj
	if (!topic || !fn || !isFunction(fn)) throw 'Invalid Event Subscription'

	const newID: string = makeID(10)

	const tokens: Token[] = []

	const topics = makeSureItsAnArray(topic)
	
	for (let i = 0; i < topics.length; i++){

		topic = topics[i].toLowerCase()

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