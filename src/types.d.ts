
export interface Token {
	t: string,
	i: string,
	fn?: Function
}

export interface Publish {
	topic: string,
	data?: any,
	ctx?: any,
}

export interface SubscriptionBase {
	fn: Function,
	description?: string,
	distinct?: boolean,
	minInterval?: number,
	once?: boolean,
}

export interface Subscription extends SubscriptionBase {
	topic: string,
}

export interface InternalSubscription extends SubscriptionBase {
	lastPublished: number,
	minInterval: number,
	previousData: any,
}

export interface CreateToken {
	(topic: string, id: string, fn: Function): Token
}

export interface Sub {
	(s: Subscription): Token[]
}

export interface Pub {
	(obj: Publish): Promise<(any|undefined)[]>
}


export interface Remove {
	(t: Token | Token[]): true
}

export interface Create {
	(): EventInterface
}

export interface EventInterfacePrototype {
	pub: Pub,
	remove: Remove,
	sub: Sub,
	toString: () => string,
}

export interface EventInterface extends EventInterfacePrototype {
	topics: Topics,
}

export interface Topics {
	[key: string]: {
		[key: string]: InternalSubscription
	}
}