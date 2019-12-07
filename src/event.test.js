const chai = require('chai')
const assert = chai.assert

import { create } from './index'

describe('event', function () {

	const event = create()

	it('pub is a function', function () {
		assert.ok(typeof event.pub === 'function')
	})

	it('sub is a function', function () {
		assert.ok(typeof event.sub === 'function')
	})

	it('remove is a function', function () {
		assert.ok(typeof event.remove === 'function')
	})

	it('toString behaves itself', function () {
		assert.ok(typeof event.toString === 'function')
		assert.ok(event.toString() === '[object Eventbus]')
	})
})