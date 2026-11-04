
const Application = require("../models/Application");

const submitApplication = async (req, res) => {
    try {
        const { name, email, resume, job, company } = req.body;

        const application = new Application({
            userId: req.user.id,
            name,
            email,
            resume,
            job,
            company
        });

        await application.save();

        res.status(201).json({
            message: "Application submitted successfully!",
            application
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to submit application",
            error: error.message
        });
    }
};

const getApplications = async (req, res) => {
    try {
        const applications = await Application.find().sort({
            appliedDate: -1
        });

        res.status(200).json(applications);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch applications",
            error: error.message
        });
    }
};

const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({
            userId: req.user.id
        }).sort({
            appliedDate: -1
        });

        res.status(200).json(applications);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch your applications",
            error: error.message
        });
    }
};

const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!["Pending", "Selected", "Rejected"].includes(status)) {
            return res.status(400).json({
                message: "Invalid application status"
            });
        }

        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { returnDocument: "after", runValidators: true }
        );

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.status(200).json({
            message: "Application status updated successfully!",
            application
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update application status",
            error: error.message
        });
    }
};

module.exports = {
    submitApplication,
    getApplications,
    getMyApplications,
    updateApplicationStatus
};
