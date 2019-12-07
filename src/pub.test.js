const chai = require('chai')
const assert = chai.assert

import { create } from './index'

describe('event.pub()', function () {

	it('Publishes topic passing correct args to subscribed fn', function () {
		const event = create()

		let calls = 0
		let data = null
		let ctx = null
		let topic = null

		const subscription = {
			fn: (arg1, arg2, arg3) => {
				calls++
				data = arg1
				ctx = arg2
				topic = arg3
			},
			topic: 'myTopic',
		}
		event.sub(subscription)

		event.pub({
			topic: 'myTopic',
			data: 'myData',
			ctx: 'myCtx'
		})

		assert.equal(calls, 1, 'Assert subscribed fn called once')
		assert.equal(data, 'myData', 'Assert subscribed fn called with correct first arg')
		assert.equal(ctx, 'myCtx', 'Assert subscribed fn called with correct second arg')
		assert.equal(topic, 'mytopic', 'Assert subscribed fn called with correct third arg')

		event.pub({
			topic: 'myTopic',
			data: 'myData',
			ctx: 'myCtx'
		})

		assert.equal(calls, 2, 'Assert subscribed fn called a second time')
	})

	it('Returns a promise', async function () {
		const event = create()
		const result = event.pub({
			topic: 'myTopic',
			data: 'myData'
		})
		assert.instanceOf(result, Promise, 'Returns a promise')
	})

	it('Return Promise resolves to an empty array when there are no subscribers', async function () {
		const event = create()
		const result = await event.pub({
			topic: 'noSubscribers',
			data: 'myData'
		})
		assert.isArray(result, 'Returns an array')
		assert.lengthOf(result, 0, 'Returns empty arrray')
	})

	it('Return Promise resolves to an array of subscribers return values', async function () {
		const event = create()

		event.sub({
			topic: 'myTopic',
			fn: () => 123
		})

		event.sub({
			topic: 'myTopic',
			fn: () => 456
		})

		const result = await event.pub({
			topic: 'myTopic',
			data: 'myData'
		})

		const expected_results = [123, 456]

		assert.equal(result.length, 2, 'Return array is expected length')
		assert.ok(result.every((val) => expected_results.includes(val)), 'Return array contains expected values')
	})

	it('Respects distinct option', function () {

		const event = create()

		let total = 0

		event.sub({
			topic: 'myTopic',
			fn: (val) => total += val,
			distinct: true,
		})

		event.pub({ topic: 'myTopic', data: 1 })
		event.pub({ topic: 'myTopic', data: 2 })
		event.pub({ topic: 'myTopic', data: 2 })
		event.pub({ topic: 'myTopic', data: 8 })

		assert.equal(total, 11, 'fn was not called for duplicate data')
	})

	it('Respects minInterval option', function () {

		const event = create()

		let total = 0

		event.sub({
			topic: 'myTopic',
			fn: (val) => total += val,
			minInterval: 1,
		})

		event.pub({ topic: 'myTopic', data: 1 })
		event.pub({ topic: 'myTopic', data: 1 })
		event.pub({ topic: 'myTopic', data: 1 })

		// set last publish back so that the next publication will run with the interval passed
		for (let id in event.topics.mytopic) {
			event.topics.mytopic[id].lastPublished -= 1001
		}
		event.pub({ topic: 'myTopic', data: 100 })

		assert.equal(total, 101, 'fn was not called before interval')
	})

	it('Respects once option', async function () {

		const event = create()

		let total = 0

		event.sub({
			topic: 'myTopic',
			fn: (val) => total += val,
			once: true,
		})

		await event.pub({ topic: 'myTopic', data: 1 })

		assert.equal(total, 1, 'fn was called')
		assert.isUndefined(event.topics.mytopic, 'subscription & empty topic removed')

	})
})