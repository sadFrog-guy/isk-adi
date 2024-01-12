import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoriesItem from './categoriesItem';
import searchIco from '../icons/Search.svg';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [sortedCategories, setSortedCategories] = useState([]);
  const categories = useSelector((state) => state.categories.data);
  const {
    categories: { getCategories },
  } = useDispatch();

  useEffect(() => {
    getCategories();
  }, []);
  console.log(categories);

  useEffect(() => {
    setSortedCategories(
      categories.filter((category) => category.img !== '').slice(0, 14)
    );
  }, [categories]);

  const handleCategory = () => {
    
  }

  return (
    <div className='categories container'>
      <div className='categories-title'>
        <h2>Категории</h2>
      </div>
      <div className='categories-search'>
        <img src={searchIco} alt='search' />
        <input type='text' placeholder='Искать товар...' />
      </div>
      <div className='categories-items'>
        {sortedCategories.length > 0 &&
          sortedCategories.map((category) => {
            console.log(category);
            return (
              <Link to={'/catalog/category/' + category._id} key={category._id}>
                <CategoriesItem category={category} />
              </Link>
            )
          })}
      </div>
    </div>
  );
};

export default Categories;
