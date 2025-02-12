import { keypress, type KeyPressEvent } from "@cliffy/keypress"

export class keyPress {
	public canceled = false
	constructor() {
		//console.log(`keyPress::constructor`)
		keypress().addEventListener("keydown", this.listener)
	}

	listener = (event: KeyPressEvent) => {
		if (event.ctrlKey && event.key === "c") {
			this.canceled = true
			keypress().dispose()
		}
	}
}
