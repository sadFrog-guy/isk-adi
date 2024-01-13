import React from 'react';

const OrderItem = ({icon, el}) => {
  return (
      <div className='order' key={el.id}>
        <div className='user'>
          {icon}
          <div className='user__name'>
            <p>{el.clientName}</p>
            <span>{el.clientName}</span>
          </div>
        </div>
        <h3>{el.sum} {el.currency}</h3>
        <div className='button_wrap'>
          <button className={'first'}>{el.stateName}</button>
        </div>
      </div>
  );
};

export default OrderItem;