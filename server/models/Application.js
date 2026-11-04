
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Selected", "Rejected"],
        default: "Pending"
    },
    appliedDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Application", applicationSchema);
