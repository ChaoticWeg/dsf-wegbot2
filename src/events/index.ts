import { WegbotEvent } from "./baseEvent";
import { ReadyEvent } from "./ready";
import { EchoMessageEvent } from "./message";

export default (() => {
    
    // instantiate each type of event - they will register themselves
    const events: Array<WegbotEvent> = [
        new ReadyEvent(),
        new EchoMessageEvent()
    ];

    return events;

})();

export { EventRegistry } from "./registry";
