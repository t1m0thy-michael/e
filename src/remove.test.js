const chai = require('chai')
const assert = chai.assert

import { create } from './index'

describe('event.remove()', function () {

	it('Removes a subscription and empty topic', function () {
		const event = create()
		const fn1 = () => true
		const subscription1 = {
			fn: fn1,
			topic: 'myTopic',
		}
		const myToken = event.sub(subscription1)
		event.remove(myToken)
		assert.lengthOf(Object.keys(event.topics), 0, 'Removes last subscription AND topic from topics')
	})

	it('Removes single subscription from topic', function () {
		const event = create()
		const fn1 = () => true
		const subscription1 = {
			fn: fn1,
			topic: 'myTopic',
		}
		const myToken1 = event.sub(subscription1)

		const fn2 = () => true
		const subscription2 = {
			fn: fn2,
			topic: 'myTopic',
		}
		const myToken2 = event.sub(subscription2)

		event.remove(myToken1)
		assert.isDefined(event.topics.mytopic, 'Topic is still defined')
		assert.lengthOf(Object.keys(event.topics.mytopic), 1, 'Removes last subscription AND topic from topics')
	})

	it('Doesn\'t cause a problem if you remove a subscription twice', function () {
		const event = create()
		const fn = () => true
		const subscription = {
			fn: fn,
			topic: 'myTopic',
		}
		const myToken = event.sub(subscription)

		assert.ok(event.remove(myToken))
		assert.ok(event.remove(myToken))
	})
})