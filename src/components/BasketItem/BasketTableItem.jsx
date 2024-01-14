import React from 'react'
import { ReactComponent as IconProductDefault } from '../icons/product-default.svg';
import { ReactComponent as TrashIcon } from "../icons/Trash Bin.svg";
import { ReactComponent as Minus} from "../icons/minus.svg";
import { ReactComponent as Plus} from "../icons/plus.svg";

const BasketTableItem = ({product = {}}) => {
  return (
    <div className="table_item">
        <div className="table_item__image">
            <IconProductDefault/>
        </div>

        <h3 className="table_item__name">
            Зеркало Анталия (3 полки) (Дуб Крафт Бел) 500*700 (Four) Стандарт Анталия (3 полк..
        </h3>

        <div className="table_item__quantity">
            <div className='mathDiv'>
                <Minus/>
            </div>
            <div className='quantity'>1</div>
            <div className='mathDiv'>
                <Plus />
            </div>
        </div>

        <p className="table_item__price">
            1000 c
        </p>

        <TrashIcon/>    
    </div>
  )
}

export default BasketTableItem
