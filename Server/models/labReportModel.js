import mongoose from 'mongoose';

const labReportSceham = new mongoose.Schema(
    {
        test: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        file: {
            type: String,
            required: true,
        }
    }
)

const LabReport = mongoose.model("LabReport",labReportSceham);

export default LabReport;