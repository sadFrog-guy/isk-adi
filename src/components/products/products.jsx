import React, {useEffect} from 'react';

// Import css files
import Slider from 'react-slick';
import ProductsItem from './productsItem';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useQuery } from 'react-query';
import ProductPlaceholder from './../placeholders/productPlaceholder';

export default function Products({ title }) {
  const { data:products, isLoading, isError } = useQuery(
    'products',
    () => api.get('/api/getProducts?bestseller=true&page=1').then((res) => res.data.objects),
    { enabled: true }
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error :</p>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 6000,
    cssEase: "linear",
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 770,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                centerMode: false,
                dots: false
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false
            }
        }
    ]
};
  return (
    <div className='products container'>
      <div className='products-title'>
        <h2>{title}</h2>
        <Link to='/catalog' className='categories-title_right'>
          перейти в каталог
        </Link>
      </div>

      {isLoading
        ? <ProductPlaceholder itemsCount={5}/>
        : <Slider {...settings}>
            {products.map((product) => (
              <ProductsItem key={product.id} product={product} />
            ))}
          </Slider>
      }
      
    </div>
  );
}
