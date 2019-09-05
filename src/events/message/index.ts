import { MessageUtils } from "../../utils";
import { IEventsNamespace } from "../EventsNamespace";
import { MessageEventHandler } from "../index";

class MessageEvents implements IEventsNamespace {
    public asList(): MessageEventHandler[] {
        return [
            MessageUtils.logMessageAsync,
            MessageUtils.bro
        ];
    }
}

export default (() => new MessageEvents())();
