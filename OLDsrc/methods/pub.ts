import { Publish, EventInterface } from '../types'

import u from 'tim_util'

const pub = async function(
this: EventInterface,
{
	topic,
	data,
	ctx,
	// skipSchemaValidation = true
}: Publish): Promise<any[]> {

	if (!topic) return []

	topic = topic.toLowerCase()

	// publication must specify a topic that has subscribers.
	if (!u.isString(topic)) return []
	if (!this.topics[topic]) return []

	const rtnVals: any[] = []

	const timeNow = Date.now()
	
	Object.keys(this.topics[topic])
		.forEach((key) => {
			const subscriber = this.topics[topic][key]

			if (subscriber.distinct && subscriber.previousData === data) return
			subscriber.previousData = data

			if (timeNow < subscriber.lastPublished + subscriber.minInterval) return
			subscriber.lastPublished = timeNow

			rtnVals.push(subscriber.fn(data, ctx, topic))

			if (subscriber.once) this.remove({ t: topic, i: key })
		})

	return rtnVals
}

export default pub