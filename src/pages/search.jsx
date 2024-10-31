import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Product from "../components/products/product";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

const Search = ()=>{
    const [products, setProduct] = useState([]);
    const query = new URLSearchParams(useLocation().search).get("query");
    const navigate = useNavigate();
    const fetchProd = async()=>{
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        const res2 = await fetch('https://dummyjson.com/products/')
        const data2 = await res2.json();
        const ar = data2.products.map(prod=>{
            return {...prod, rating:{rate:prod.rating}, image: prod.images[0]}
        })
        const combinedData = [...data,...ar];
        setProduct(combinedData.filter(product=>product.title.toLowerCase().includes(query.toLowerCase()) || product.description.toLowerCase().includes(query.toLowerCase) || product.category.toLowerCase().includes(query.toLowerCase())));
    }
    useEffect(()=>{
        fetchProd();
    },[query]);

    const getDetails = (id,thumbnail="")=>{
        if(thumbnail.includes('dummyjson')) {
            navigate(`/singlepd/${id}`);
        }
        else {
            navigate(`/moreDetails/${id}`)
        }
        
    }
    const displayResults = ()=>{
        if(products.length === 0) return <div className="message"><h2>No Results Found</h2></div>;
        return products.map(product=>(
            <Product api={product.thumbnail?.includes('dummyjson')?"dummyjson":"fakestore"} key={product.id} onClick={()=>getDetails(product.id,product.thumbnail)} {...product} />
        ))
    }
    return (
        <>
        <Navbar />
        <div className="searchpage">
            <div className="search-wrap products-cont">
                {displayResults()}
            </div>
        </div>
        <Footer />
        </>
    )
}

export default Search;