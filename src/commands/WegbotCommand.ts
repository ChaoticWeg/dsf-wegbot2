import { Message } from "discord.js";
import { CommandResult } from "./CommandResult";

const REACT_OK: string = "👍";
const REACT_NOT_OK: string = "👎";

export abstract class WegbotCommand {
    public get name(): string {
        return this._name;
    }

    protected _name: string;
    protected react: boolean;

    protected constructor(name: string, react?: boolean) {
        this._name = name;
        this.react = react || false;
    }

    public async execute(context: Message): Promise<string> {
        const result: CommandResult = await this.onTriggered(context);

        if (this.react) {
            await context.react(result.success ? REACT_OK : REACT_NOT_OK);
        }

        return "command " + (result.success ? "success" : "failed") + ": " + this.name;
    }

    protected abstract async onTriggered(context: Message): Promise<CommandResult>;
}
