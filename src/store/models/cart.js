import api from "../../services/api/index";

const cart = {
  state: {
    cart: [],
    user: {},
    prices: 0,
    lenString: '',
    len: 0,
    images: []
  },
  reducers: {
    addToCart: (state, { product, count }) => {
      const existingProductIndex = state.cart.findIndex(item => item.product._id === product._id);

    if (existingProductIndex !== -1) {
      // Product already exists, update the count
      const updatedCart = [...state.cart];
      updatedCart[existingProductIndex] = {
        ...updatedCart[existingProductIndex],
        count: updatedCart[existingProductIndex].count + count
    };

    return {
      ...state,
      cart: updatedCart
    };
  } else {
    // Product doesn't exist, add a new entry
    return {
      ...state,
      cart: [...state.cart, { product, count }]
    };
  }
    },

    removeFromCart: (state, product) => {
      const newCart = state.cart.filter(item => item.product._id !== product.product._id);

      return {
        ...state,
        cart: [...newCart]
      };
    },

    removeAllCart: (state) => {
      return {
        ...state,
        cart: []
      }
    },

    increment: (state, product) => {
      const updatedCart = state.cart.map(item => {
        if (item.product._id === product.product._id) {
          return {
            ...item,
            count: item.count + 1
          };
        }
        return item;
      });

      return {
        ...state,
        cart: updatedCart
      };
    },

    decrement: (state, product) => {
      const updatedCart = state.cart.map(item => {
        if (item.product._id === product.product._id) {
          return {
            ...item,
            count: item.count - 1
          };
        }
        return item;
      });

      return {
        ...state,
        cart: updatedCart
      };
    },

    countPrices: (state) => {
      const prices = state.cart.map(item => {
        if (item.count > 1)
          return item.product.price * item.count
        else {
          return item.product.price
        }
      }); // Extract prices from each item
      const sumOfPrices = prices.reduce((a, b) => a + b, 0); // Sum up the prices
      return {
        ...state,
        prices: sumOfPrices
      };
    },

    // WHEN API WILL RETURN IMAGES I WILL ADD THIS
    // countImages: (state) => {
    //   const updatedCart = state.cart.map(item => {
    //     return item.product.
    //   })
    // },

    countLenString: (state) => {
      const lastDigit = state.cart.length % 10;
      const lastTwoDigits = state.cart.length % 100;

      if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return { ...state, lenString: `${state.cart.length} товаров` };
      }

      if (lastDigit === 1) {
        return { ...state, lenString: `${state.cart.length} товар` };
      }

      if (lastDigit >= 2 && lastDigit <= 4) {
        return { ...state, lenString: `${state.cart.length} товара` };
      }

      return {
        ...state,
        lenString: `${state.cart.length} товаров`
      };
    },

    countLen: (state) => {
      return {
        ...state,
        len: state.cart.length
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
