import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Icons from '../../icons/myAccount';
import kyrgyzstan_icon from '../../icons/Kyrgyzstan.svg';
import arrowDown_icon from '../../icons/arrow-down.svg';
import userMy_icon from '../../icons/User.svg';
import messageMy_icon from '../../icons/Message.svg';
import locationMy_icon from '../../icons/Location-i.svg';
import calendarMy_icon from '../../icons/calendar.svg';
import { useSelector } from 'react-redux';
import api from '../../../services/api';
import { useQuery } from 'react-query';

const Profile = () => {
  const { user } = useSelector(store => store.cart)
  const inputFileRef = useRef(null)
  const [deployImage, setDeployImage] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });
  const defaultProfileImage = 'data:image/jpeg;base64,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'
  const [selectedGender, setSelectedGender] = useState(null);
  
  const { data: userBalance, isLoading, isError } = useQuery(
    ['balance', user?._id],
    () => api.get(`/client/getClientBalance/${user?._id}`).then((res) => res.data.balance),
    { enabled: true }
    );
    // console.log(user);

  const onSubmit = (data) => {
    const formData = { ...data, sex: selectedGender };
    console.log(formData);
  };
  /////////////////
  const handleSelectImage = (e) => {
    console.log(e.target.files.length);
    if (!e.target.files.length) return;
    let file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => setDeployImage(reader.result)
  }

  const handleGenderButtonClick = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <div className='personal_data'>
      <h1 className='personal_data_title'>Личные данные</h1>
      <div className='top_block'>
        <div className='left'>
          <div className='avatar_update'>
            <img className='avatar' src={user?.image || deployImage || defaultProfileImage} alt='your photo' />
            <input type="file" ref={inputFileRef} accept="image/png, image/jpeg, image/webp" onChange={handleSelectImage} className='inputAvatar' />
            <button onClick={() => inputFileRef.current.click()} className='upload_button'>Загрузить фото</button>
          </div>
          <div className='bonus_indebtedness'>
            <div className='block'>
              <h1 className='title'>Бонусы</h1>
              <span className='line'></span>
              <p className='som'>{user?.points} c</p>
            </div>
            <div className='block'>
              <h1 className='title'>Дебиторская задолженность</h1>
              <span className='line'></span>
              <p className='som'>{ userBalance < 0 ?  `-${userBalance}` : userBalance } c</p>
            </div>
          </div>
          <img className='qr_code' src={Icons.QrCodeIcon} alt='QR code' />
        </div>
        {/* ! form */}
        <div className='right'>
          <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <div className='input_high_block'>
              <label htmlFor='user_name'>ФИО</label>
              <div className='input_block'>
                <img className='icon' src={userMy_icon} alt='' />
                <input
                  type='text'
                  className={`input ${errors.name && `error`}`}
                  placeholder='ФИО'
                  defaultValue={user?.name || 'ФИО'}
                  {...register('name', { required: true, minLength: 2 })}
                />
              </div>
            </div>
            <div className='input_high_block'>
              <label htmlFor='user_name'>Номер телефона</label>
              <div className='input_block'>
                <div className='input input_wrap'>
                  <div className='input_wrap__flex'>
                    <img className='icon' src={kyrgyzstan_icon} alt='' />
                    <img className='icon' src={arrowDown_icon} alt='' />
                  </div>

                  <input
                    type='text'
                    className={`input input_wrap__phone ${errors.phone && `error`}`}
                    placeholder='Номер телефона'
                    defaultValue={user?.phone}
                    {...register('phone', { required: true })}
                  />
                </div>
              </div>
            </div>
            <div className='input_high_block'>
              <label htmlFor='user_name'>E- mail</label>
              <div className='input_block'>
                <img className='icon' src={messageMy_icon} alt='' />
                <input
                  type='text'
                  className={`input ${errors.email && `error`}`}
                  placeholder='E- mail'
                  defaultValue={user?.email}
                  {...register('email', {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
              </div>
            </div>
            <div className='input_high_block'>
              <label htmlFor='user_name'>Дата рождения</label>
              <div className='input_block'>
                <img className='icon' src={calendarMy_icon} alt='' />
                <input
                  type='date'
                  className={`input input_date ${errors.date && `error`}`}
                  defaultValue={user?.birthDate || '01.21.1995'}
                  {...register('date', { required: true })}
                />
              </div>
            </div>
            <div className='input_high_block'>
              <label htmlFor='user_name'>Город</label>
              <div className='input_block'>
                <img className='icon' src={locationMy_icon} alt='' />
                <input
                  type='text'
                  className={`input ${errors.city && `error`}`}
                  placeholder='Город'
                  defaultValue={user?.city}
                  {...register('city', { required: true, minLength: 2 })}
                />
              </div>
            </div>
            <div className='input_high_block'>
              <label htmlFor='user_name'>Пол</label>
              <div className='buttons_block'>
                <span
                  className={`button_sex ${selectedGender === 'Мужчина' ? 'active' : ''
                    }`}
                  onClick={() => handleGenderButtonClick('Мужчина')}
                >
                  Мужчина
                </span>
                <span
                  className={`button_sex ${selectedGender === 'Женщина' ? 'active' : ''
                    }`}
                  onClick={() => handleGenderButtonClick('Женщина')}
                >
                  Женщина
                </span>
              </div>
            </div>
            <span className='line'></span>
            <div className='input_high_block'>
              <div className='buttons_block'>
                <button type='submit' className='button_submit active'>
                  Сохранить
                </button>
                <span className='button_submit undo'>Отмена</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
