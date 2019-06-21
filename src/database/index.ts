/* tslint:disable:variable-name */

import mongoose from "mongoose";

import { DatabaseConfig } from "./DatabaseConfig";
import { UserSchema } from "./Schemas";

const User = mongoose.model("User", UserSchema);
export { User as DBUser };

let initialized: boolean = false;

function onReady(): void {
    console.log("db connection initialized");
    initialized = true;
}

export async function init(): Promise<void> {
    if (initialized) {
        return;
    }

    mongoose.connection.once("open", onReady);
    mongoose.connection.on("error", console.error.bind(console, "db connection error:"));

    const config = new DatabaseConfig();
    await mongoose.connect(config.connectString);
}

export async function findUserById(userId: string): Promise<any> {
    if (!initialized) {
        await init();
    }

    return await User.find().where("userId").equals(userId).exec();
}
