import React from 'react';
import Search from '../../UI/Search/Search';
import ProductsItem from '../../products/productsItem';
import Product from '../.../../../../components/icons/product-default.svg';
import '../../../styles/components/favourites.scss';
import NoFavourites from "../../NoFavourites/NoFavourites";

const Favourites = () => {
  const favorite = {
    name: 'Держатель для лейки BOOU PG605',
    image: Product,
    price: 1000,
    promoPrice: 1294,
    quantity: 1,
  };

  // можете заменять комментарий на 19 и 20 строках чтобы показать\спрятать товары

  const favourites = new Array(4).fill(favorite);
  // const favourites = []

  return (
    <div className='favourites_container'>
      <h1>Избранные товары</h1>
      <div className='favourites'>
        {favourites.length != 0
          ? favourites.map((favourite, idx) => (
                <ProductsItem key={idx} product={favourite} />
            ))
          : <NoFavourites/>
        }
      </div>
    </div>
  );
};

export default Favourites;
