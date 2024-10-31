import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToCartFirestore } from "../../slices/cartSlice";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.config";
import { useNavigate } from "react-router-dom";

const Product = (props)=>{ 
    const navigate = useNavigate();
    const [user,loading] = useAuthState(auth);
    const [prime,setPrime] = useState(Math.random()<0.5)
    const dispatch = useDispatch();
    const state = useSelector(state => state.cart)
    // console.log(state);
    
    const handleCart = ()=>{
        const obj = {...props}
        delete obj.onClick
        if(!user) {
            dispatch(addToCart(obj))
        }
        else {
            dispatch(addToCartFirestore({item:obj, uid:user.uid}))
        }
        toast.success("item added to cart");
    }

const readDescription = () => {
    
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(props.description);
        utterance.lang = 'en-US'; 

        utterance.pitch = 1; 
        utterance.rate = 1; 

        window.speechSynthesis.speak(utterance);
    } else {
        toast.error("Text-to-speech is not supported in your browser.");
    }
};
    return (
        <>
            <div className="product">
                <p className="category">{props.category}</p>
                <div onClick={props.onClick} className="product-img">
                    <img src={props.image} alt={props.title} />
                </div>
                <h4>{props.title}</h4>
                <div className="product-ratings">
                    {Array(5).fill(0).map((_,idx)=>{
                    return <i key={idx} className={`fa-${idx+1<=props.rating.rate?'solid':'regular'} fa-star`}></i>
                    })}
                </div>
                <p className="desc">{props.description.substring(0,80)}...</p>
                <p className="price">Price: ${props.price}</p>
                {prime && <div className="prime">
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/40/prime/primelogodexksa.jpg" alt="" />
                    <p>Has next-day Free Delivery</p>
                </div>}  
                <div className="cartbtn">
                    <button onClick={handleCart}>Add To Cart</button>
                </div>  
                <div className="read-desc">
                    <button className="descbtn" onClick={readDescription}>Read Description</button>
                </div>
            </div>
        </>
    )
    
}

export default Product;