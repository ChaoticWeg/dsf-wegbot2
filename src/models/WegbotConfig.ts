import { CommandUser } from "./CommandUser";
import { RequestableRole } from "./RequestableRole";

export interface WegbotConfig {
    users: CommandUser[];
    roles: RequestableRole[];
}
