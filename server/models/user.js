import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    phoneno: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 64,
    },
    role: {
        type: Number,
        default: 0,
    },
}, {timestamps: true});

export default mongoose.model("User", userSchema);