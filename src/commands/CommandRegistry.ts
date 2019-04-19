import { GenericWegbotCommand } from "./WegbotCommand";

type GroupsMap = Map<string, GenericWegbotCommand[]>;

export interface CommandGroup {
    name: string;
    commands: GenericWegbotCommand[];
}

export class CommandRegistry {
    private static _registry: GroupsMap = new Map<string, GenericWegbotCommand[]>();

    public static get groups(): CommandGroup[] {
        return Array.from(this._registry.entries()).map(e => ({ name: e[0], commands: e[1] }));
    }

    public static get commands(): GenericWegbotCommand[] {
        return Array.from(this._registry.entries()).map(e => e[1]).reduce((p, c) => p.concat(c));
    }

    public static group(name: string): GenericWegbotCommand[] | null {
        return this._registry.get(name) || null;
    }

    public static add(cmd: GenericWegbotCommand) {
        const groupName = cmd.group || "(none)";
        let existing: GenericWegbotCommand[] = this._registry.get(groupName) || [];

        if (!existing.includes(cmd)) {
            existing.push(cmd);
        }

        this._registry.set(groupName, existing);
    }
}
