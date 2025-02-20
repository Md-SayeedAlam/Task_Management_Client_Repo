import React, { useContext } from 'react';

import { Navigate, useLocation } from 'react-router-dom';


import lottieLoading from '../assets/lottie/loading.json'
import Lottie from 'lottie-react';
import { AuthContext } from '../Components/AuthProvider/AuthProvider';
const PrivateRoute = ({children}) => {

    const location = useLocation()
    
    const {user,loading} = useContext(AuthContext)

    
    // if (loading) {
    //     return (
    //         <div className="flex justify-center items-center min-h-screen">
    //             <Lottie animationData={lottieLoading} />
    //             {/* <span className="loading loading-spinner size-20 text-accent"></span> */}
    //             <h2 className='text-green-600 font-bold text-5xl'>Loading</h2>
    //         </div>
    //     );
    // }

    if(user && user?.email) {return children}
    


    return (
        <Navigate state={{from:location}} replace to='/login'></Navigate>
    );
};

export default PrivateRoute;