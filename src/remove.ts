import { EventInterface, Remove } from './types'
import { makeSureItsAnArray, sizeOf } from '@t1m0thy_michael/u'

/**
 * Remove subscription.
 * ```js
 * // create new subscription...
 * const myToken = e.sub(mySubscription)
 * // when subscription no longer required...
 * e.remove(myToken)
 * ```
 * 
 */
export const remove: Remove = function (this: EventInterface, token) {
	const tokens = makeSureItsAnArray(token)
	for (let token of tokens) {
		if (this.topics[token.t] && this.topics[token.t][token.i]) delete this.topics[token.t][token.i]
		if (sizeOf(this.topics[token.t]) == 0) delete this.topics[token.t]
	}
	return true
}