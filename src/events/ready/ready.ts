import { WegbotEvent } from "../baseEvent";

export class ReadyEvent extends WegbotEvent {
    public constructor() {
        super('ready');
    }

    public onTriggered() : void {
        console.log('bot is ready');
    }
}
