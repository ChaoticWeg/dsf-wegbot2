import { Message } from "discord.js";
import { CommandGroup, CommandRegistry } from "../CommandRegistry";
import { CommandResult } from "../CommandResult";
import { GenericWegbotCommand, WegbotCommand, WegbotCommandProps } from "../WegbotCommand";
import Commands from "../index";

const props: WegbotCommandProps = {
    name: "help",
    description: "List available commands or usage for a specific command",
    usage: "[command?]"
};

function buildUsage(command: GenericWegbotCommand): string {
    return `Usage: ${Commands.prefix}${command.name} ${command.usage || ""}`;
}

function buildHelpOne(commands: GenericWegbotCommand[], showUsage?: boolean): string {
    return commands
        .filter(c => !c.hide)
        .map(c =>
            `${c.name}` + (c.description ? ` – ${c.description}` : "") +
            (showUsage ? `\n    ${buildUsage(c)}` : "")
        )
        .join("\n");
}

function buildHelpGroup(group: CommandGroup): string {
    return `Group: ${group.name}\n${buildHelpOne(group.commands)}`;
}

export class HelpCommand extends WegbotCommand<WegbotCommandProps> {
    public constructor() {
        super(props);
    }

    private static getAll(): string {
        return CommandRegistry.groups.map(buildHelpGroup).join("\n---\n");
    }

    private getOne(name: string): string {
        return buildHelpOne(CommandRegistry.commands.filter(c => c.name.toLowerCase() === name.toLowerCase()), true);
    }

    protected async onTriggered(context: Message, args: string[]): Promise<CommandResult> {
        // multi-level commands are not supported yet
        if (args.length > 1) {
            return {
                success: false,
                reason: "multi-level commands are not supported yet"
            };
        }

        let helpText: string = args.length > 0 ? this.getOne(args[0]) : HelpCommand.getAll();

        // reply will be an empty string if no such command
        if (!helpText) {
            return {
                success: false,
                reason: args.length > 0
                    ? `I don't know of any command called \`${args[0]}\``
                    : "I don't know of any commands at all!"
            };
        }

        await context.reply((args.length > 0 ? `here's what I know about \`${Commands.prefix}${args[0]}\``
            : "here's a list of commands") + `:\n\`\`\`\n${helpText}\n\`\`\``);

        return {
            success: true
        };
    }
}
