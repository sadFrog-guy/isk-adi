import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  if (pathnames.length === 0 || pathnames.includes('home')) {
    return null;
  }
  return (
    <div className='breadcrumbs'>
      <Link to='/home'>Главная</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = getDisplayName(name, location.state);
        return isLast ? (
          <span key={name}>{displayName}</span>
        ) : (
          <span key={name}>
            <Link to={routeTo} state={{ breadcrumbText: displayName }}>
              {displayName}
            </Link>
          </span>
        );
      })}
    </div>
  );
};

const getDisplayName = (name, state) => {
  if (state && state.breadcrumbText) {
    return state.breadcrumbText;
  }
  const pathMapping = {
    catalog: 'Каталог',
    addresses: 'Адреса магазинов',
    category: 'Категория',
    basket: 'Корзина',
    'my-account': 'Мой аккаунт',
    favourites: 'Избранные товары',
    'news-promotions': 'Новости и акции',
    'order-history': 'История заказов',
    'privacy-policy': 'Политика конфиденциальности',
    'terms-use': 'Условия использования',
    settings: 'Настройки',
    contacts: 'Контакты',
    product: 'Детали товара',
    login: 'Логин',
    register: 'Регистрация',
    manager: 'Корзина менеджера'
  };
  return pathMapping[name.toLowerCase()] || name;
};

export default Breadcrumbs;
