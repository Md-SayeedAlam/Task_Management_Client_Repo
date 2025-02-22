import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Lottie from 'lottie-react';
import lottieLoading from '../assets/lottie/loading.json';
import { AuthContext } from '../Components/AuthProvider/AuthProvider';

const PrivateRoute = ({children}) => {
    const location = useLocation();
    const { user, loading } = useContext(AuthContext);


     // If the user is authenticated, show the requested page
     if (user && user.email) {
        return children;
      }



  
    // Show loading animation while checking authentication
    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <Lottie animationData={lottieLoading} />
          <h2 className="text-green-600 font-bold text-5xl">Loading...</h2>
        </div>
      );
    }
  
   
  
    // If user is not authenticated, redirect to the login page
    return (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  };
  


export default PrivateRoute;