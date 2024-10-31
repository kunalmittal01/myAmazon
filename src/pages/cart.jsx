import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/navbar/navbar";
import { removeFromCart, clearCart, updateWholeCart, removeFromCartFirestore } from "../slices/cartSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js'
import { collection, getDocs, query } from "firebase/firestore";

const Cart = ()=>{
    const items = useSelector(state=>state.cart)
    const navigate = useNavigate();
    const [user, load] = useAuthState(auth);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const removeItem = (id)=>{
        if(user) {
             dispatch(removeFromCartFirestore({id:id,uid:user.uid}))
        }
       else {
         dispatch(removeFromCart(id)) 
       }
        toast.success("item removed form cart")
    }
    // const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    
    const [prime,setPrime] = useState(Math.random()*10 < 5)
    const displayItems = ()=>[
        items?.items?.map((item,idx)=>{
            if(item.api=='fakestore') {
                return(
                    <div key={idx+Math.random()*1000} className="cart-item">
                        <div className="cart-item-wrap">
                            <img src={item.image} alt="" />
                            <div className="cart-item-desc">
                                <p className="cart-item-title">{item.title}</p>
                                <div className="ratings">
                                    {Array(5).fill(0).map((_,idx)=><i key={idx} className={`fa-${idx+1<=item.rating.rate?'solid':'regular'} fa-star`}></i>)}
                                </div>
                                <div className="item-desc">
                                    {item.description}
                                </div>
                            </div>
                            <div className="item-price">
                                <p>${item.price}</p>
                            </div>
                        </div>
                        {prime && <div className="prime prime-member">
                         <img src="https://images-eu.ssl-images-amazon.com/images/G/40/prime/primelogodexksa.jpg" alt="" />
                         <p>Has next-day Free Delivery</p>
                         </div>}  
                        <button style={{marginTop:`${prime?"0px":"10px"}` }} onClick={()=>removeItem(user?item.id:idx)}>Remove from cart</button>
                    </div>
                )
            }
            else {
                return(
                    <div key={idx+Math.random()*1000} className="cart-item">
                        <div className="cart-item-wrap">
                            <img src={item?.images[0]} alt="" />
                            <div className="cart-item-desc">
                                <p className="cart-item-title">{item.title}</p>
                                <div className="ratings">
                                    {Array(5).fill(0).map((_,idx)=><i key={idx} className={`fa-${idx+1<=item.rating?'solid':'regular'} fa-star`}></i>)}
                                </div>
                                
                                <div className="item-desc">
                                {item.description}
                                </div>
                            </div>
                            <div className="item-price">
                                <p>${item.price}</p>
                            </div>
                        </div>
                        {prime && <div className="prime">
                        <img src="https://images-eu.ssl-images-amazon.com/images/G/40/prime/primelogodexksa.jpg" alt="" />
                        <p>Has next-day Free Delivery</p>
                        </div>}  
                        <button style={{marginTop:`${prime?"0px":"10px"}`}} onClick={()=>removeItem(user?item.id:idx)} >Remove from cart</button>
                    </div>
                )
            }
        })
    ]
    const emptyCart = ()=>{
        return (
            <div className="empty-cart">
                <img src="https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB424694257_.svg" alt="" />
                <div className="emptycart-cont">
                    <p>Your Amazon Cart is empty</p>
                    <p>Start shopping by adding items to your cart.</p> 
                </div>
            </div>    
        )
    }
    const clearAllItemsCart = ()=>{
        dispatch(clearCart());
    }
    const toCheckout = async()=>{
        setLoading(true);
        if(!user) {
            navigate("authentication");
            setLoading(false);
            return;
        }
        setTimeout(()=>{
            navigate("payment");
            dispatch(clearCart());
            setLoading(false);
        },2000)
        // const stripe = await stripePromise;
        // const checkoutSession = await fetch('stripeEndPoint/create-checkout-session',{
        //     method:"POST",
        //     headers:{
        //         "Content-Type":"application/json"
        //     },
        //     body:JSON.stringify({
        //         items:items.items,
        //         total:items.total,
        //         email: user.email
        //     })
        // })
        // console.log(checkoutSession);
        
        // const res = await stripe.redirectToCheckout({
        //     sessionId: checkoutSession.data.id
        // })
        // if(res.error) {
        //     console.error("Error:",res.error.message);
        //     toast.error("Error placing order");
        //     return;
        // }
    }
    const fetchItemsFromDb = async()=>{
        const q = query(collection(db, `users/${user.uid}/cartItems`))
        const result = await getDocs(q);
        // console.log(result.docs[0].data());
        const ar = [];
        result.forEach((doc) => {
            ar.push({...doc.data()});
        });
        dispatch(updateWholeCart(ar));
    }
    useEffect(()=>{
        if(user && !load) {
         fetchItemsFromDb();
         return;
        }
        else if(!user && !load) {  
            toast.error("Please login to save your products.")
        }
    },[user])
    return (
        <>
        <Navbar />
        <div className="cartpage">
        {items.items.length==0?emptyCart():
            <>
            <div className="cartpage-cont">
                <div className="cartpage-head">
                    <p>Shopping Cart</p>
                    <p>price</p>
                </div>
                <div className="cart-items">
                    {displayItems()}
                </div>
            </div>
            <div className="cartitems-total">
                <p>Subtotal (<span>{items.items.length>0?items.items.length:0})</span>: $ {items.total.toFixed(2)}</p>
                <button onClick={toCheckout} role="link" className={user?"proceedbtn":"restrictuser"}>{loading?"Please wait":user?"Proceed To Checkout":"Sign In To Checkout"}</button>
                <button onClick={clearAllItemsCart} className="clearcartbtn">Clear Cart</button>
            </div>
            </>
            }
        </div>
        </>
    )
}

export default Cart;