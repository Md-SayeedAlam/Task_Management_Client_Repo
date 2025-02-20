import { createContext, useEffect, useState } from 'react';

import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

import { auth } from './../../Firebase/firebase.config';

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {


    const [user,setUser]=useState(null);
    const[isUpdating,setUpdating]=useState(false)
    const [loading,setLoading] = useState(true)



    const signInWithGoogle=()=>{

        return signInWithPopup(auth,googleProvider)
     }
    

     const signOutUser = () =>{
        setLoading(true)
        return signOut(auth)
    }



    const authInfo = {
        
        signInWithGoogle,
        user,
        setUser,
        loading,
        setLoading,
        signOutUser,

    
    }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          console.log(currentUser)
        });
        return () => unsubscribe();
      }, []);




    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;