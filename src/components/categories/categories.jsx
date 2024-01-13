import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoriesItem from './categoriesItem';
import searchIco from '../icons/Search.svg';
import { Link } from 'react-router-dom';
import CategoryPlaceholder from '../placeholders/categoryPlaceholder';

const Categories = () => {
  const [sortedCategories, setSortedCategories] = useState([]);
  const categories = useSelector((state) => state.categories.data);
  const {
    categories: { getCategories },
  } = useDispatch();

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setSortedCategories(
      categories.filter((category) => category.img !== '').slice(0, 14)
    );
  }, [categories]);

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
        {sortedCategories.length > 0
          ? sortedCategories.map((category) => {
            return (
              <Link to={'/catalog/category/' + category._id} key={category._id}>
                <CategoriesItem category={category} />
              </Link>
            )
          })
          : <CategoryPlaceholder itemsCount={7}/>
        }
      </div>
    </div>
  );
};

export default Categories;
