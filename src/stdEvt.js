// event should handle all browser/window events
export const stdEvt = function (evt) {

	if (typeof window != 'undefined') {
		const onAnyEvent = (e) => {
			evt.pub({
				topic: `e/global/${e.type}`,
				data: e,
			})
		}

		// MouseEvent
		window.addEventListener('click', onAnyEvent)
		window.addEventListener('dblclick', onAnyEvent)
		window.addEventListener('mousedown', onAnyEvent)
		window.addEventListener('mouseup', onAnyEvent)

		window.addEventListener('mousemove', onAnyEvent)
		window.addEventListener('mousewheel', onAnyEvent)
		window.addEventListener('auxclick', onAnyEvent)
		window.addEventListener('contextmenu', onAnyEvent)
		window.addEventListener('wheel', onAnyEvent)
		window.addEventListener('select', onAnyEvent)

		// // KeyboardEvent
		window.addEventListener('keydown', onAnyEvent)
		window.addEventListener('keypress', onAnyEvent)
		window.addEventListener('keyup', onAnyEvent)

		// // Network
		window.addEventListener('online', onAnyEvent)
		window.addEventListener('offline', onAnyEvent)

		// // Print 
		window.addEventListener('beforeprint', onAnyEvent)
		window.addEventListener('afterprint', onAnyEvent)

		// // UI
		window.addEventListener('resize', onAnyEvent)
		window.addEventListener('scroll', onAnyEvent)

		// FocusEvent
		//have to do focus events this way, they don't bubble
		document.addEventListener('DOMContentLoaded', () => {
			window.addEventListener('focusin', onAnyEvent, false)
			window.addEventListener('focusout', onAnyEvent, false)
		})

		// focus events for the window/iframe etc
		window.addEventListener('focus',  onAnyEvent)
		window.addEventListener('blur', onAnyEvent)
	}
}