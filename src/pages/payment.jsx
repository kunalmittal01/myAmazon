import { Link } from "react-router-dom";

const Payment = ()=>{
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