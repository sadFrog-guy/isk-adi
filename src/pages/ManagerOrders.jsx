import React, { useState } from "react";
import { ReactComponent as ArrowDown } from "../components/icons/arrow-down.svg";
import { ReactComponent as XIcon } from "../components/icons/x.svg";

import { useSelector } from "react-redux";
import { useClients } from "../hooks/useClients";

import "../styles/pages/ManageOrders.scss";
import BasketTable from "../components/BasketTable/BasketTable";
import Loader from '../components/Loader/Loader';

const ManageOrders = () => {
  const { cart } = useSelector(state => state.cart)

  const { data: clients, isLoading, isError } = useClients();
  
  return (
    <div className='manage_orders'>
        <div className='left'>
            <h1 className="heading">
                Ваши товары (16)
            </h1>

            <div className="add_product_select">
                Название товара

                <ArrowDown/>
            </div>

            <BasketTable/>
        </div>

        <div className='right'>
            <h1 className="heading details">
                Детали заказа
            </h1>

            <div className="form">
                <div className="form_group">
                    <p className="form_label">
                        Выберите клиента
                    </p>

                    <div className="form_select active">
                        <div className="form_select__top">
                            <input type="text" className="form_select__input" />

                            <ArrowDown/>
                            {/* <XIcon/> */}
                        </div>

                        <div className={`form_select__bottom ${isLoading ? 'loading' : ''}`}>
                            {isLoading
                              ? <Loader/>
                              : clients.map(item => {
                                  return <p>{item.role}</p>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ManageOrders;