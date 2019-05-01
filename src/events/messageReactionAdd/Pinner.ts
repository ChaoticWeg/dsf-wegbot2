import { MessageReaction } from "discord.js";
import { MessageReactionAddEventHandler } from "../index";

const PIN_THRESHOLD: number = 5;

const pinner: MessageReactionAddEventHandler = async (reaction: MessageReaction) => {
    if (reaction.emoji.name !== "pushpin") {
        return;
    }

    if (reaction.count >= PIN_THRESHOLD && !reaction.message.pinned) {
        await reaction.message.pin();
    }
};

export default pinner;
