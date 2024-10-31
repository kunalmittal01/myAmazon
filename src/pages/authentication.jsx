import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.config";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth"
import { toast } from 'react-toastify';

const Autentication = () => {
  const [user] = useAuthState(auth)
  console.log(user);
  const [disable, setDisable] = useState(false);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const getDetails = (e,key)=>{
    setUserDetails({...userDetails, [key]: e.target.value})
  }

  const onSignup = async(e)=>{
    e.preventDefault();
    if(userDetails.name=='' || userDetails.email == '' || userDetails.password == '') {
      toast.error("Please enter all fields");
      return;
    }
    try 
    {
      setDisable(true);
       const res = await createUserWithEmailAndPassword(auth,userDetails.email, userDetails.password);
       console.log(res.user);
       if(res) {
        const userData = await getDoc(doc(db,"users",res.user.uid))
        if(!userData.exists()) {
          try {
            await setDoc(doc(db,"users",res?.user.uid),{
              name: userDetails.name,
              email: userDetails.email,
              uid: res.user.uid,
              profilePic: "",
              createdAt: new Date(),
            })
            toast.success("Regestered Successfully");
            setUserDetails({name: "", email: "", password: ""})
            setDisable(false);
            setToggle(true);
          }
          catch (e) {
            console.error(e);
            toast.error("Error Registering");
            setDisable(false);
          }
        }
      }
      }
      catch (e) {
        toast.error(e.message);
        setDisable(false);
      }
  }

  const onSignin = async(e)=>{
    e.preventDefault();
    if(userDetails.email == '' || userDetails.password == '') {
      toast.error("Please enter all fields");
      return;
    }
    try {
      setDisable(true);
      const res = await signInWithEmailAndPassword(auth, userDetails.email, userDetails.password);
      if(res.user) {
        toast.success("Signed In Successfully");
        navigate("/")
        setUserDetails({name: "", email: "", password: ""})
        setDisable(false);
      }
    }
    catch (error) {
      toast.error(error.message);
      setDisable(false);
    }
  }
  return (
    <>
    {
      !toggle?
    <div className="auth">
        <Link to="/"><div className="amazon-logo">
            <img src="data:image/jpeg;base64,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" alt="" />
        </div></Link>
      <form className="login-form">
        <h3>Create Account</h3>
        <p>Your name </p>
        <input value={userDetails.name} onChange={(e)=>getDetails(e,"name")} type="text" placeholder="First and last name" />
        <p style={{marginBottom: "2px"}}>Email Id</p>
        <input value={userDetails.email} onChange={(e)=>getDetails(e,"email")} required="" type="text" placeholder="Mobile Number" />
        <p>Password</p>
        <input value={userDetails.password} onChange={(e)=>getDetails(e,"password")} 
          required
          type="Password"
          placeholder="At least 6 characters"
        />
        <p
          className="passwordChar"
          style={{fontStyle: "italic", color: "rgb(51, 51, 51)", marginBottom: "20px"}}
        >
          <span style={{color: "rgb(112, 186, 213)", fontWeight: "900", cursor: "default", fontSize: "14px"}}>
            i
          </span>
          <span style={{color: "rgb(51, 51, 51)", fontWeight: "500", textDecoration: "none", fontStyle: "normal", "cursor": "text", marginLeft: "8px"}}>
            {" "}
            Passwords must be at least 6 characters.
          </span>
        </p>
        <p>
          To verify your number, we will send you a text message with a
          temporary code. Message and data rates may apply.
        </p>
        <button disabled={disable} onClick={(e)=>onSignup(e)} type="submit">Sign Up</button>
        <p>
          Already have an account?{" "}
            <span onClick={()=>setToggle(true)}>Sign in</span>
            <i
              className="ri-arrow-right-s-fill"
              style={{color: "rgb(51, 51, 51)"}}
            ></i>
        </p>
        <p>
          Buying for work? <span>Create a free business account </span>{" "}
          <i className="ri-arrow-right-s-fill"></i>
        </p>
        <p>
          By creating an account or logging in, you agree to Amazon’s
          <span> Conditions of Use </span>and<span> Privacy Policy.</span>
        </p>
      </form>
    </div>:
    <div className="auth">
      <Link to="/"><div className="amazon-logo">
              <img src="data:image/jpeg;base64,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" alt="" />
          </div></Link>
  
      <form action="" className="login-form">
        <h3>Sign in</h3>
        <p>Email</p>
        <input value={userDetails.email} onChange={(e)=>getDetails(e,"email")} type="email" placeholder="email"/>
        <p>password</p>
        <input value={userDetails.password} onChange={(e)=>getDetails(e,"password")} style={{marginTop: "10px"}} type="password" placeholder="******"/>
        <button disabled={disable} onClick={(e)=>onSignin(e)} type="submit">Continue</button>
        <p>
          By continuing, you agree to Amazon’s
          <span> Conditions of Use </span>and<span> Privacy Policy.</span>
        </p>
        <div className="help"><i className="ri-arrow-right-s-fill"></i><span>Need help?</span></div>
        <p>Buying for work?</p>
        <p>Shop on Amazon Business</p>
      </form>
      <p className="newtoamazon"><span className="left-line"></span><span className="text">New to Amazon?</span><span className="right-line"></span></p>
      <div onClick={()=>setToggle(false)} className="craete_account">Create your Amazon account</div>
      <div className="bottom"><div className="part1"><span> Conditions of Use   Help </span><span> Privacy Notice  </span><span> Help   </span></div><p>© 1996-2024, Amazon.com, Inc. or its affiliates</p></div>
     </div> 
    }
    </>
  );
};


export default Autentication;