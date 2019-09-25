import { EventInterface } from './types'
// event should handle all browser/window events
export const stdEvt = (evt: EventInterface) => {

	if (typeof window != 'undefined') {
		// const onAnyEvent = (e) => {
		// 	if (e.target.id)
		// 		pub(`${e.type}/#${e.target.id}`, e, e.target)

		// 	if (e.target.classList && e.target.classList.length > 0)
		// 		e.target.classList.forEach((val) => evt.pub(`${e.type}/.${val}`, e, e.target))

		// 	if (e.target.nodeName)
		// 		pub(`${e.type}/${e.target.nodeName.toLowerCase()}`, e, e.target)

		// 	pub(`${e.type}`, e, e.target)
		// }

		// MouseEvent
		window.addEventListener('click', (e) => evt.pub({ topic: 'click', data: { x: e.x, y: e.y, e: e } }))
		// window.addEventListener('click', onAnyEvent)
		window.addEventListener('dblclick', (e) => evt.pub({ topic: 'dblclick', data: { x: e.x, y: e.y, e: e } }))

		// let msedwn = false
		// window.addEventListener('mousedown', (e) => {)
		// 	if (!msedwn) msedwn = true
		// 	const timer = setInterval(() => {
		// 		if (!msedwn) clearInterval(timer)
		// 		pub({ topic: 'mousedown', data: { x: e.x, y: e.y, e: e } })
		// 	}, 100)

		// }
		// window.addEventListener('mouseup', (e) => {)
		// 	msedwn = false
		// 	pub({ topic: 'mousedown', data: { x: e.x, y: e.y, e: e } })
		// }
		// // window.addEventListener('mouseenter', (e) => onAnyEvent(e))
		// // window.addEventListener('mouseleave', (e) => onAnyEvent(e))
		window.addEventListener('mousemove', (e) => evt.pub({ topic: 'mousemove', data: { x: e.x, y: e.y, e: e } }))
		// window.addEventListener('mouseout', (e) => onAnyEvent(e))
		// window.addEventListener('mouseover', (e) => onAnyEvent(e))
		// window.addEventListener('mousewheel', (e) => onAnyEvent(e))
		// window.addEventListener('auxclick', (e) => onAnyEvent(e))
		// window.addEventListener('contextmenu', (e) => onAnyEvent(e))
		// window.addEventListener('wheel', (e) => onAnyEvent(e))
		// window.addEventListener('select', (e) => onAnyEvent(e))
		// window.addEventListener('pointerlockchange', (e) => onAnyEvent(e))
		// window.addEventListener('pointerlockerror', (e) => onAnyEvent(e))

		// // KeyboardEvent
		window.addEventListener('keydown', (e) => evt.pub({ topic: 'keydown', data: { key: e.key, code: e.keyCode, e: e } }))
		// window.addEventListener('keypress', (e) => evt.pub('keypress', { key: e.key, e }))
		// window.addEventListener('keyup', (e) => evt.pub('keyup', { key: e.key, e }))

		// // Network
		// window.addEventListener('online', (e) => onAnyEvent(e))
		// window.addEventListener('offline', (e) => onAnyEvent(e))

		// // Form
		// window.addEventListener('reset', (e) => onAnyEvent(e))
		// window.addEventListener('submit', (e) => onAnyEvent(e))

		// // Print 
		// window.addEventListener('beforeprint', (e) => onAnyEvent(e))
		// window.addEventListener('afterprint', (e) => onAnyEvent(e))

		// Resource
		// window.addEventListener('beforeunload', (e) => onAnyEvent(e))
		// window.addEventListener('unload', (e) => onAnyEvent(e))

		// // UI
		window.addEventListener('resize', (e) => evt.pub({ topic: 'resize', data: { width: window.innerWidth, height: window.innerHeight, e } }))
		// window.addEventListener('scroll', (e) => onAnyEvent(e))

		// FocusEvent
		//have to do focus events this way, they don't bubble
		// document.addEventListener('DOMContentLoaded', () => {
		// 	window.addEventListener('focusin', onAnyEvent, false);
		// 	window.addEventListener('focusout', onAnyEvent, false);
		// });

		// // focus events for the window/iframe etc
		// window.addEventListener('focus', (e) => onAnyEvent(e);)
		// window.addEventListener('blur', (e) => onAnyEvent(e);		)
	}
}