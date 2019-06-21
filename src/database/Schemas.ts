/* tslint:disable:variable-name */

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userId: String,
    isOwner: Boolean,
    isElevated: Boolean
});

export { UserSchema };
