import React from 'react';
import { UseEnterShow } from '../../context/EnterContext';
import Register from './Register';
import LogIn from './LogIn';
import Reset from './Reset';

const Enter = () => {
  const { loginWithPhone, loginWithEmail, register, resetWithPhone, resetWithEmail } = UseEnterShow();

  if (loginWithPhone || loginWithEmail) {
    return <LogIn />;
  } else if (resetWithPhone || resetWithEmail) {
    return <Reset/>;
  } else {
    return <Register />;
  }
};

export default Enter;
