import {  EventTypes, type EventMessage,  type Message, messagesListener } from "./../mod.ts"

addEventListener(EventTypes.Customer, (msg: EventMessage<Message>) => {
	console.log(`CustomerEvent::${msg.detail?.type}`)
})

await new messagesListener(["customer"]).pull(1000)