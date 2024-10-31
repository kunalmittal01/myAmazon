import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";

const SingleProd = ()=>{
    const params = useParams();
    const [product, setProduct] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [user] = useAuthState(auth)

    const fetchProdDetails = async()=>{
        const res = await fetch(`https://fakestoreapi.com/products/${params.id}`)
        const data = await res.json();
        setProduct(data);
    }
    useEffect(()=>{
        fetchProdDetails();
    },[params])
    const handleCart = ()=>{  
        dispatch(addToCart({...product, api:"fakestore"}))
        toast.success("item added to cart")
    }

    const readDescription = () => { 
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(product.description);
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
            <Navbar />
            <div className="moredetails">
                <div className="moredetailsimg">
                    <img src={product.image} alt="" />
                </div>    
                <div className="moredetails-cont">
                    <h2>{product.title}</h2>
                    <div className="ratings">
                     <>
                     <span style={{marginRight:"5px"}}>{product.rating?.rate}</span>
                    {
                    Array(5).fill(0).map((_,idx) => (
                        <i key={idx} className={`fa-${idx+1<=product.rating?.rate?'solid':'regular'} fa-star`}></i>
                    ))}
                    </>   
                    </div>
                    <h3>$ {product.price}</h3>
                    <p>{product.description}</p>
                    <button onClick={readDescription} className="descbtn">Read Description</button>
                    <div className="cartbtn">
                        <button onClick={handleCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
        
    )
}

export default SingleProd;