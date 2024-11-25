import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearAllProducts } from "../slices/cartSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";

const Payment = ()=>{
    const [user,load] = useAuthState(auth);
    const dispatch = useDispatch();
    console.log(load);
    
    useEffect(()=>{
        if(user && user.uid) {
            dispatch(clearAllProducts({uid: user.uid}));
        }
    },[user?.uid]);
    return (
        <div className="paymentpage">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY_m7cFmV4tTs5M6kqEzRIaWEKQdBvtBFnOofku9mGjbj56Qyv" alt="" />
            <div className="payment-msg">
                <p>Payment successful</p>
                <p>Your order has been placed successfully.</p>
            </div>
            <Link to="/">Back to home</Link>
        </div>
    )
}

export default Payment;