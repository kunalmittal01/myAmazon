import { useNavigate } from "react-router-dom";

const Multiproduct = (props)=>{
    const navigate = useNavigate();
    const toAllProd = ()=>{
        if(props.api == 'fakestore') {
            if(props.title == "Men's Clothing") {
                navigate("/moreproducts?q=men's clothing")
            }
            else if(props.title == "Women's Clothing") {
                navigate("/moreproducts?q=women's clothing");
            }
            else if(props.title == "Keep shopping for") {
                navigate("/moreproducts");
            }
        }
        else {
            if(props.title=='Groceries')
            navigate("/moreprod?q=groceries");
            
            else if(props.title=='Furniture') {
                navigate("/moreprod?q=furniture");
            }
        }
    }
    return (
        <div onClick={toAllProd} className="multiprod">
            <p className="multiprod-title">{props.title}</p>
            <div className="multi-imgs">
                <div className="prod-img">
                    <img src={props.img[0]} alt="" />
                </div>
                <div className="prod-img">
                    <img src={props.img[1]}  alt="" />
                </div>
                <div className="prod-img">
                    <img src={props.img[2]}  alt="" />
                </div>
                <div className="prod-img">
                    <img src={props.img[3]}  alt="" />
                </div>
            </div>
            <p className="seemorebtn">See more</p>
        </div>
    )
}

export default Multiproduct;