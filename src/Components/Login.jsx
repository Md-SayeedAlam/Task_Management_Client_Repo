import { useContext } from "react";
import { AuthContext } from "./AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";


const Login = () => {
    const {user} = useContext(AuthContext)
        const navigate = useNavigate()

    const {signInWithGoogle} = useContext(AuthContext)


    const setUserRole = async (user) => {
        try {
          const userData = {
            email: user.email,
            name: user.displayName || "Anonymous",
            image: user.photoURL || "",
            
          };
    
          // Send a request to your server to save the user in MongoDB
          const res = await axios.post("http://localhost:5000/users", userData);
          console.log("User role set or verified:", res.data);
        } catch (error) {
          console.error("Error setting user role:", error);
        }
      };



    const handleGoogleLogin =async()=>{
        try {
        const result= await signInWithGoogle()
        await setUserRole(result.user); 
          console.log(result.user);

          toast.success("Login successful", {
            position: "top-right",
            autoClose: 2000,
          });
        //   navigate(location?.state ? location.state : "/");
        navigate('/')
        }
        
        catch (error) {
            console.error("ERROR:", error.message);
        
            toast.error(`Login Failed: ${error.message}`, {
              position: "top-center",
              autoClose: 2000,
            });
          }
    }






  return (
    <div className="flex justify-center items-center min-h-screen">
      <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5]">
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default Login;
