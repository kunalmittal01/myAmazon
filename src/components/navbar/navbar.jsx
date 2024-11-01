import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase.config";
import { collection, doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const Navbar = ()=>{
    const sidebarRef = useRef(null);
    const[active, setActive] = useState(false);

    const navigate = useNavigate();
    const items = useSelector(state=>state.cart.items);

    const showSidebar = ()=>{
        sidebarRef.current.style.width="20rem";
        setActive(true);
    }
    const closeSidebar = ()=>{
        sidebarRef.current.style.width="0";
        setActive(false);
    }
    
    useEffect(()=>{
        const handleOutsideClick = (e)=>{
            
            if(sidebarRef.current &&!sidebarRef.current.contains(e.target)) {
                closeSidebar();
            }

            document.addEventListener("click", handleOutsideClick)
        }
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    },[active])

    const [name, setName] = useState("");
    const [user] = useAuthState(auth);
    const [query, setQuery] = useState("");
    const [suggest, setSuggest] = useState([]);
    const getUser = async()=>{
        if(user) {
            const res = await getDoc(doc(db, "users" ,user?.uid));
            if(res.exists()){
                setName(res.data().name);
            }    
        }
    }
    useEffect(()=>{
        getUser();
    },[user])


    useEffect(()=>{
        const handleScroll =  ()=>{
            if(window.scrollY > 100) {
                document.querySelector('nav').style.position='fixed'
            }
            else {
                document.querySelector('nav').style.position='static'
            }
        }
        window.addEventListener('scroll', handleScroll);

    },[window.scrollY])

    const tosignin = ()=>{
        navigate("authentication");
    }
    const onlogout = async()=>{
        try {
            await signOut(auth)
            toast.success("logged out");
        }
        
        catch (e) {
            toast.error(e.message);
            console.error(e);
        }
    }

    const handleSearch = ()=>{
        if(query === "") {
            toast.error("Please enter something to search");
            return;
        }
        navigate(`/search?query=${query}`);
    }

    const fetchSuggestions = async()=>{
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        const res2 = await fetch('https://dummyjson.com/products');
        const data2 = await res2.json();
        const ar = [];
        data.forEach(item=>{
            ar.push({...item})
        })
        data2.products.forEach(item=>{
            ar.push({...item, rating: {rate: item.rating}, image: item.images[0]})
        })
        setSuggest(ar);
    }

    useEffect(()=>{
        fetchSuggestions();
    }
    ,[])


    return (
        <nav>
        <div className="nav1">
            <Link to="/">
                <div className="img-nav1">
                    <img src="https://priyanshu-240499.github.io/Assignments-CSS/Weekly%20Test%20for%20CSS%20(Week-3)/images/amazon_logo.png" alt="amazon-logo" />
                </div>
            </Link>
            <div className="loc">
                <p id="del">Deliver</p>
                <span><i className="fa-solid fa-location-dot"></i>
                <a href="#"><span>India</span></a></span>
            </div>
            <div className="search">
                <div className="search-wrap">
                    <select name="choice" id="all">
                        <option value="All">All</option>
                        <option value="All Categories">All Categories</option>
                        <option value="Amazon Devices">Amazon Devices</option>
                    </select>
                    <input onKeyUp={(e)=>{setQuery(e.target.value);
                    if(e.key=="Enter"){
                        handleSearch();
                    }}} type="text" vlaue={query} placeholder="Search Amazon" />
                    <span onClick={handleSearch}><i className="fa-sharp fa-solid fa-magnifying-glass"></i></span>
                </div>
                <div className="suggest-list">
                    {suggest.filter((item)=>{
                        if(query == "") {
                            return false;
                        }
                        return item.title.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase());
                    }).map((item,idx)=>{
                        return <div key={idx} onClick={()=>handleSearch()} >
                            <img src={item.image} alt="" />
                            <p>{item.title}</p>
                        </div>
                    })}
                </div>
            </div>
                
            <div className="query">
                    <div className="signin">
                        {
                            !user?<Link to="authentication"><p><span>Hello,sign in</span> <br/>
                        Account & Lists</p></Link>:
                        <p style={{cursor: "pointer"}} onClick={onlogout}><span>Hello,{name}</span><br/>Logout</p>
                        }
                        
                    </div>
                <div className="ro">
                    <a href="#"><p><span >Returns</span> <br/>
                       & Orders</p></a>
                </div>
                <Link to="cart">
                <div className="cart">
                <i className="fa-solid fa-cart-shopping"></i>
                    <span>cart</span>
                </div>
                <div className="itemfreq">
                    <span>{items.length}</span>
                </div>
                </Link>
            </div>    
        </div>
        <div className="nav2">
            <div className="services">
                <div onClick={showSidebar} className="btn-wrap">
                    <i className="fa-solid fa-bars"></i>
                    <p onClick={()=>navigate("/moreproducts")}>All</p>
                </div>
                <p onClick={()=>navigate("/search?query=women")}>Today's Deals</p>
                <p>Customer Service</p>
                <p className="servicecat">Registry</p>
                <p className="servicecat">Gift Cards</p>
                <p className="servicecat">Sell</p>
            </div>
            <div className="shop">
                <p>Shop deals in Electronics</p>
            </div>
        </div>
        <div ref={sidebarRef} className="sidebar">
            <div className="sidebar-head">
                <div className="side-auth">
                    <p onClick={tosignin}>Sign in</p>
                    <i className="fa-regular fa-user"></i>
                </div>
                <div className="side-browse">
                    <p>Browse</p>
                    <p>Amazon</p>
                </div>
            </div>
            <div className="side-home">
                <p onClick={()=>navigate('/')} className="cate-head">Amazon Home</p>
                <i className="fa-solid fa-house"></i>
            </div>
            <div className="sidecate trending">
                <p onClick={()=>navigate("/moreproducts")} className="cate-head">Trending Now</p>
                <div className="sidecate-list">
                    <p onClick={()=>navigate("/moreprod")}>Best Sellers</p>
                    <p onClick={()=>navigate("/moreproducts")}>New Releases</p>
                    <p>Movers and Shakers</p>
                </div>
            </div>
            <div className="sidecate top">
                <p className="cate-head">Top Categories for You</p>
                <div className="sidecate-list">  
                    <p onClick={()=>navigate("/search?query=electronics")}>Electronics</p>
                    <p>computers</p>
                    <p>Books</p>
                    <p onClick={()=>navigate("/search?query=men")}>Amazon Fashion</p>
                    <p onClick={()=>navigate("/moreprod")}>See All Categories</p>
                </div>    
            </div>
            <div className="sidecate prog">
                <p className="cate-head">Programs & Features</p>
                <div className="sidecate-list">  
                    <p>Today's Deals</p>
                    <p>Amazon Bazaar</p>
                    <p>Amazon Business</p>
                    <p>Amazon Pay</p>
                    <p>Amazon Launchpad</p>
                    <p>Handloom and Handicrafts</p>
                    <p>Amazon Saheli</p>
                    <p>Try Prime</p>
                    <p>Buy more, Save more</p>
                    <p>Sell on Amazon</p>
                    <p>Internationl Brands</p>
                </div> 
            </div>
            <div className="sideclose">
                <button onClick={closeSidebar}>X</button>
            </div>
        </div>
    </nav>
    )
}

export default Navbar;