/**
 * Handles Discord.js client events.
 */
export abstract class WegbotEventHandler<T> {
    public readonly eventName: string;

    protected constructor(eventName: string) {
        this.eventName = eventName;
    }

    public abstract onTriggered(context: T): Promise<T>;
}
