import {useState} from "react";
import {useDispatch} from "react-redux";

const useCart = (product) => {
  const [countCart, setCountCart] = useState(0);
  const [isAdded, setAdded] = useState(false);
  const [isLimited, setLimited] = useState(false)
  const dispatch = useDispatch();

  const AddToBasket = (e) => {
    e.preventDefault();

    if (countCart < 99999) {
      setCountCart(countCart + 1)
    }
  };

  const RemoveFromBasket = (e) => {
    e.preventDefault();

    if (countCart > 0) {
      setCountCart(countCart - 1)
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault()

    if (countCart > 0) {
      setAdded(true)

      dispatch.cart.addToCart({
        product,
        count: countCart
      })

      setCountCart(0)

      setTimeout(() => {
        setAdded(false)
      }, 2000)
    }
  }

  const increment = (product) => {
    if(!isLimited) {
      dispatch.cart.increment(product)
    }
  }

  const decrement = (product) => {
    if(!isLimited) {
      dispatch.cart.decrement(product)
    }
  }

  const preventConextMenu = (e) => {
    e.preventDefault()
  }

  const quantityLimit = (product) => {
    if(countCart > product.product.quantity) {
      setLimited(true)
    } else {
      setLimited(false)
    }
  }

  return {
    preventConextMenu,
    handleContextMenu,
    RemoveFromBasket,
    quantityLimit,
    AddToBasket,
    isAdded,
    isLimited,
    countCart
  }
}

export default useCart;