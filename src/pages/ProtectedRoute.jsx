import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ children }) {
  const [isValid, setIsValid] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        // await axios.get('https://your-backend-url/validate-token', {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        const response = await axios.post(
            'https://task-management-ezcgeccwe8gha2av.southindia-01.azurewebsites.net/auth/validate-token',
            {
                token: token
            }
        );
        console.log("validate token: ", response.data.isValid );
        setIsValid(response.data.isValid);
      } catch (error) {
        console.error("Token invalid", error);
        setIsValid(false);
      }
    };

    validateToken();
  }, [token]);

  if (isValid === null) return <div>Loading...</div>;
  if (!isValid) return <Navigate to="/login" />;

  return children;
}

export default ProtectedRoute;
