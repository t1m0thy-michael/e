
export interface Token {
	t: string,
	i: string,
	fn?: Function
}

export interface Publish {
	topic: string,
	data: any,
	ctx?: any,
	// skipSchemaValidation?: boolean,
}

export interface Pub {
	(obj: Publish): Promise<any[] | undefined>
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

export interface Sub {
	(s: Subscription): Token[]
}

export interface Remove {
	(t: Token): void
}

export interface Create {
	(): EventInterface
}

export interface EventInterfacePrototype {
	pub: Pub,
	remove: Remove,
	sub: Sub,
	create: Create,
	toString: () => string,
	toJson: () => object,
}

export interface EventInterface extends EventInterfacePrototype {
	topics: Topics,
}

export interface Topics {
	[key: string]: {
		[key: string]: InternalSubscription
	}
}