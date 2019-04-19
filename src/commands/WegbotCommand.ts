import { Message } from "discord.js";
import { Wegbot } from "../wegbot";
import { CommandRegistry } from "./CommandRegistry";
import { CommandResult } from "./CommandResult";

import Commands from ".";

const REACT_OK: string = "👍";
const REACT_NOT_OK: string = "👎";

export type GenericWegbotCommand = WegbotCommand<WegbotCommandProps>;

export interface WegbotCommandProps {
    name: string;           // name of command
    group?: string;         // group
    usage?: string;         // command usage
    react?: boolean;        // whether the bot should react with result
    description?: string;   // command description
    hide?: boolean;         // hide from help command
    ownerOnly?: boolean;    // restrict access to owner only
}

export abstract class WegbotCommand<T extends WegbotCommandProps> {
    protected props: T;

    protected constructor(props: T) {
        this.props = props;
        CommandRegistry.add(this);
    }

    public get name() {
        return this.props.name;
    }

    public get react() {
        return this.props.react;
    }

    public get description() {
        return this.props.description;
    }

    public get usage() {
        return this.props.usage;
    }

    public get hide() {
        return this.props.hide;
    }

    public get group() {
        return this.props.group;
    }

    public async execute(context: Message, args?: string[]): Promise<string | Error> {
        if (this.props.ownerOnly && context.author.id !== Wegbot.ownerId) {
            await context.react(REACT_NOT_OK);
            return `owner-only command ${this.name} used by ${context.author}`;
        }

        const result: CommandResult = await this.onTriggered(context, args);

        if (this.react) {
            await context.react(result.success ? REACT_OK : REACT_NOT_OK);
        }

        if (!result.success && (result.reason || result.showUsage)) {
            let reply: string = `${result.reason ? result.reason + "\n" : ""}`;
            if (result.showUsage && this.usage) {
                let prefix: string = Commands.prefix;
                reply += `\`\`\`\n${prefix}${this.name} ${this.usage.trim()}\n\`\`\``;
            }
            if (reply && reply !== "") {
                await context.reply(reply);
            }
        }

        const resultStr: string = result.success ? "success" : `failed: ${result.reason || "(unknown)"}`;
        return `command '${this.name}' ${resultStr}`;
    }

    protected abstract async onTriggered(context: Message, args?: string[]): Promise<CommandResult>;
}
