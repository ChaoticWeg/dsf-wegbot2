import { Snowflake } from "discord.js";

interface CommandFileCreds {
    ownerId: Snowflake;
    adminIds: Array<Snowflake>;
}

export class CommandCreds {
    readonly internalCreds: CommandFileCreds;

    constructor(creds: CommandFileCreds) {
        this.internalCreds = creds;
    }

    public get owner(): Snowflake { return this.internalCreds.ownerId; };
    public get admins(): Array<Snowflake> { return this.internalCreds.adminIds; };

    public set owner(newOwnerId: Snowflake) {
        this.internalCreds.ownerId = newOwnerId;
    }

    public set admins(newAdminIds: Array<Snowflake>) {
        this.internalCreds.adminIds = newAdminIds;
    }
}

// export initial creds from file
import _initialFileCreds from "./creds.json";
let _creds: CommandCreds = new CommandCreds(_initialFileCreds);
export { _creds as Creds };
