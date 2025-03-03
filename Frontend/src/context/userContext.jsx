import { createContext, useState, useContext,useEffect } from "react";
import axios from 'axios'

const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState("rh"); // Manage token state

    const URI = import.meta.env.VITE_HOST_URI;
    console.log(URI);

    const getProfileDetails = async(detailType) => {
        try{
            const res = await axios.post(`${URI}/api/user/getUserDetail`,{userId:"67c48b0f93b34c8b2b157d44",detailType: "glucoseTrends"});
            const data = res.data.data;
            console.log(`User details for ${detailType}: `,data);
            return data;
        }
        catch(Err){
            console.log("Error in getting profile details");
        }
    }

    useEffect(() => {
        getProfileDetails();
      })

    const value = {
        token,
        setToken ,// Optional: allows updating the token elsewhere
        getProfileDetails
    };

    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    );
};

export const useUser = () => {
    return useContext(userContext);
};

export default userContext;
