export function addProductToCart(product) {
  return {
    type: '@cart/ADD_PRODUCT_TO_CART',
    payload: {
      product,
    },
  };
}

export function addSameProduct(product, totalPages) {
  return {
    type: '@cart/ADD_SAME_PRODUCT',
    payload: {
      product,
      totalPages,
    },
  };
}
export function resetCart() {
  return {
    type: '@cart/RESET_CART',
  };
}

export function refreshCart(products) {
  return {
    type: '@cart/REFRESH_CART',
    payload: {
      products,
    },
  };
}

// export function newTotal(qtd, price, id, currentValue) {
//   return {
//     type: '@cart/NEW_TOTAL',
//     payload: {
//       qtd,
//       price,
//       id,
//       currentValue,
//     },
//   };
// }

export function sumTotal(sum) {
  return {
    type: '@cart/SUM_TOTAL',
    payload: {
      sum,
    },
  };
}

export function finalTotal(total) {
  return {
    type: '@cart/FINAL_TOTAL',
    payload: {
      total,
    },
  };
}

export function arrayTotal(total) {
  return {
    type: '@cart/ARRAY_TOTAL',
    payload: {
      total,
    },
  };
}

export function orderCart(order, page, date, change, old) {
  return {
    type: '@cart/LOAD_ORDER',
    payload: {
      order,
      page,
      date,
      change,
      old,
    },
  };
}

export function activeChange(VenSitVen) {
  return {
    type: '@cart/CART_ACTIVE',
    payload: {
      VenSitVen,
    },
  };
}

export function changeReport(total, cart) {
  return {
    type: '@cart/CHANGE_ORDER',
    payload: {
      total,
      cart,
    },
  };
}
