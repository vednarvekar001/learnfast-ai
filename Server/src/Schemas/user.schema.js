import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    profilePic: {
        type: String,
        default: ""
    },
},
{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;