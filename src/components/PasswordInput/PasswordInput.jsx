import React, { useState } from 'react';
import { ReactComponent as Eye } from '../../components/icons/Eye.svg';
import { ReactComponent as OpenEye } from '../../components/icons/OpenEye.svg';
import { ReactComponent as Key } from '../../components/icons/Key.svg';
import { UseEnterShow } from '../../context/EnterContext';

const PasswordInput = ({ handleChange, label, addition }) => {
  const { ShowResetPhone } = UseEnterShow()
  const [shownPassword, setShownPassword] = useState(false);
  const handleShow = () => {
    setShownPassword(!shownPassword);
  };
  return (
    <div className='input'>
      <label htmlFor='password' className='label'>
        {label ? label : 'Пароль'}
      </label>
      <Key />
      <input
        id='password'
        name='password'
        type={shownPassword ? 'text' : 'password'}
        onChange={(e) => handleChange(e, 'password')}
      />
      {shownPassword ? (
        <OpenEye onClick={handleShow} />
      ) : (
        <Eye onClick={handleShow} />
      )}
      <p onClick={ShowResetPhone} className='passwrd-sec'>{addition ? addition : 'Забыли пароль?'}</p>
    </div>
  );
};

export default PasswordInput;
