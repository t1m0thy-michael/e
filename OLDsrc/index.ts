import create from './methods/create'

// Create Global event object
// There will always be one global event object, even if event is loaded by multiple scripts
// Other event buses may be created using event.create()

const gbl = (<any>globalThis) || (<any>window) || (<any>self) || (<any>global) // node and browser compatible
if (!gbl.event) gbl.event = create()

import stdEvt from './utils/standardEvents'

// regester standard global env events for the default event bus
stdEvt(gbl.event)

export default gbl.event