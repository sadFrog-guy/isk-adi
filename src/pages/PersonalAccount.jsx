import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavigationPanel from '../components/myAccount/NavigationPanel';
import Profile from '../components/myAccount/pages/Profile';
import Favourites from '../components/myAccount/pages/Favourites';
import OrderHistory from '../components/myAccount/pages/OrderHistory';
import PrivacyPolicy from '../components/myAccount/pages/PrivacyPolicy';
import TermsUse from '../components/myAccount/pages/TermsUse';
import { useSelector } from 'react-redux';

const MyAccount = () => {
  const {user} = useSelector(store => store.cart)
  useEffect(() => {
    if (!user?.name) {
      window.location.pathname = '/home'
    }
  },[user])
  return (
    <div className='my_account'>
      <NavigationPanel />
      <div className='my_account_pages'>
        <Routes>
          <Route path='/' element={<Profile />} />
          <Route path='/favourites' element={<Favourites />} />
          <Route path='/order-history' element={<OrderHistory />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/terms-use' element={<TermsUse />} />
        </Routes>
      </div>
    </div>
  );
};

export default MyAccount;
