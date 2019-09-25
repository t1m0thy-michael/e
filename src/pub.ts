import { Pub, EventInterface } from './types'

/**
 * Publish an event.
 *
 * ```js
 * const resultArray = e.pub({
 * 	topic: 'client/updated', // event to trigger
 * 	data: { arbitrary: 'data' }, // data passed to subscribers
 * 	ctx: clientObject, // additional context for the event, 
 * })
 *```
 * 
 */
export const pub: Pub = async function (
	this: EventInterface,
	{
		topic,
		data,
		ctx,
	}) {

	topic = topic.toLowerCase()

	const returnArray: any[] = []
	
	// only publish if subs exist
	if (!this.topics[topic]) return returnArray

	//used for last published comparrison in loop
	const timeNow = Date.now()

	// main loop over subs
	for (let key in this.topics[topic]){
		const subscriber = this.topics[topic][key]

		if (subscriber.distinct && subscriber.previousData === data) continue
		subscriber.previousData = data

		if (timeNow < subscriber.lastPublished + subscriber.minInterval) continue
		subscriber.lastPublished = timeNow

		returnArray.push(subscriber.fn(data, ctx, topic))

		if (subscriber.once) this.remove({ t: topic, i: key })
	}

	return returnArray
}

export default pub