export function requestAddCartProduct(
  id,
  title,
  defaultQuantity,
  defaultValue,
  newValue,
  newQuantity,
  Total,
  code,
  grun,
  color,
  cart
) {
  return {
    type: '@products/REQUEST_ADD_CART_PRODUCT',
    payload: {
      id,
      title,
      defaultQuantity,
      defaultValue,
      newValue,
      newQuantity,
      Total,
      code,
      grun,
      color,
      cart,
    },
  };
}

export function defineProduct(product) {
  return {
    type: '@products/DEFINE_PRODUCT',
    payload: {
      product,
    },
  };
}

export function requestProductList(page, search) {
  return {
    type: '@products/REQUEST_LIST_PRODUCTS',
    payload: {
      page,
      search,
    },
  };
}

export function requestIDProductList(search) {
  return {
    type: '@products/REQUEST_ID_PRODUCTS',
    payload: {
      search,
    },
  };
}

export function defineProducts(products, totalPages) {
  return {
    type: '@products/DEFINE_PRODUCTS',
    payload: {
      products,
      totalPages,
    },
  };
}

export function requestChangePage(page, search) {
  return {
    type: '@products/REQUEST_CHANGE_PAGE',
    payload: {
      page,
      search,
    },
  };
}

export function definePage(products) {
  return {
    type: '@products/DEFINE_PAGE',
    payload: {
      products,
    },
  };
}

export function changeState(InputState) {
  return {
    type: '@products/CHANGE_STATE',
    payload: {
      InputState,
    },
  };
}

export function errorMessage(errorTrue) {
  return {
    type: '@products/ERROR_VERIFY',
    payload: {
      errorTrue,
    },
  };
}
