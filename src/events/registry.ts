import Discord from "discord.js";

import { WegbotEvent } from "./baseEvent";
import { ReadyEvent } from "./ready";
import { EchoMessageEvent } from "./message";

const KnownEvents: Array<WegbotEvent> = [
    new ReadyEvent(),
    new EchoMessageEvent()
];

export class EventRegistry {
    private _registry : Array<WegbotEvent> = new Array<WegbotEvent>();

    public applyAll(client: Discord.Client) : void {
        this._registry.forEach((e: WegbotEvent) => {
            client.on(e.eventName, e.onTriggered.bind(e));
        });
    }

    public init(): void {
        KnownEvents.forEach(this.register.bind(this));
    }
    
    public register(event: WegbotEvent): void {
        this._registry.push(event);
    }
}
