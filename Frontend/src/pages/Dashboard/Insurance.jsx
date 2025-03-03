import React from "react";
import { useUser } from "../../context/userContext";

const Insurance = ({ darkMode }) => {
  const {profile} = useUser();
  const insuranceData = profile?.insurance?.[0] || []

  const today = new Date();
  const expiry = new Date(insuranceData.expiryDate);
  const isExpired = today > expiry;

  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <div className={`px-6 py-4 ${darkMode ? "bg-gray-700" : "bg-blue-500"} text-white`}>
        <h2 className="text-xl font-semibold">Insurance Details</h2>
      </div>

      <div className="p-4 space-y-2">
        <p className="text-lg font-semibold">{insuranceData.provider}</p>
        <p className="text-sm text-gray-600">Policy No: {insuranceData.policyNumber}</p>
        <p className={`text-sm font-medium ${isExpired ? "text-red-600" : "text-green-600"}`}>
          Expiry: {expiry.toDateString()} {isExpired ? "(Expired)" : ""}
        </p>

        {isExpired && (
          <button className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded">
            Renew Insurance
          </button>
        )}
      </div>
    </div>
  );
};

export default Insurance;
