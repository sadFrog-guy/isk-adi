import React from 'react'
import BasketTableItem from '../BasketItem/BasketTableItem';

const BasketTable = () => {
  const mockup = [1, 2, 3, 4, 5, 6]

  return (
    <div className="table">
        <div className="table_heading">
            <p className="table_heading__item">
                Фото
            </p>

            <p className="table_heading__item">
                Название
            </p>

            <p className="table_heading__item">
                Кол-во
            </p>

            <p className="table_heading__item">
                Цена
            </p>

            <div className="table_heading__item"/>
        </div>

        {mockup.map((_, index) => {
            return <BasketTableItem key={index}/>
        })}
    </div>
  )
}

export default BasketTable
