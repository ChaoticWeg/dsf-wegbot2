import { CommandUser } from "./CommandUser";
import { RequestableRole } from "./RequestableRole";
import { WegbotGuild } from "./WegbotGuild";

export interface WegbotConfig {
    users: CommandUser[];
    guilds: WegbotGuild[];
    roles: RequestableRole[];
}
