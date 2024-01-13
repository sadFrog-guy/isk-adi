import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as Icons from '../icons/myAccount';
import { useDispatch } from 'react-redux';

const NavigationPanel = () => {
  const dispatch = useDispatch()
  const [logout, setLogout] = useState(false)
  const navLinksFirst = [
    {
      icon: Icons.ProfileIcon,
      label: 'Мои данные',
      href: '/my-account',
    },
    {
      icon: Icons.HeartIcon,
      label: 'Избранные товары',
      href: '/my-account/favourites',
      fav_count: 5
    },
    {
      icon: Icons.ClockSquareIcon,
      label: 'История заказов',
      href: '/my-account/order-history',
    },
    {
      icon: Icons.ShieldDoneIcon,
      label: 'Политика конфиденциальности',
      href: '/my-account/privacy-policy',
    },
    {
      icon: Icons.PaperNoteV2Icon,
      label: 'Условия использования',
      href: '/my-account/terms-use',
    },
  ];
  function handleLogout() {
    dispatch.cart.afterLoginUser({})
  }
  function toggleAskLogout() {
    setLogout(prev => !prev)
  }

  return (
    <div className='my_account_navigation'>
      <div className='my_account_navigation_block'>
        {navLinksFirst.map((item, index) => (
          <NavLink
            key={index}
            className={`my_account_navigation_block_link
          ${index !== navLinksFirst.length - 1 && 'line'}`}
            to={item.href}
            end
          >
            <div className='my_account_navigation_block_label'>
              <img src={item.icon} alt='Test' /> {item.label}
            </div>

            {item.fav_count &&
              <div className='fav_count'>
                {item.fav_count}
              </div>
            }
          </NavLink>
        ))}
      </div>
      <div className='my_account_navigation_block'>
        <button onClick={toggleAskLogout} className='my_account_navigation_block_link logout_button'>
          <img src={Icons.LogoutIcon} alt='LogoutIcon' />
          Выйти
        </button>
        {logout && (
          <div className='ask'>
            <p>Вы действительно хотите выйти?</p>
            <div className='btns'>
              <button className='clear' onClick={handleLogout}>Выйти</button>
              <button className='cencel' onClick={toggleAskLogout}>
                Остаться
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default NavigationPanel;
