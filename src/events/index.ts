import { Message, MessageReaction } from "discord.js";
import MessageEvents from "./message";
import MessageReactionAddEvents from "./messageReactionAdd";

export type EventName = "message" | "messageReactionAdd";
export type EventHandler<T = any> = (t: T) => Promise<void>;
export type EventHandlersList<T> = Array<EventHandler<T>>;

export type MessageEventHandler = EventHandler<Message>;
export type MessageReactionAddEventHandler = EventHandler<MessageReaction>;

export class EventsMap extends Map<EventName, EventHandler[]> {
    public constructor() {
        super();

        this.set("message", [] as EventHandlersList<Message>);
        this.set("messageReactionAdd", [] as EventHandlersList<MessageReaction>);
    }

    public add<T>(name: EventName, handler: EventHandler<T>): void {
        const prev = this.get(name) || [] as EventHandlersList<T>;
        prev.push(handler);
        this.set(name, prev);
    }
}

export { MessageEvents, MessageReactionAddEvents };
