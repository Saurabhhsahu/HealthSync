import mongoose from 'mongoose';

import Appointment from './appointmentModel.js'
import GlucoseTrend from './glucoseTrendModel.js'
import HealthMonitoring from './healthMonitoringModel.js'
import Insurance from './insuranceModel.js'
import LabReport from './labReportModel.js'
import MedicalRecord from './medicalRecordModel.js'
import Medication from './medicationModel.js'
import User from './userModel.js'

const profileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        appointments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Appointment"
            }
        ],
        glucoseTrends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "GlucoseTrend"
            }
        ],
        healthMonitorings: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "HealthMonitoring"
            }
        ],
        insurance: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Insurance"
        },
        labReports: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "LabReport"
            }
        ],
        medicalRecords: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "MedicalRecord"
            }
        ],
        medications: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Medications"
            }
        ]
    }
)

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;