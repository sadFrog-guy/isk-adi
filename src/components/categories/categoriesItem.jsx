import React from 'react';

const CategoriesItem = ({ category }) => {

  return (
    <div className='categories-item'>
      <div className="categories-item-wrap">
        <h3>{category.name}</h3>
        <p>3000 товаров</p>
      </div>
      <img src={category.img} alt={category.name} />
    </div>
  );
};

export default CategoriesItem;
