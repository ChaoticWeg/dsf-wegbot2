import { WegbotCommand } from "./baseCommand";
import Discord, { Message } from "discord.js";
import { PingCommand } from "./ping";
import * as util from "util";

const KnownCommands: Array<WegbotCommand> = [
    new PingCommand()
];

export class CommandRegistry {
    static _prefix: string = "?";
    public static get prefix() { return CommandRegistry._prefix; }

    _internal: Array<WegbotCommand> = new Array<WegbotCommand>();
    public get internal(): ReadonlyArray<WegbotCommand> { return this._internal.splice(0); }

    public init(): void {
        let self: CommandRegistry = this;
        KnownCommands.forEach(c => { self.register(c); });
    }

    public register(cmd: WegbotCommand): void {
        this._internal.push(cmd);
    }

    private onCommandExecuted(ctx: Message | Array<Message>): void {
        let arr: Array<Message> = util.isArray(ctx) ? ctx : [ ctx ];
        arr.forEach((m: Message) => {
            console.log(`CMD SUCCESS: ${m}`);
        });
    }

    private onCommandFailed(ctx: Message | Array<Message>): void {
        let arr: Array<Message> = util.isArray(ctx) ? ctx : [ ctx ];
        arr.forEach((m: Message) => {
            console.error(`CMD FAILURE: ${m}`);
        });
    }

    public handleMessage(msg: Message): void {
        // ignore bots (including ourself)
        if (msg.author.bot) {
            return;
        }

        let cmdStr: string = msg.content.split(" ")[0];
        if (!cmdStr.startsWith(CommandRegistry.prefix)) {
            return;
        }

        cmdStr = cmdStr.substring(1).toUpperCase();

        let self: CommandRegistry = this;
        this._internal.forEach(c => {
            if (cmdStr === c.cmdStr.toUpperCase()) {
                c.onTriggered(msg)
                    .then(self.onCommandExecuted.bind(self))
                    .catch(self.onCommandFailed.bind(self));
            }
        });
    }

    public bind(client: Discord.Client): void {
        client.on('message', this.handleMessage.bind(this));
    }
}
