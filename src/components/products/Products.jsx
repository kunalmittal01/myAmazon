import { useEffect, useState } from "react";
import Product from "./product";
import { useNavigate } from "react-router-dom";


const Products = ()=>{
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const fetchProducts = async()=>{
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        setProducts(data);
    }
    
    useEffect(()=>{
        fetchProducts();
    },[])

    const showDetails = (id)=>{
        navigate(`/moreDetails/${id}`)
    }

    return (
        <div className="products-cont">
        {
            products?.slice(0,4).map(product => (
                <Product api="fakestore" onClick={()=>showDetails(product.id)} key={product.id} {...product} />
            ))
        }
        <div className="banner-img">
            {/* <img src="" alt="" /> */}
        </div>
        <div className="mid-prod">
        {
            products?.slice(4,5).map(product => (
                <Product api="fakestore" onClick={()=>showDetails(product.id)} key={product.id} {...product} />
            ))
        }
        </div>
        {
            products?.slice(5,10).map(product => (
                <Product api="fakestore" onClick={()=>showDetails(product.id)} key={product.id} {...product} />
            ))
        }
        </div>
    )
    
}

export default Products;