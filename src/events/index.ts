import { WegbotEventHandler } from "./EventHandler";
import { MessageEventHandler } from "./message";
import { ReadyEventHandler } from "./ready";

export const events: Array<WegbotEventHandler<any>> = [
    new ReadyEventHandler(),
    new MessageEventHandler()
];

export { WegbotEventHandler };
