import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../firebase.config";

const ForgotPass = ()=>{
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(email == '') {
            toast.error("Please enter your email address");
            return;
        }
        try {
            const res= await sendPasswordResetEmail(auth,email);
            console.log(res);
            setEmail("");
            toast.success("Password reset link sent to your email");
        }
        catch(e) {
            toast.error(e.message);
            console.error(e);
        }
    }
    return (
        <>
        <div className="passcont">
            <div className="passhead">
                <span></span>
                <p style={{textAlign: "center"}}>Forgot Password</p>
                <span></span>
            </div>
            <form action="">
                <p>Enter Your Email</p>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="abc@gmail.com" />
                <button onClick={handleSubmit} type="submit">Submit</button>
            </form>
            <p onClick={()=>navigate("/authentication")} className="passhomebtn">Back To Signin Page</p>
        </div>
        </>
    )
}

export default ForgotPass;