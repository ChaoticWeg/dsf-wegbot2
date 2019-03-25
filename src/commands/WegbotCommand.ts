import { Message } from "discord.js";
import { Wegbot } from "../wegbot";
import { WegbotCommandResult } from "./WegbotCommandResult";

export interface WegbotCommandProps {
    ownerOnly?: boolean;
    adminOnly?: boolean;
}

export abstract class WegbotCommand {

    public get asContentStart(): string {
        return "".concat(WegbotCommand.prefix, this.commandStr);
    }

    public static readonly prefix: string = ".";

    public readonly commandStr: string;
    private readonly props: WegbotCommandProps;

    protected constructor(commandStr: string, props: WegbotCommandProps = {}) {
        this.commandStr = commandStr;
        this.props = props;
    }

    public async trigger(context: Message, bot?: Wegbot): Promise<WegbotCommandResult> {
        return new Promise<WegbotCommandResult>(
            async (resolve: (r: WegbotCommandResult) => void, reject: (r: WegbotCommandResult) => void) => {
                const result: WegbotCommandResult = await this.execute(context, bot)
                    .catch((r: WegbotCommandResult) => r);
                return result.success ? resolve(result) : reject(result);
            });
    }

    protected abstract async execute(context: Message, bot?: Wegbot): Promise<WegbotCommandResult>;
}
