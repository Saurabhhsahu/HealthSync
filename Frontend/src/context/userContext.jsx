import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const token = 'kodndoiscn'
    const [profile, setProfile] = useState({});

    const URI = import.meta.env.VITE_HOST_URI; // Replace with actual API URL
    const userId = "67c48b0f93b34c8b2b157d44"; // Replace with actual user ID

    const modelMap = {
        appointments: "Appointment",
        glucoseTrends: "GlucoseTrend",
        healthMonitorings: "HealthMonitoring",
        insurance: "Insurance",
        labReports: "LabReport",
        medicalRecords: "MedicalRecord",
        medications: "Medication",
    };

    // Fetch individual profile detail
    const getProfileDetails = async (detailType) => {
        try {
            const res = await axios.post(`${URI}/api/user/getUserDetail`, { userId, detailType });
            const data = res.data.data;
            console.log(`${detailType} : `,data);
            
            setProfile(prev => ({ ...prev, [detailType]: data })); // Store in profile state
            return data;
        } catch (error) {
            console.log(`Error in fetching ${detailType}:`, error);
        }
    };

    // Fetch all details at once
    const fetchAllProfileDetails = async () => {
        const promises = Object.keys(modelMap).map(detailType => getProfileDetails(detailType));
        await Promise.all(promises);
    };

    // Fetch all details on component mount
    useEffect(() => {
        fetchAllProfileDetails();
    }, []);

    const value = { 
        profile, 
        getProfileDetails, 
        fetchAllProfileDetails ,
        token
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
