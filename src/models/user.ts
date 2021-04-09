import {mongoose} from "../db/connection";

const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema({
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
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

//Plugins
userSchema.plugin(require('mongoose-beautiful-unique-validation'));
userSchema.plugin(require('mongoose-paginate'));

const userModel = model("user", userSchema);

export default userModel;