import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Trending = ({items})=>{
    const NextArrow = ({ onClick }) => {
        return (
          <div className="custom-arrow custom-arrow-next" onClick={onClick}>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        );
      };
      
      const PrevArrow = ({ onClick }) => {
        return (
          <div className="custom-arrow custom-arrow-prev" onClick={onClick}>
            <i className="fa-solid fa-arrow-left"></i>
          </div>
        );
      };
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4, 
        slidesToScroll: 1,
        arrows: true, 
        nextArrow: <NextArrow />, 
        prevArrow: <PrevArrow />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      };
      return (
        <Slider {...settings}>
          {items.map((item, index) => (
            <div key={index}>
              <img src={item} alt={"image"} style={{ width: '100%' }} />
            </div>
          ))}
        </Slider>
      );
}

export default Trending;