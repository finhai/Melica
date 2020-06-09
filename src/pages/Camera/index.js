import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Platform} from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import {call, put, all, takeLatest, cancel} from 'redux-saga/effects';
import {useNavigation} from '@react-navigation/native';
import Products from '../../components/Products';
import * as QrActions from '../../store/modules/qrdata/actions';
import * as ProductsActions from '../../store/modules/products/actions';

import {Container, Camera, Icon, Item} from './styles';

export default function QR() {
  const {error, message} = useSelector(state => state.common);
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
    if (qrdata !== 0) {
      dispatch(QrActions.requestProductInfo(qrdata));
      setTimeout(() => {
        if (Object.entries(singleProduct).length === 0) {
          setQrdata(0);
          setProduct(false);
        } else {
          setProduct(true);
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

  function functionChangeAmount(valueParam, totalItems) {
    const newList = totalItems.map(items => {
      if (totalItems.price === undefined) {
        return {
          ...totalItems,
          amount: valueParam,
          price: totalItems.ProPreco,
        };
      }

      return {
        ...totalItems,
        amount: valueParam,
        price: totalItems.price,
      };
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

  function functionChangePrice(valueParam, totalItems) {
    const newList = totalItems.map(item => {
      if (item.amount === undefined) {
        return {
          ...item,
          amount: 1,
          price: valueParam,
        };
      }
      return {
        ...item,
        amount: item.amount,
        price: valueParam,
      };
    });
    setFalseData(newList);
  }

  function choosePage() {
    if (VenNro === 0) {
      navigation.navigate('Finalizar');
    } else {
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
    return null;
  }

  return (
    <>
      <Camera onBarCodeRead={barcode => setQrdata(barcode.data)}>
        {Smth()}
      </Camera>
      <Container>
        <Icon
          name="arrow-left"
          onPress={() => navigation.goBack()}
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
