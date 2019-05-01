import { Message } from "discord.js";
import { CommandGroup, CommandRegistry } from "../CommandRegistry";
import { CommandResult } from "../CommandResult";
import Commands from "../index";
import { WegbotCommand, WegbotCommandProps } from "../WegbotCommand";

const props: WegbotCommandProps = {
    description: "List available commands or usage for a specific command",
    name: "help",
    usage: "[command?]"
};

function buildUsage(command: WegbotCommand): string {
    return `Usage: ${Commands.prefix}${command.name} ${command.usage || ""}`;
}

function buildHelpOne(commands: WegbotCommand[], showUsage?: boolean): string {
    return commands
        .filter((c) => !c.hide)
        .map((c) =>
            `${c.name}` + (c.description ? ` – ${c.description}` : "") +
            (showUsage ? `\n    ${buildUsage(c)}` : "")
        )
        .join("\n");
}

function buildHelpGroup(group: CommandGroup): string {
    return `Group: ${group.name}\n${buildHelpOne(group.commands)}`;
}

export class HelpCommand extends WegbotCommand<WegbotCommandProps> {

    private static getAll(): string {
        return CommandRegistry.groups.map(buildHelpGroup).join("\n---\n");
    }

    public constructor() {
        super(props);
    }

    protected async onTriggered(context: Message, args: string[]): Promise<CommandResult> {
        // multi-level commands are not supported yet
        if (args.length > 1) {
            return {
                reason: "multi-level commands are not supported yet",
                success: false
            };
        }

        const helpText: string = args.length > 0 ? this.getOne(args[0]) : HelpCommand.getAll();

        // reply will be an empty string if no such command
        if (!helpText) {
            return {
                reason: args.length > 0
                    ? `I don't know of any command called \`${args[0]}\``
                    : "I don't know of any commands at all!",
                success: false
            };
        }

        await context.reply((args.length > 0 ? `here's what I know about \`${Commands.prefix}${args[0]}\``
            : "here's a list of commands") + `:\n\`\`\`\n${helpText}\n\`\`\``);

        return {
            success: true
        };
    }

    private getOne(name: string): string {
        return buildHelpOne(CommandRegistry.commands.filter((c) => c.name.toLowerCase() === name.toLowerCase()), true);
    }
}
