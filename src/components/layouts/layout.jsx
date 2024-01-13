import React, { useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import Breadcrumbs from './Breadcrumbs';
import { useLocation, useNavigate } from 'react-router-dom';
import { UseEnterShow } from '../../context/EnterContext';
import Enter from '../../pages/Enter/Enter';
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen";
import '../../styles/layout/wrapper.scss'

const Layout = ({ children }) => {
  const isMobile = useCheckMobileScreen();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const isAccountPage = location.pathname.includes('my-account');
  const { loginWithPhone, loginWithEmail, register, resetWithPhone, resetWithEmail } = UseEnterShow();

  useEffect(() => {
    if (loginWithPhone || loginWithEmail) {
      navigate('/login#');
    } else if (register) {
      navigate('/register#');
    }
  }, [loginWithPhone, loginWithEmail, register]);

  if (loginWithPhone || loginWithEmail || register || resetWithPhone || resetWithEmail) {
    return (
      <div className={'loginnig'}>
        <Enter />
      </div>
    );
  }

  if (isMobile && isAccountPage) {
    return (
      <div className={'main-background' + (isHomePage ? ' homeM' : '')}>
        <div className='container accountM'>
          {children}
        </div>
      </div>
    )
  } else {
    return (
        <div className={'main-background' + (isHomePage ? ' homeM' : '')}>
          <Header />
          <div className='container'>
            <Breadcrumbs />
            {children}
          </div>
          <Footer />
        </div>
    );
  }
};

export default Layout;
