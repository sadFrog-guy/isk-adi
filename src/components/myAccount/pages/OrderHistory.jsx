import React, { useState } from 'react';
import { ReactComponent as Icon } from '../../../components/icons/Frame 48095518.svg';
import '../../../styles/components/OrderHistory.scss';
import OrderItem from "../../OrderItem/OrderItem";
import EmptySection from "../../EmptySection/EmptySection";
import clock_icon from '../../icons/clock-nohistory.svg';
import useCheckMobileScreen from "../../../hooks/useCheckMobileScreen";
import TopNavMobile from "../../TopNavMobile/TopNavMobile";
import { locale, addLocale } from 'primereact/api';
import { Calendar } from 'primereact/calendar';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import api from '../../../services/api';

const OrderHistory = () => {
  const {user} = useSelector(store => store.cart)
  const { data: orderList, isLoading, isError } = useQuery(
      'product',
      () => api.get(`sklad/client/order/${user?._id}`).then((res) => res.data),
      { enabled: true }
  );
  console.log(orderList);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const isMobile = useCheckMobileScreen();
  addLocale('ru', {
    firstDayOfWeek: 1,
    dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    dayNamesShort: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
    dayNamesMin: ['В', 'П', 'В', 'С', 'Ч', 'П', 'С'],
    monthNames: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
    monthNamesShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
    today: 'Сегодня',
    clear: 'Очистить',
  });
  locale('ru')

  const orders = [
    {
      id: 1,
      name: 'Таалайбек к Элнура',
      number: '№SITE-13909',
      price: '24 262,05 сом ',
      btn: {
        text: 'Резерв не собирать',
        class: 'first',
      },
    },{
      id: 2,
      name: 'Таалайбек к Элнура',
      number: '№SITE-13909',
      price: '24 262,05 сом ',
      btn: {
        text: 'Подтвержден юг',
        class: 'second',
      },
    },
    {
      id: 3,
      name: 'Таалайбек к Элнура',
      number: '№SITE-13909',
      price: '24 262,05 сом ',
      btn: {
        text: 'Самовывоз',
        class: 'third',
      },
    },
    {
      id: 4,
      name: 'Таалайбек к Элнура',
      number: '№SITE-13909',
      price: '24 262,05 сом ',
      btn: {
        text: 'Резерв не собирать',
        class: 'first',
      },
    },
  ];


  return (
    <div className='orders_history'>
      {isMobile &&
        <TopNavMobile title='История заказов' additionalClass='profileEdit_nav' />
      }

      <h1>История заказов</h1>
      <div className='date_order'>
        <span className='gray_text'>Выберите даты:</span>
        <div className='dates'>
          <Calendar className='datepicker' value={startDate} onChange={(e) => setStartDate(e.value)} />
          <Calendar className='datepicker' value={endDate} onChange={(e) => setEndDate(e.value)} />
        </div>
        <div className='orders'>
          {/* <span className='gray_text'>15.10.2023</span> */}

          {orderList?.length !== 0
            ? orderList?.map(el => <OrderItem icon={<Icon />} el={el} />)
            : <EmptySection icon={clock_icon} title='История заказов пустая' />
          }
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
