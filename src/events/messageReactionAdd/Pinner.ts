import { MessageReaction } from "discord.js";
import { MessageReactionAddEventHandler } from "../index";

const DEFAULT_PIN_THRESHOLD: number = 3;

const PIN_NAME: string = "📌";
const PIN_THRESHOLD: number = Number.parseInt(process.env.PIN_THRESHOLD || String(DEFAULT_PIN_THRESHOLD), 10);

const pinner: MessageReactionAddEventHandler = async (reaction: MessageReaction) => {
    if (reaction.emoji.name !== PIN_NAME) {
        return;
    }

    console.log(`message ${reaction.message.id} has ${reaction.count} pin(s) -- threshold is ${PIN_THRESHOLD}`);
    if (reaction.count >= PIN_THRESHOLD && !reaction.message.pinned) {
        await reaction.message.pin();
    }
};

export default pinner;
