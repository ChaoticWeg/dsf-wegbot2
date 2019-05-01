import { EmojiUtils } from "../../utils";
import { IEventsNamespace } from "../EventsNamespace";
import { MessageReactionAddEventHandler } from "../index";

import pinner from "./Pinner";

class MessageReactionAddEvents implements IEventsNamespace {
    public asList(): MessageReactionAddEventHandler[] {
        return [
            pinner,
            EmojiUtils.logReaction
        ];
    }
}

export default (() => new MessageReactionAddEvents())();
