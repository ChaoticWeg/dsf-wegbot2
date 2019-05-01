import { MessageReaction } from "discord.js";
import { MessageReactionAddEventHandler } from "../index";

const PIN_NAME: string = "📌";
const PIN_THRESHOLD: number = 5;

const pinner: MessageReactionAddEventHandler = async (reaction: MessageReaction) => {
    if (reaction.emoji.name !== PIN_NAME) {
        return;
    }

    console.log(`message ${reaction.message.id} has ${reaction.count} pin(s)`);
    if (reaction.count >= PIN_THRESHOLD && !reaction.message.pinned) {
        await reaction.message.pin();
    }
};

export default pinner;
