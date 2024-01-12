import React, { useState, useEffect } from 'react';
import { ReactComponent as TrashIcon } from '../icons/Trash Bin.svg';
import BasketItem from '../UI/BasketItem/BasketItem.jsx';
import Ava from '../icons/Кухонные.svg';
import '../../styles/components/basket.scss';
import { UseBasket } from '../../context/BasketContext.jsx';
import {useDispatch, useSelector} from "react-redux";

const BasketContent = () => {
  const dispatcher = useDispatch();
  const { cart, prices, len, lenString } = useSelector(state => state.cart);
  const [click, setclick] = useState(false);

  useEffect(() => {
    dispatcher.cart.countPrices()
    dispatcher.cart.countLenString()
    dispatcher.cart.countLen()
  }, [])

  const openAsk = () => {
    setclick(true);
  };

  const closeAsk = () => {
    setclick(false);
  };

  const clearCart = () => {
    closeAsk()

    dispatcher.cart.removeAllCart()
  }

  return (
    <>
      <div className='delete'>
        <div onClick={openAsk}>
          <TrashIcon />
        </div>
        {click && (
          <div className='ask'>
            <p>Вы действительно хотите очистить корзину?</p>
            <div className='btns'>
              <button className='clear' onClick={clearCart}>Очистить</button>
              <button className='cencel' onClick={closeAsk}>
                Отмена
              </button>
            </div>
          </div>
        )}
      </div>
      <div className='content'>
        <div className='content_left'>
          {cart.map((el) => (
            <BasketItem el={el} key={el.product.id} />
          ))}
        </div>
        <div className='content_right'>
          <div className='orders'>
            <div className='orders_left'>
              <p>Сумма заказа:</p>
              <div className='images'>
                {[...Array(len)].map((_, id) => {
                  const zIndex = id === len ? len : len - 1; // Check if it's the first element
                  const left = 20 * id; // Increase left by 20px each iteration

                  return (
                    <img
                      key={id}
                      src={Ava}
                      alt='#'
                      className='a'
                      style={{ zIndex, left }}
                    />
                  );
                })}
              </div>
            </div>
            <div className='orders_right'>
              <h4>{prices} сом</h4>
              <p>{lenString}</p>
            </div>
          </div>
          <div className='line'></div>
          <h3>Бонусы к списанию</h3>
          <div className='bonus'>
            <p>
              <span className='first'>На вашем счету:</span>
              <span className='second'>1200 сом</span>
            </p>
            <label htmlFor='annul'>Cколько списать</label>
            <input type='text' id='annul' />
          </div>

          <div className='quantity'>
            <p>
              <span className='first'>Кол-во товаров:</span>
              <span className='second'>{lenString}</span>
            </p>
            <p>
              <span className='third'>Общая сумма:</span>
              <span className='fourth'>{prices} сом</span>
            </p>
            <button>Оформить заказ</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasketContent;
