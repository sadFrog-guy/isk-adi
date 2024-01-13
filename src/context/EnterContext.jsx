import React, { createContext, useState, useContext } from 'react';

const EnterContext = createContext();

export const UseEnterShow = () => {
  return useContext(EnterContext);
};

export const EnterProvider = ({ children }) => {
  const [loginWithPhone, setLoginWithPhone] = useState(false);
  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [resetWithPhone, setResetWithPhone] = useState(false);
  const [resetWithEmail, setResetWithEmail] = useState(false);
  const [register, setRegister] = useState(false);

  const HandleEndAuth = () => {
    setRegister(false);
    setLoginWithPhone(false);
    setLoginWithEmail(false);
    setResetWithEmail(false)
    setResetWithPhone(false)
  }
  const ShowRegister = () => {
    setRegister(true);
    setLoginWithPhone(false);
    setLoginWithEmail(false);
    setResetWithEmail(false)
    setResetWithPhone(false)
  }
  const ShowLoginPhone = () => {
    setLoginWithPhone(true);
    setLoginWithEmail(false);
    setRegister(false);
  }
  const ShowLoginEmail = () => {
    setLoginWithEmail(true);
    setLoginWithPhone(false);
    setRegister(false);
  }
  const ShowResetPhone = () => {
    setResetWithPhone(true)
    setResetWithEmail(false)
    setLoginWithEmail(false);
    setLoginWithPhone(false);
    setRegister(false);
  }
  const ShowResetEmail = () => {
    setResetWithEmail(true)
    setResetWithPhone(false)
    setLoginWithEmail(false);
    setLoginWithPhone(false);
    setRegister(false);
  }

  return (
    <EnterContext.Provider
      value={{
        loginWithPhone,
        loginWithEmail,
        register,
        ShowRegister,
        ShowLoginPhone,
        ShowLoginEmail,
        ShowResetPhone,
        ShowResetEmail,
        HandleEndAuth,
        resetWithPhone,
        resetWithEmail,
      }}
    >
      {children}
    </EnterContext.Provider>
  );
};
