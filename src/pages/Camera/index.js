import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Platform} from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import {call, put, all, takeLatest, cancel} from 'redux-saga/effects';
import {useNavigation} from '@react-navigation/native';
import Products from '../../components/Products';
import * as CommonActions from '../../store/modules/common/actions';
import * as QrActions from '../../store/modules/qrdata/actions';
import * as ProductsActions from '../../store/modules/products/actions';

import {
  Container,
  Camera,
  Icon,
  Item,
  Errormsg,
  ErrorDisplay,
  ErrorSee,
} from './styles';

export default function QR({loadingColor, loadingSize}) {
  const {loading, error, message} = useSelector(state => state.common);
  const {VenNro} = useSelector(state => state.relatorio);
  const {singleProduct} = useSelector(state => state.qr);
  const {cartProducts} = useSelector(state => state.cart);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [falseData, setFalseData] = useState(singleProduct);
  const [qrdata, setQrdata] = useState('');
  const [product, setProduct] = useState(false);
  const [color, setColor] = useState(true);

  useEffect(() => {
    if (qrdata !== '') {
      dispatch(QrActions.requestProductInfo(qrdata));
      setTimeout(() => {
        if (Object.entries(singleProduct).length === 0) {
          setQrdata(0);
          setProduct(true);
        } else {
          setProduct(false);
        }
      }, 200);
    } else {
      setProduct(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrdata]);

  useEffect(() => {
    setFalseData(singleProduct);
  }, [singleProduct]);

  function deleteItem() {
    if (color === true) {
      setColor(false);
    } else if (color === false) {
      setQrdata(0);
      setColor(true);
    }
  }

  function addProduct(item) {
    if (item.amount === undefined || item.price === undefined) {
      const total = item.ProPreco * 1;
      const newValue = {
        id: item.ProGrupo,
        title: item.ProGrupoDe,
        defaultvalue: item.ProPreco,
        defaultQuantity: 1,
        code: item.Procod,
        grun: item.ProGruN,
        Total: total,
        color: true,
      };
      dispatchIt(newValue);
    } else if (item.amount !== undefined || item.price !== undefined) {
      const total = item.price * item.amount;
      const newValue = {
        id: item.ProGrupo,
        title: item.ProGrupoDe,
        defaultvalue: item.price,
        defaultQuantity: item.amount,
        code: item.Procod,
        grun: item.ProGruN,
        Total: total,
        color: true,
      };
      dispatchIt(newValue);
    }
  }

  function functionChangeAmount(valueParam, indexParam, totalItems) {
    const newList = totalItems.map((item, indexItem) => {
      if (indexParam === indexItem) {
        if (item.price === undefined) {
          if (valueParam === '') {
            return {
              ...item,
              amount: 1,
              price: item.ProPreco,
            };
          }
          return {
            ...item,
            amount: valueParam,
            price: item.ProPreco,
          };
        }
        if (valueParam === '') {
          return {
            ...item,
            amount: 1,
            price: item.price,
          };
        }
        return {
          ...item,
          amount: valueParam,
          price: item.price,
        };
      }
      return item;
    });

    setFalseData(newList);
  }

  function dispatchIt(item) {
    dispatch(
      ProductsActions.requestAddCartProduct(
        item.id,
        item.title,
        item.defaultQuantity,
        item.defaultvalue,
        item.Total,
        parseInt(item.code),
        item.grun,
        color,
        cartProducts
      )
    );
  }

  function functionChangePrice(valueParam, indexParam, totalItems) {
    const newList = totalItems.map((item, indexItem) => {
      if (indexParam === indexItem) {
        if (item.amount === undefined) {
          if (valueParam === '') {
            return {
              ...item,
              amoount: 1,
              price: item.defaultvalue,
            };
          }
          return {
            ...item,
            amount: 1,
            price: valueParam,
          };
        }
        if (valueParam === '') {
          return {
            ...item,
            amoount: item.amount,
            price: item.defaultvalue,
          };
        }
        return {
          ...item,
          amount: item.amount,
          price: valueParam,
        };
      }
      return item;
    });

    setFalseData(newList);
  }

  function choosePage() {
    if (VenNro === 0) {
      dispatch(CommonActions.resetLoadingActivity());
      navigation.navigate('Finalizar');
    } else {
      dispatch(CommonActions.resetLoadingActivity());

      navigation.navigate('ReportCart');
    }
  }

  function Smth() {
    if (product) {
      return (
        <Item>
          <Products
            border={color}
            color={color}
            id={falseData.ProGrupo.trim()}
            title={falseData.ProGrupoDe.trim()}
            item={falseData.ProPreco}
            setPlatform={Platform.OS === 'ios' ? 'done' : 'next'}
            functionOnPress={() => deleteItem()}
            setPriceFunction={text => functionChangePrice(text, falseData)}
            setAmountFunction={text => functionChangeAmount(text, falseData)}
            functionSomePress={() => addProduct(falseData)}
          />
        </Item>
      );
    }
    if (error) {
      return (
        <ErrorDisplay>
          <ErrorSee>
            <Errormsg>{message}</Errormsg>
          </ErrorSee>
        </ErrorDisplay>
      );
    }
  }

  function goBack() {
    dispatch(CommonActions.resetLoadingActivity());
    navigation.goBack();
  }

  return (
    <>
      <Camera onBarCodeRead={barcode => setQrdata(barcode.data)}>
        {Smth()}
      </Camera>
      <Container>
        <Icon
          name="arrow-left"
          onPress={() => goBack()}
          style={{marginLeft: 20}}
        />
        <Icon
          name="shopping-cart"
          onPress={() => choosePage()}
          style={{marginRight: 20}}
        />
      </Container>
    </>
  );
}
