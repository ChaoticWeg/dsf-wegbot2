import { WegbotCommand } from "./WegbotCommand";

type GroupsMap = Map<string, WegbotCommand[]>;

export interface CommandGroup {
    name: string;
    commands: WegbotCommand[];
}

export class CommandRegistry {

    public static get groups(): CommandGroup[] {
        return Array.from(this._registry.entries()).map((e) => ({ name: e[0], commands: e[1] }));
    }

    public static get commands(): WegbotCommand[] {
        return Array.from(this._registry.entries()).map((e) => e[1]).reduce((p, c) => p.concat(c));
    }

    public static group(name: string): WegbotCommand[] | null {
        return this._registry.get(name) || null;
    }

    public static add(cmd: WegbotCommand) {
        const groupName = cmd.group || "(none)";
        const existing: WegbotCommand[] = this._registry.get(groupName) || [];

        if (!existing.includes(cmd)) {
            existing.push(cmd);
        }

        this._registry.set(groupName, existing);
    }

    private static _registry: GroupsMap = new Map<string, WegbotCommand[]>();
}
