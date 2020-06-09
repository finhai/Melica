// chama funções assincronas com respostas
// select busca informações sobre o estado
import {call, put, all, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
// import AsyncStorage from '@react-native-community/async-storage';
// import {CommonActions, NavigationContext} from '@react-navigation/native';
// import {object} from 'prop-types';

import {
  commonLoadingActivity,
  commonSuccessAction,
  commonFailureAction,
} from '../common/actions';

import {addProductToCart, addSameProduct} from '../cart/actions';
import {defineProducts, definePage, errorMessage} from './actions';
import {dateTimeCountrySpecify} from '../../../utils/datetime';
import api from '../../../services/api';
import {errorVerify} from '../../../utils';

// date.setHours(date.getHours() - 3);

function* addCartProduct({
  payload: {
    id,
    title,
    defaultQuantity,
    defaultValue,
    newValue,
    newQuantity,
    Total,
    color,
    cart,
    code,
    grun,
  },
}) {
  try {
    const product = {
      id,
      title,
      defaultValue: newValue,
      defaultQuantity,
      newValue,
      newQuantity,
      code,
      grun,
      Total,
      color,
    };
    const allid = cart.map(state => state.id);
    if (allid.includes(id) === false) {
      yield put(addProductToCart(product));
    } else {
      const newArray = cart.map(element => {
        if (element.id === id) {
          if (element.defaultValue === newValue) {
            if (defaultQuantity === '') {
              if (defaultValue === '') {
                const Quantity = Number(element.defaultQuantity) + 1;
                const total = Quantity * element.defaultValue;
                return {
                  id,
                  title,
                  defaultValue: element.defaultValue,
                  defaultQuantity: Quantity,
                  newValue: element.defaultValue,
                  newQuantity: Quantity,
                  code,
                  grun,
                  Total: total,
                  color,
                };
              }

              const Quantity = Number(element.defaultQuantity) + 1;
              const total = Quantity * defaultValue;
              return {
                id,
                title,
                defaultValue: newValue,
                defaultQuantity: Quantity,
                newValue,
                newQuantity: Quantity,
                code,
                grun,
                Total: total,
                color,
              };
            }
            if (newValue === '') {
              const Quantity = Number(element.defaultQuantity) + 1;
              const total = Quantity * element.defaultValue;
              return {
                id,
                title,
                defaultValue: element.defaultValue,
                defaultQuantity: Quantity,
                newValue: element.defaultValue,
                newQuantity: Quantity,
                code,
                grun,
                Total: total,
                color,
              };
            }
            const Quantity =
              Number(element.defaultQuantity) + Number(defaultQuantity);
            const total = Quantity * defaultValue;
            return {
              id,
              title,
              defaultValue: newValue,
              defaultQuantity: Quantity,
              newValue,
              newQuantity: Quantity,
              code,
              grun,
              Total: total,
              color,
            };
          }
          if (element.defaultValue !== newValue) {
            if (defaultQuantity === '') {
              if (newValue === '') {
                const Quantity = Number(element.defaultQuantity) + 1;
                const total = Quantity * element.defaultValue;
                return {
                  id,
                  title,
                  defaultValue: element.defaultValue,
                  defaultQuantity: Quantity,
                  newValue: element.defaultValue,
                  newQuantity: Quantity,
                  code,
                  grun,
                  Total: total,
                  color,
                };
              }

              const Quantity = Number(element.defaultQuantity) + 1;
              const total = Quantity * newValue;
              return {
                id,
                title,
                defaultValue: newValue,
                defaultQuantity: Quantity,
                newValue,
                newQuantity: Quantity,
                code,
                grun,
                Total: total,
                color,
              };
            }
            if (newValue === '') {
              const Quantity = Number(element.defaultQuantity) + 1;
              const total = Quantity * element.defaultValue;
              return {
                id,
                title,
                defaultValue: element.defaultValue,
                defaultQuantity: Quantity,
                newValue: element.defaultValue,
                newQuantity: Quantity,
                code,
                grun,
                Total: total,
                color,
              };
            }

            const Quantity =
              Number(element.defaultQuantity) + Number(defaultQuantity);
            const total = Quantity * newValue;
            return {
              id,
              title,
              defaultValue: newValue,
              defaultQuantity: Quantity,
              newValue,
              newQuantity: Quantity,
              code,
              grun,
              Total: total,
              color,
            };
          }
        }
        return element;
      });
      yield put(commonSuccessAction(''));
      yield put(addSameProduct(newArray));
    }

    // if (allid.includes(id) === false) {
    //   yield put(sumTotal(sumArray));
    // } else {
    //   const newValue = currentValue.map(element => {
    //     if (element.id === id) {
    //       return {
    //         ...element,
    //         defaultTotal: total,
    //       };
    //     }
    //     return element;
    //   });
    //   yield put(finalTotal(newValue));

    // yield put(defineProduct(product));

    // }
  } catch (error) {
    const message = errorVerify(error);
    yield put(commonFailureAction(message));
    // erro de typagem no código
  }
}

function* addListProducts({payload: {page, search}}) {
  yield put(commonLoadingActivity('carregando produtos...'));
  const token = JSON.parse(
    yield call(AsyncStorage.getItem, 'Melica@Token_Key')
  );
  const date = dateTimeCountrySpecify('-3');

  yield put(defineProducts('', ''));
  try {
    const {
      data: {products, totalPages},
    } = yield call(
      api.post,
      `/productsName`,
      {
        token,
        date,
        page,
        search,
      },
      {timeout: 1500}
    );

    // const products = [
    //   {
    //     ProGrupoDe: 'EVA M PLACA LISA 40X60',
    //     ProGrupo: '9090',
    //     ProGruN: 510201,
    //     Procod: '30208',
    //     ProPreco: 1.9,
    //   },
    // ];
    // console.tron.log(products, totalPages);

    // const dataList = Object.values(products)
    //   .map(item => ({
    //     ...item,
    //     lowerCaseName: item.ProGrupoDe.toLowerCase(),
    //   }))
    //   .sort((a, b) => a.ProGrupoDe > b.ProGrupoDe);

    yield put(
      defineProducts(
        products,
        totalPages
        // 1
      )
    );
    yield put(errorMessage(false));
    yield put(commonSuccessAction(''));
    // }
  } catch (error) {
    const message = errorVerify(error);
    yield put(defineProducts(null, null));
    yield put(errorMessage(true));
    yield put(commonFailureAction(message));
    // erro de typagem no código
  }
}

function* addIDListProducts({payload: {search}}) {
  yield put(commonLoadingActivity('carregando produtos...'));
  const token = JSON.parse(
    yield call(AsyncStorage.getItem, 'Melica@Token_Key')
  );
  const date = dateTimeCountrySpecify('-3');

  yield put(defineProducts('', ''));
  const input = Number(search);
  try {
    const {data} = yield call(api.post, `/productsID`, {
      token,
      date,
      id: input,
    });
    const array = [data];
    // console.tron.log(products, totalPages);

    // const dataList = Object.values(products)
    //   .map(item => ({
    //     ...item,
    //     lowerCaseName: item.ProGrupoDe.toLowerCase(),
    //   }))
    //   .sort((a, b) => a.ProGrupoDe > b.ProGrupoDe);

    yield put(defineProducts(array));
    yield put(errorMessage(false));
    yield put(commonSuccessAction(''));
    // }
  } catch (error) {
    // yield put(defineProducts(null));
    const message = errorVerify(error);
    yield put(errorMessage(true));
    yield put(commonFailureAction(message));
    // erro de typagem no código
  }
}

function* addProductPage({payload: {page, search}}) {
  const token = JSON.parse(
    yield call(AsyncStorage.getItem, 'Melica@Token_Key')
  );
  const date = dateTimeCountrySpecify('-3');

  try {
    const {
      data: {products},
    } = yield call(api.post, `/productsName`, {
      token,
      date,
      page,
      search,
    });
    // console.tron.log(products, totalPages);

    // const dataList = Object.values(products)
    //   .map(item => ({
    //     ...item,
    //     lowerCaseName: item.ProGrupoDe.toLowerCase(),
    //   }))
    //   .sort((a, b) => a.ProGrupoDe > b.ProGrupoDe);

    yield put(definePage(products));
    yield put(commonSuccessAction(''));
    // }
  } catch (error) {
    const message = errorVerify(error);
    yield put(commonFailureAction(message));
    // erro de typagem no código
  }
}

export default all([
  takeLatest('@products/REQUEST_ADD_CART_PRODUCT', addCartProduct),
  takeLatest('@products/REQUEST_LIST_PRODUCTS', addListProducts),
  takeLatest('@products/REQUEST_CHANGE_PAGE', addProductPage),
  takeLatest('@products/REQUEST_ID_PRODUCTS', addIDListProducts),
]);
