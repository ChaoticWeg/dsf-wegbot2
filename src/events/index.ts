import { WegbotEvent } from "./baseEvent";
import { ReadyEvent } from "./ready";
import { EchoMessageEvent } from "./message";
import { EventRegistry } from "./registry";

const Events: Array<WegbotEvent> = [
    new ReadyEvent(),
    new EchoMessageEvent()
];

export { Events };
export { EventRegistry };

export function registerEvents(registry: EventRegistry): void {
    Events.forEach(e => { registry.register(e.eventName, e.onTriggered); });
}
