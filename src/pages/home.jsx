import { useNavigate } from "react-router-dom";
import Carousel from "../components/carousel/carousel";
import Trending from "../components/carousel/Trending";
import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";
import Multiproduct from "../components/products/multiproduct";
import Products from "../components/products/Products";
import { useState } from "react";

const Home = ()=>{
    const navigate = useNavigate();
    const carouselImages = ['https://images-eu.ssl-images-amazon.com/images/G/31/Events/img23/Jupiter24/J24_P3B_GW_PC_EventHero_NTA_2x_V2._CB543524088_.jpg','https://images-eu.ssl-images-amazon.com/images/G/31/img21/MA2024/GW/Jupiter/Phase3B/PC/Unrec/78247._CB543763953_.jpg','https://images-eu.ssl-images-amazon.com/images/G/31/IMG24/Smart_Watches/SEP_24/Jup_teaser24/Starting-799_3B_PC_Hero_3000x1200._CB543529790_.jpg','https://images-eu.ssl-images-amazon.com/images/G/31/img18/HomeImprovement/harsmisc/2024/Jupiter24/HI_Rec_UnReC_P3_A_A_3000X1200._CB543431881_.jpg','https://images-eu.ssl-images-amazon.com/images/G/31/img24/HPC/GW/Jup/Hero/P3/BTF/Cons_3A_PC_Hero_3000x1200_02._CB543869750_.jpg','https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/riya/GWiQoo/D168057516_3A_3B_PC_Hero_3000x1200_Lifestyle._CB543490203_.jpg','https://images-eu.ssl-images-amazon.com/images/G/31/img24/Consumables/Baby2024/HeroP3b/3B_PC_Hero_3000x1200_01._CB543525778_.jpg','https://images-eu.ssl-images-amazon.com/images/G/31/img24/Fresh/GW/Hero/Oct/25/Ambient_PC1x_Hero_1500x600._CB543711654_.jpg'];
    const imgs1 = ['https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg','	https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg','https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg','https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg']
    const imgs2 = ['https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg','https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg','https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg','	https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg']
    const imgs3= ['https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg','https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg','https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg','https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg']
    const trending =['https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg','https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg','https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg','https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg','https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg']
    const furniture = ['https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/1.png','https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/1.png','https://cdn.dummyjson.com/products/images/furniture/Wooden%20Bathroom%20Sink%20With%20Mirror/1.png','https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/1.png']
    const grocery = ['https://cdn.dummyjson.com/products/images/groceries/Apple/1.png','https://cdn.dummyjson.com/products/images/groceries/Cat%20Food/1.png','https://cdn.dummyjson.com/products/images/groceries/Chicken%20Meat/1.png','https://cdn.dummyjson.com/products/images/groceries/Cooking%20Oil/1.png']
    const toAllProd = ()=>{
        navigate("moreproducts");
    }
    return (
        <>
            <Navbar />
            <Carousel images={carouselImages}/>
            {/* <Products /> */}
            <div className="multiprod-cont">
                <Multiproduct title="Men's Clothing" api="fakestore" img={imgs1}/>
                <Multiproduct title="Keep shopping for" api="fakestore"  img={imgs2}/>
                <Multiproduct title="Women's Clothing" api="fakestore"  img={imgs3}/>
                <div className="adver">
                    <img src="	https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/16bac034-e089-426c-bf00-228b58692926.jpg" alt="" />
                </div>
            </div>
            <div className="banner-img2">
                <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img24/AmazonPay/JanART/Event-WTS_Creatives/Flight_GW_editorial_2300x646._CB584276567_.jpg" alt="" />
            </div>  
            <div className="trending-slider">
                <div className="trending-head">
                    <h3>Trending Deals</h3>
                    <p onClick={toAllProd} className="seemorebtn">See all deals</p>
                </div>
                <div className="trending-slider-cont">
                    <Trending items={trending} />
                </div>
            </div>
            <div style={{marginBottom:"2rem",position: "static"}} className="multiprod-cont">
                <Multiproduct title="Furniture" api="dummy"  img={furniture}/>   
                <Multiproduct title="Men's Clothing" api="fakestore"  img={imgs1}/>
                <Multiproduct title="Groceries" api="dummy" img={grocery}/>
                <Multiproduct title="Keep shopping for" api="fakestore" img={imgs2}/>
            </div>
            <Products />
            <Footer />
        </>
    )
}

export default Home;