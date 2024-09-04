export * from "./lib/messages/messages.ts"
export type { EventMessage } from "./lib/messages/messages.ts"

/**
 * messages: A helper to listen to messages in commercetools, thru the messages endpoint
 * Usage:

import { listener, EventTypes, EventMessage,  Message } from "https://deno.land/x/commercetools_demo_sdk/messages.ts"

addEventListener(EventTypes.Customer, (msg: EventMessage<Message>) => {
   console.log(`CustomerEvent::${msg.detail?.type}`)
});

await new listener(["customer"]).pull(1000)
 */
