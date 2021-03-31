import {mongoose} from "../db/connection";

const Schema = mongoose.Schema;
const model = mongoose.model;

const user = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tosAgreement: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

user.plugin(require('mongoose-beautiful-unique-validation'));

const userModel = model("user", user);

export default userModel;