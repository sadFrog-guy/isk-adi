import React, { useRef, useState } from "react";
import { ReactComponent as ArrowDown } from "../components/icons/arrow-down.svg";
import { ReactComponent as XIcon } from "../components/icons/x.svg";
import { ReactComponent as WalletIcon } from "../components/icons/wallet.svg";

import { useSelector } from "react-redux";
import { useClients } from "../hooks/useClients";

import "../styles/pages/ManageOrders.scss";
import BasketTable from "../components/BasketTable/BasketTable";
import Loader from '../components/Loader/Loader';

const ManageOrders = () => {
  const { cart } = useSelector(state => state.cart);
  const { data: clients, isLoading, isError } = useClients();
  const [isSearchClientActive, setSearchClientActive] = useState(false);
  const [searchClientTerms, setSearchClientTerms] = useState('');
  const [searchClientResults, setSearchClientResults] = useState([]);

  const handleClientSelect = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    const filteredResults = clients.filter((item) =>
      Object.values(item.user).some(
        (value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm)
      )
    );

    setSearchClientTerms(searchTerm)

    if(filteredResults.length === 0) {
      setSearchClientResults(clients)
    } else {
      setSearchClientResults(filteredResults)
    }
  }

  const handleClientClick = (client) => {
    setSearchClientTerms(client.user.lastName + ' ' + client.user.name)
  }

  const handleClientFocus = () => {
    setSearchClientActive(true)
  }

  const handleClientBlur = (e) => {
    setTimeout(() => {
      setSearchClientActive(false)
    }, 300)
  }

  const renderClients = () => {
    return searchClientResults.map(item => {
      return  <div class="client_item" onClick={() => handleClientClick(item)}>
                <p className="text">{item.user.lastName} {item.user.name.substring(0, 12) + '...'}</p>
                <p className="text">{item.user.phone}</p>
                <WalletIcon/>
              </div>
    })
  }
  
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

                    <div className={`form_select ${isSearchClientActive ? 'active' : ''}`}>
                        <div className="form_select__top">
                            <input
                              type="text"
                              className="form_select__input"
                              value={searchClientTerms}
                              onChange={handleClientSelect}
                              onFocus={handleClientFocus}
                              onBlur={handleClientBlur}
                            />

                            {isSearchClientActive
                              ? <XIcon/>
                              : <ArrowDown/>
                            }
                        </div>

                        <div 
                          className={`
                            form_select__bottom 
                            ${isLoading ? 'loading' : ''}
                            ${isSearchClientActive ? 'active' : ''}
                          `}
                        >
                          {isLoading
                            ? <Loader/>
                            : renderClients()
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