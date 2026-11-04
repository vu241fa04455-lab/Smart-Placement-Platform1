
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
    submitApplication,
    getApplications,
    getMyApplications,
    updateApplicationStatus
} = require("../controllers/applicationController");

router.post("/submit", authMiddleware, submitApplication);

router.get("/my", authMiddleware, getMyApplications);

router.get("/all", authMiddleware, adminMiddleware, getApplications);

router.put(
    "/update-status/:id",
    authMiddleware,
    adminMiddleware,
    updateApplicationStatus
);

module.exports = router;
