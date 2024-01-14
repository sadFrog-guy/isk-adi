import React, { useEffect, useState } from 'react';
import { ReactComponent as Plus } from '../../icons/plus.svg';
import { ReactComponent as Minus } from '../../icons/minus.svg';
import Item from '../../icons/item-logo.svg';
import './BasketItem.scss';
import useCart from "../../../hooks/useCart";
import {useDispatch} from "react-redux";

const BasketItem = ({ el }) => {
  const [options, setOptions] = useState(false);
  const dispatch = useDispatch();

  const {
    preventConextMenu,
    handleContextMenu,
    RemoveFromBasket,
    isAdded,
  } = useCart(el.product);

  const handlePriceAndCount = () => {
    dispatch.cart.increment(el)
    dispatch.cart.countPrices()
  }

  const handleDelete = () => dispatch.cart.removeFromCart(el)

  return (
    <div className='item'>
      <div className='top'>
        <img src={Item} alt='#' />
        <div className='title'>
          <p>{el.product.name}</p>
          <p>
            <span>Длина- 170 см.</span>
            <span>Ширина- 70 см.</span>
            <span>Глубина- 50 см.</span>
          </p>
        </div>
        <div className='points' onClick={() => setOptions(!options)}>
          <div className='point'></div>
          <div className='point'></div>
          <div className='point'></div>
          {options && (
            <div className='options'>
              <div className='opt first'>Редактирование комплекта</div>

              <div className='line'></div>

              <div className='opt second'>Перенести в сохраненные</div>

              <div className='line'></div>

              <div
                  className='opt third'
                  onClick={handleDelete}
              >
                Удалить
              </div>

              <div className='line'></div>

              <div className='opt fourth'>Отмена</div>
            </div>
          )}
        </div>
      </div>
      <div className='bottom'>
        <h2 className='price'>{el.product.price} с</h2>
        <div className='quantity'>
          <div
              className='mathDiv'
              onClick={() => dispatch.cart.decrement(el)}
              onContextMenu={preventConextMenu}
          >
            <Minus/>
          </div>
          <div className='quantity'>{el.count}</div>
          <div
              className={`mathDiv ${isAdded ? 'added' : ''}`}
              onClick={handlePriceAndCount}
              onContextMenu={handleContextMenu}
          >
            <Plus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketItem;
