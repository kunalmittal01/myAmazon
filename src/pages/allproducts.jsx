import { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import Product from "../components/products/product";
import { useLocation, useNavigate } from "react-router-dom";

const Allproducts = ()=>{
    const [allProducts,setAllProducts] = useState([]);
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const [query,setQuery] = useState("");
    const request = new URLSearchParams(useLocation().search).get("q");
    // console.log(request);
    
    const fetchAllProducts = async ()=>{
        setLoad(true);
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        setAllProducts(data);
        setLoad(false);
    }
    useEffect(()=>{
        fetchAllProducts();
    },[])

    useEffect(()=>{
        if(request) {
            setQuery(request);
            fetchAllProducts();
        }
        else {
            fetchAllProducts();
        }
    },[request])
    const getQuery = (e)=>{
        setQuery(e.target.textContent);
    }
    useEffect(()=>{
        console.log(query);
    },[query])

    const showDetails = (id)=>{
        navigate(`/moreDetails/${id}`)
    }
    const onSort = (e)=>{
        if(e.target.value=='A-Z')  {
            setAllProducts([...allProducts.sort((a,b)=>a.title.localeCompare(b.title))])
        }
        else if(e.target.value=='Z-A')  {
            setAllProducts([...allProducts.sort((a,b)=>b.title.localeCompare(a.title))])
        }
        else if(e.target.value=='low to high')  {
            setAllProducts([...allProducts.sort((a,b)=>a.price-b.price)])
        }
        else if(e.target.value=='high to low')  {
            setAllProducts([...allProducts.sort((a,b)=>b.price-a.price)])
        }
        else if(e.target.value=='rh2l') {
            setAllProducts([...allProducts.sort((a,b)=>b.rating.rate-a.rating.rate)])
        }
        else if(e.target.value=='rl2h') {
            console.log(e.target.value);
            
            setAllProducts([...allProducts.sort((a,b)=>a.rating.rate-b.rating.rate)])
        }
    }

    const displayProd = ()=>{
        return allProducts.filter((prod)=>{
            if(query=='Under $10') {
                return prod.price < 10;
            }
            else if(query=='$100-$500') {
                return prod.price >= 100 && prod.price < 500;
            }
            else if(query=='$500-$1,000') {
                return prod.price >= 500 && prod.price < 1000;
            }
            else if(query=='$1,000-$2,000') {
                return prod.price >= 1000 && prod.price < 2000;
            }
            else if(query=='Over $2,000') {
                return prod.price >= 2000;
            }
            return prod.category === query || query === "All" || query === ""
        })
    }
    return (
        <>
        {
            load? 
            <div className="loading-anim">
                <img src="https://cdn.dribbble.com/users/3742211/screenshots/9195657/media/6796a544d6f9ef1293d8d8d9e60d38d5.gif" alt="" />
            </div>:
            <>
        <Navbar />
        <div className="allprod">
            <div className="allprodleft">
                <div className="categorylist">
                    <h4>Category</h4>
                    <h3 onClick={getQuery}>All</h3>
                    <p onClick={getQuery}>men's clothing</p>
                    <p onClick={getQuery}>women's clothing</p>
                    <p onClick={getQuery}>electronics</p>
                    <p onClick={getQuery}>jewelery</p>
                </div>
                <div className="price">
                    <h3>Price</h3>
                    <p onClick={getQuery}>Under $10</p>
                    <p onClick={getQuery}>$100-$500</p>
                    <p onClick={getQuery}>$500-$1,000</p>
                    <p onClick={getQuery}>$1,000-$2,000</p>
                    <p onClick={getQuery}>Over $2,000</p>
                </div>
                <div className="moreoptions">
                    <h3>Sort By</h3>
                    <select onChange={(e)=>onSort(e)} name="" id="">
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                        <option value="low to high">price low to high</option>
                        <option value="high to low">price high to low</option>
                        <option value="rl2h">ratings low to high</option>
                        <option value="rh2l">ratings high to low</option>
                    </select>
                </div>
            </div>
            <div className="allprodright products-cont">
                {displayProd().length > 0?displayProd().map((prod)=>{
                    return <Product api="fakestore" onClick={()=>showDetails(prod.id)} key={prod.id} {...prod} />
                }):
                <div className="message">
                    <h2>No products found with this category or price range.</h2>   
                </div>
                }
            </div>
        </div>
        </>
        }
        </>
        
    )
}

export default Allproducts; 