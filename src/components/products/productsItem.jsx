import React, {useState} from 'react';
import { ReactComponent as IconProductDefault } from '../icons/product-default.svg';
import { ReactComponent as Plus } from '../icons/plus.svg';
import { ReactComponent as Minus } from '../icons/minus.svg';
import { ReactComponent as Heart } from '../icons/heart.svg';
import { ReactComponent as HeartFilled } from '../icons/heart_filled.svg';
import { useNavigate } from 'react-router-dom';
import useCart from "../../hooks/useCart";
import { LightTooltip } from "../LightTooltip/LightTooltip";
import { useDispatch, useSelector } from 'react-redux';

const ProductsItem = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {favourites} = useSelector(store => store.favourites)
  const [isHeartActive, setHeartActive] = useState(false);

  const {
    preventContextMenu,
    handleContextMenu,
    RemoveFromBasket,
    AddToBasket,
    isAdded,
    countCart
  } = useCart(product);

  const HandleHeartClick = () => {
    // setHeartActive(!isHeartActive)
    dispatch.favourites.addToFavourites(product)
    console.log(favourites);
  }
  const isFavourite = () => {
    return favourites?.filter(prod => prod._id !== product._id).length > 0
  }

  const navigateToDetail = () => {
    navigate(`/product/${product._id}`);
  };

  return (
      <>
        <div className='products-item'>
          <div className='products-item_imgdiv'>
            <div className='heart' onClick={HandleHeartClick}>
              {isFavourite() ? <HeartFilled/> : <Heart />}
            </div>
            {product.image !== null ? (
                <img
                    onClick={navigateToDetail}
                    src={product.image}
                    alt={product.name}
                    style={{position: !product.image ? '' : 'absolute'}}
                />
            ) : (
                <IconProductDefault onClick={navigateToDetail} />
            )}
          </div>
          <h3 onClick={navigateToDetail}>{product.name}</h3>
          <h2>
          <span className={product.promoPrice > 0 ? 'redPrice' : 'normalPrice'}>
            {product.price} с
          </span>
            <span className='discountPrice'>
            {product.promoPrice > 0 ? product.promoPrice + 'c' : ''}
          </span>
          </h2>
          <h4>В наличии</h4>
          <h5>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='5.8'
                height='5.8'
                viewBox='0 0 7 8'
                fill='none'
            >
              <circle
                  cx='3.5'
                  cy='4'
                  r='3.5'
                  fill={product.productSet !== null ? '#82CF6F' : '#949494'}
              />
            </svg>
            <div>В комплекте</div>
          </h5>
          <div className='products-item_bottom'>
            <div
                className='mathDiv'
                onClick={RemoveFromBasket}
                onContextMenu={preventContextMenu}
            >
              <Minus/>
            </div>
            <div className='quantity'>{countCart}</div>
            <LightTooltip title="Нажмите ПКМ чтобы добавить товар в корзину" arrow placement="bottom">
              <div
                  className={`mathDiv ${isAdded ? 'added' : ''}`}
                  onClick={AddToBasket}
                  onContextMenu={handleContextMenu}
              >
                <Plus />
              </div>
            </LightTooltip>
          </div>
        </div>
      </>
  );
};

export default ProductsItem;