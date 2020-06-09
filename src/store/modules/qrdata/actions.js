export function requestProductInfo(Id) {
  return {
    type: '@qr/DEFINE_PRODUCT_INFO',
    payload: {
      Id,
    },
  };
}

export function defineSingleProduct(singleProduct) {
  return {
    type: '@qr/DEFINE_SINGLE_PRODUCT',
    payload: {
      singleProduct,
    },
  };
}
