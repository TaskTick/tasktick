import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 64,
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);