import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider/AuthProvider';
import Login from './Login';

const Home = () => {
    const {user}  = useContext(AuthContext);
    
    return (
        <div className='flex flex-col gap-5 justify-center items-center font-bold text-3xl min-h-screen'>
           
           {
            user? 
            <div className='flex flex-col items-center gap-5'> 
                <h1>Hi, {user?.displayName}</h1>
                <img  src={user?.photoURL} referrerPolicy="no-referrer" className='rounded-full border-e-red-300 border-2' alt="" />
            </div> 
            : 
            <div>
                <h2 className='mt-10'>Please Login First To Access The App</h2>
                <Login></Login>
            </div>
           }
        </div>
    );
};

export default Home;