const chai = require('chai')
const assert = chai.assert

import { create } from './index'

describe('event.sub()', function () {

	it('Returns a token', function () {
		const event = create()
		const fn1 = () => true
		const myToken1 = event.sub({
			fn: fn1,
			topic: 'myTopic',
		})
		assert.isDefined(myToken1, 'A token is returned')
	})

	it('Has property [topics]', function () {
		const event = create()
		assert.isDefined(event.topics, 'event.topics is defined')
		assert.isArray(event.topics, 'event.topics is an array')
	})

	it('Adds topics to event.topics', function () {
		const event = create()

		assert.lengthOf(event.topics, 0, 'Topics starts empty')
		assert.lengthOf(Object.keys(event.topics), 0, 'Topics starts empty')

		const fn1 = () => true
		const subscription1 = {
			fn: fn1,
			topic: 'myTopic1',
		}
		event.sub(subscription1)

		assert.lengthOf(Object.keys(event.topics), 1, 'First topic added')

		const fn2 = () => true
		const subscription2 = {
			fn: fn2,
			topic: 'myTopic2',
		}
		event.sub(subscription2)

		assert.lengthOf(Object.keys(event.topics), 2, 'Second topic added')
	})

	it('Adds new subscription to event.topics.mytopic', function () {
		const event = create()

		const fn1 = () => true
		const subscription = {
			fn: fn1,
			topic: 'myTopic',
		}

		event.sub(subscription)

		assert.isDefined(event.topics.mytopic, 'Subscription added to event.topics.mytopic')
		assert.lengthOf(Object.keys(event.topics.mytopic), 1, 'There is a subscription inside mytopic')
	})

	it('Adds multiple subscriptions to event.topics.mytopic', function () {
		const event = create()

		const fn1 = () => true
		const subscription1 = {
			fn: fn1,
			topic: 'myTopic',
		}
		event.sub(subscription1)
		assert.lengthOf(Object.keys(event.topics.mytopic), 1, 'There is a subscription inside mytopic')

		const fn2 = () => true
		const subscription2 = {
			fn: fn2,
			topic: 'myTopic',
		}
		event.sub(subscription2)
		assert.lengthOf(Object.keys(event.topics.mytopic), 2, 'There are multiple subscriptions inside mytopic')
	})

	it('Does not add duplicate subscriptions to event.topics.mytopic', function () {
		const event = create()

		const fn = () => true
		const subscription = {
			fn: fn,
			topic: 'myTopic',
		}
		event.sub(subscription)
		event.sub(subscription)

		assert.lengthOf(Object.keys(event.topics.mytopic), 1, 'There are multiple subscriptions inside mytopic')
	})
})