import { Message } from "discord.js";

export type EventName = "message";
export type EventHandler<T = any> = (t: T) => Promise<void>;
export type EventsList<T> = Array<EventHandler<T>>;

export class EventsMap extends Map<EventName, EventHandler[]> {
    public constructor() {
        super();

        this.set("message", [] as EventsList<Message>);
    }

    public add<T>(name: EventName, handler: EventHandler<T>): void {
        const prev = this.get(name) || [] as EventsList<T>;
        prev.push(handler);
        this.set(name, prev);
    }
}
