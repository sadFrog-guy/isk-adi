import api from "../../services/api/index";

const cart = {
  state: {
    cart: [],
    user: {},
  },
  reducers: {
    addToCart: (state, { product, count }) => {
      return {
        ...state,
        cart: [...state.cart, { product, count }]
      }
    },
    removeFromCart: (state, productId) => {
      let x = {}
      const newCart = state.cart.filter(obj => {
        x = obj
        return obj.product._id !== productId
      })
      return {
        ...state,
        cart: newCart
      }
    },
    removeAllCart: (state) => {
      return {
        ...state,
        cart: []
      }
    },

    afterLoginUser: (state, info) => {
      return {
        ...state,
        user: info
      }
    },
    userLogOut: (state) => {
      return {
        ...state,
        user: {}
      }
    }
  },
};

export default cart;
