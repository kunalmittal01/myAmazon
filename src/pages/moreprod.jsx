import { useEffect, useState } from "react"
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import Product from "../components/products/product";
import { useLocation, useNavigate } from "react-router-dom";


const Moreprod = ()=>{
    const [products,setProducts] = useState([]);
    const [query, setQuery] = useState("");
    const [load,setLoad] = useState(false);
    const navigate= useNavigate();
    const request = new URLSearchParams(useLocation().search).get("q");
    const onSort = (e)=>{
        if(e.target.value=='A-Z')  {
            setProducts([...products.sort((a,b)=>a.title.localeCompare(b.title))])
        }
        else if(e.target.value=='Z-A')  {
            setProducts([...products.sort((a,b)=>b.title.localeCompare(a.title))])
        }
        else if(e.target.value=='low to high')  {
            setProducts([...products.sort((a,b)=>a.price-b.price)])
        }
        else if(e.target.value=='high to low')  {
            setProducts([...products.sort((a,b)=>b.price-a.price)])
        }
        else if(e.target.value=='rh2l') {
            setProducts([...products.sort((a,b)=>b.rating.rate-a.rating.rate)])
        }
        else if(e.target.value=='rl2h') {
            console.log(e.target.value);
            
            setProducts([...products.sort((a,b)=>a.rating.rate-b.rating.rate)])
        }
    }
    const displayProd = ()=>{
        return products.filter((prod)=>{
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
    const fetchProducts = async ()=>{
        setLoad(true);
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();
        console.log(data);
        const ar = data.products?.map(data=>{
            return {...data, rating: {rate: data.rating},image:data.images[0]}
        })
        setProducts(ar);
        setLoad(false);
    }
    useState(()=>{
        fetchProducts();
    },[])
    useEffect(()=>{
        if(request) {
             setQuery(request)
        }
       
    },[request])
    const getQuery = (e)=>{
        setQuery(e.target.textContent);
    }
    const showDetails = (id)=>{
        navigate(`/singlepd/${id}`)
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
                    <p onClick={getQuery}>beauty</p>
                    <p onClick={getQuery}>fragrances</p>
                    <p onClick={getQuery}>furniture</p>
                    <p onClick={getQuery}>groceries</p>
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
                    return <Product api="dummyjson" onClick={()=>showDetails(prod.id)} key={prod.id} {...prod} />
                }):
                <div className="message">
                    <h2>No products found with this category or price range.</h2>   
                </div>
                }
            </div>
            
    </div>
    <Footer />
    </>
    }
    </>
 )
}

export default Moreprod