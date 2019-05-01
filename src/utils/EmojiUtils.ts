import { Emoji, Guild } from "discord.js";

export namespace EmojiUtils {
    export function getEmojiByName(guild: Guild, name: string): Emoji | null {
        name = name.toLowerCase();
        const emoji: Emoji[] = Array.from(guild.emojis.values()).filter((e) => e.name.toLowerCase() === name);
        return emoji.length > 0 ? emoji[0] : null;
    }
}
