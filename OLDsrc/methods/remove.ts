import { EventInterface, Token } from '../types'

import u from 'tim_util'

const remove = function (this: EventInterface, token: Token) {
	u.makeSureItsAnArray(token).forEach((token) => {
		u.makeSureItsAnArray(token.t).forEach((tknT) => {
			if (this.topics[tknT][token.i]) delete this.topics[tknT][token.i]
			if (u.sizeOf(this.topics[tknT]) == 0) delete this.topics[tknT]
		})
	})
}

export default remove
