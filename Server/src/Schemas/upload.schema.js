import mongoose from "mongoose";

const mongooseSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    fileUrl: String,
    fileType: String,
    filetype: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Upload = mongoose.model("Upload", mongooseSchema);
export default Upload;