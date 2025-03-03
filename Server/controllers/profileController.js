import Appointment from "../models/appointmentModel.js";
import GlucoseTrend from "../models/glucoseTrendModel.js";
import HealthMonitoring from "../models/healthMonitoringModel.js";
import Insurance from "../models/insuranceModel.js";
import LabReport from "../models/labReportModel.js";
import MedicalRecord from "../models/medicalRecordModel.js";
import Medication from "../models/medicationModel.js";
import User from '../models/userModel.js'

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const modelMap = {
    appointments: Appointment,
    glucoseTrends: GlucoseTrend,
    healthMonitorings: HealthMonitoring,
    insurance: Insurance,
    labReports: LabReport,
    medicalRecords: MedicalRecord,
    medications: Medication,
};

const signup = async (req, res) => {
    try {
        const { name, age, gender, bloodGroup, contact, email, password, emergencyContact, profileImage } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await User.create({
            name,
            age,
            gender,
            bloodGroup,
            contact,
            email,
            password: hashedPassword,
            emergencyContact,
            profileImage
        });

        // Generate JWT Token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (err) {
        console.error("Error in signup:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const getUserDetail = async (req, res) => {
    try {
        const { userId, detailType } = req.body; // Extract userId & detailType

        if (!userId || !detailType) {
            return res.status(400).json({
                success: false,
                message: "User ID and detail type are required",
            });
        }

        const Model = modelMap[detailType];

        if (!Model) {
            return res.status(400).json({
                success: false,
                message: "Invalid detail type",
            });
        }

        // Fetch data based on userId
        const data = await Model.find({ userId });

        return res.status(200).json({
            success: true,
            message: `${detailType} fetched successfully`,
            data: data,
        });

    } catch (err) {
        console.error("Error in getting details:", err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const storeUserDetail = async (req, res) => {
    try {
        const { userId, detailType, data } = req.body;

        if (!userId || !detailType || !data) {
            return res.status(400).json({
                success: false,
                message: "User ID, detail type, and data are required",
            });
        }

        const Model = modelMap[detailType];
        if (!Model) {
            return res.status(400).json({
                success: false,
                message: "Invalid detail type",
            });
        }

        data.userId = userId; // Ensure userId is assigned
        const newEntry = await Model.create(data);

        res.status(201).json({
            success: true,
            message: `${detailType} added successfully`,
            data: newEntry,
        });
    } catch (err) {
        console.error("Error in storing details:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export {getUserDetail,signup,storeUserDetail};
