import React, { useEffect, useState } from "react"
import { ReactComponent as Minus } from "../components/icons/minus.svg"
import { ReactComponent as Plus } from "../components/icons/plus.svg"
import { ReactComponent as Heart } from "../components/icons/heart.svg"
import { ReactComponent as BrokeImage } from "../components/icons/brokeImage.svg"
import { ReactComponent as ActiveHeart } from "../components/icons/activeHeart.svg"
import { LightTooltip } from "../components/LightTooltip/LightTooltip"
import { Skeleton } from 'primereact/skeleton';
import Products from "../components/products/products"

import brokenImage from '../assets/brokenImage.jpg'
import img2 from "../components/icons/detail-img2.svg"

import "../styles/components/DetailOfProduct.scss"
import { useParams } from "react-router"
import { useQuery } from "react-query"
import api from "../services/api"
import Loader from './../components/Loader/Loader';
import useCart from "../hooks/useCart";

const DetailOfProduct = () => {
    const { id } = useParams()
    const { data: product, isLoading, isError } = useQuery(
        ['product', id],
        () => api.get(`/api/getProduct/${id}`).then((res) => res.data.object),
        { enabled: true }
    );
    console.log(product);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])
    const [checked, setChecked] = useState(false)
    const Check = () => {
        setChecked(!checked)
    }
    const {
        preventContextMenu,
        handleContextMenu,
        RemoveFromBasket,
        AddToBasket,
        isAdded,
        countCart
      } = useCart(product);

    const complect = {
        img: img2,
        title: "Зеркало Анталия (3 полки) (Дуб Крафт Бел) 500*700 (Four) Стандарт Анталия (3 полк..",
        price: "14200 с",
    }
    const complects = new Array(6).fill(complect)

    return (
        <>
            <div className="detail_page">
                <div className="about_product">
                    <div className="left">
                        <div className="first-c">
                            {product?.images ?
                                <img
                                    src={img2}
                                    alt="#"
                                    className="img"
                                /> :
                                new Array(4).fill(0).map(() => (
                                    <BrokeImage />
                                ))
                            }
                        </div>
                        <div className="second-c">
                            <img
                                src={product?.image || brokenImage}
                                style={{ width: product?.image ? '' : "100%" }}
                                alt=""
                                className="second-c__image"
                            />
                            <div
                                onClick={() => { }}
                                className="heart"
                            >
                                {false ? <ActiveHeart /> : <Heart />}
                            </div>
                        </div>
                    </div>
                    <div className="third-c">
                        {
                            isLoading ?
                                <Skeleton height="2rem" className="mb-2"></Skeleton> :
                                <h2>
                                    {product?.name}
                                </h2>
                        }
                        <p>Комплекты:</p>
                        <div className="complects scrollbar_primary">
                            {product?.productSet?.length ? complects.map((el, index) => (
                                <div
                                    key={index}
                                    className="complect"
                                    onClick={() => Check()}
                                >
                                    <div
                                        className={
                                            checked ? "checked" : "check"
                                        }
                                    ></div>
                                    <img
                                        src={el.img}
                                        alt=""
                                        className="c-img"
                                    />
                                    <p className="title">{el.title}</p>
                                    <h5>{el.price}</h5>
                                </div>
                            )) : <p className="empty">Комплекты в данном товаре отсутствуют</p>}
                        </div>
                    </div>
                    <div className="fourth-c">
                        {
                            isLoading ?
                                <p className="loader-wrapper">
                                    <Loader />
                                </p>
                                :
                                <> <div className="top">
                                    <p>
                                        <span className="discount">{product?.promoPrice > 0 ? product?.promoPrice + 'c' : ''}</span>
                                        <span className={"price"}>
                                            {product?.promoPrice > 0 ?
                                                <s>{product?.price} с</s> :
                                                <b className="noDiscount">{product?.price} с</b>
                                            }
                                        </span>
                                    </p>
                                    <p className="articul">Артикул: ZGW131240</p>
                                    <div className="line"></div>
                                    <div className="lists">
                                        <ul>
                                            <li style={{ color: !product?.active && '#df5333' }} className="first-li">
                                                {product?.active ? 'В наличии' : 'нет в наличии'}
                                            </li>
                                        </ul>
                                        <ul>
                                            <li className="second-li">Комплект</li>
                                        </ul>
                                    </div>
                                </div>
                                    <div className="bottom">
                                        <div className='quantity'>
                                            <div
                                                className='mathDiv'
                                                onClick={RemoveFromBasket}
                                                onContextMenu={preventContextMenu}
                                            >
                                            <Minus/>
                                            </div>
                                            <div>{countCart}</div>
                                            <LightTooltip title="Нажмите ПКМ чтобы добавить товар в корзину" arrow placement="top">
                                            <div
                                                className={`mathDiv ${isAdded ? 'added' : ''}`}
                                                onClick={AddToBasket}
                                                onContextMenu={handleContextMenu}
                                            >
                                                <Plus />
                                            </div>
                                            </LightTooltip>
                                        </div>
                                        <button className="toBasket" onClick={handleContextMenu}>В корзину</button>
                                    </div> </>
                        }
                    </div>
                </div>
                <div className="description">
                    <h2>Описание:</h2>
                    {isLoading && (
                        <>
                            <Skeleton className="mb-2"></Skeleton>
                            <Skeleton width="10rem" className="mb-2"></Skeleton>
                            <Skeleton width="5rem" className="mb-2"></Skeleton>
                        </>
                    )}
                    {
                        product?.description || isLoading ?
                            <p>{product?.description}</p> :
                            <p className="empty">Описание временно отсутствует</p>
                    }
                </div>

                <div className="same">
                    <Products title="Похожие товары" />
                </div>
            </div>
        </>
    )
}

export default DetailOfProduct
