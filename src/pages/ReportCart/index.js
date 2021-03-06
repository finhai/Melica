/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  Platform,
  UIManager,
  BackHandler,
  Keyboard,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

import {useNavigation} from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import {colors} from '../../styles';
import Header from '../../components/Header';
import Logo from '../../components/Logo';
import CartProducts from '../../components/CartProducts';
import HeaderReport from '../../components/HeaderRelatorio';
import * as CommonActions from '../../store/modules/common/actions';

import * as RelatorioActions from '../../store/modules/relatorio/actions';
import * as CartActions from '../../store/modules/cart/actions';

import {
  AllContain,
  OverContain,
  OverContain2,
  IconContainer,
  Container,
  ValueTotal,
  Icon,
  Total,
  Button,
  Finaliza,
  Text,
  IconAppearance,
  Loading,
  Errormsg,
} from './styles';

function HeaderView() {
  const {active} = useSelector(state => state.relatorio);
  const {error} = useSelector(state => state.common);
  const message = '';
  const navigation = useNavigation();
  const app = {
    backButtonDialog: false,
  };
  const dispatch = useDispatch();

  function goBack() {
    dispatch(CartActions.resetCart());
    dispatch(CommonActions.resetLoadingActivity());

    navigation.goBack();
  }

  function Order() {
    dispatch(CommonActions.resetLoadingActivity());
    navigation.navigate('Order');
  }

  function Camera() {
    dispatch(CommonActions.resetLoadingActivity());

    navigation.navigate('Camera');
  }

  return (
    <>
      <HeaderReport
        left="arrow-left"
        right=""
        middle=""
        navigate={() => goBack()}
      />
      {active ? (
        <OverContain>
          <IconContainer>
            <IconAppearance>
              <Icon name="search" onPress={() => Order()} />
              <Text style={{color: '#fff'}}>Procurar</Text>
            </IconAppearance>
            <IconAppearance>
              <Icon
                name="camera"
                style={{marginTop: 2}}
                // eslint-disable-next-line no-undef
                onPress={() => Camera()}
              />
              <Text style={{color: '#fff'}}>Código</Text>
            </IconAppearance>
          </IconContainer>
        </OverContain>
      ) : (
        <View />
      )}
    </>
  );
}

export default function Finalizar({loadingSize, loadingColor}) {
  const {cartProducts} = useSelector(state => state.cart);
  const {loading, message, error} = useSelector(state => state.common);

  const {VenNro, active, errorTrue} = useSelector(state => state.relatorio);

  const [products, setProducts] = useState(cartProducts);
  const sumTotal = products.map(element => Number(element.Total));
  const finalSum = sumTotal.reduce((a, b) => a + b, 0);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const animation = useState(new Animated.Value(0));

  function placeId() {
    Relatorio(finalSum, products);
    dispatch(CartActions.resetCart());
    dispatch(CommonActions.resetLoadingActivity());

    navigation.navigate('Menu');
  }

  function Relatorio(totalParam, cartParam) {
    dispatch(CartActions.changeReport(totalParam, cartParam));
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function deleteItem(item, index) {
    if (item.color === true) {
      const colorArray = cartProducts.map(tems => ({...tems}));
      colorArray[index] = {
        ...colorArray[index],
        color: false,
        title: 'Remover item?',
      };
      setProducts(colorArray);
      setTimeout(() => {
        if (item.color === false) {
          setProducts(cartProducts);
        } else {
        }
      }, 5000);
    } else {
      const newArray = cartProducts.filter(
        (product, indexParam) => indexParam !== index
      );

      dispatch(CartActions.refreshCart(newArray));
    }
  }

  useEffect(() => {
    setProducts(cartProducts);
  }, [cartProducts]);

  function newTotalValue(newArrayParam) {
    dispatch(CartActions.arrayTotal(newArrayParam));
  }

  function priceFunction(text, item, index) {
    if (text === '') {
      const newArray = products.map(tems => ({...tems}));
      const Total = newArray[index].defaultValue * newArray[index].newQuantity;
      newArray[index] = {
        ...newArray[index],
        newValue: newArray[index].defaultValue,
        Total,
      };

      dispatch(CartActions.refreshCart(newArray));
    } else {
      const newArray = products.map(tems => ({...tems}));
      const Total = Number(text) * newArray[index].newQuantity;
      newArray[index] = {
        ...newArray[index],
        newValue: Number(text),
        Total,
      };

      dispatch(CartActions.refreshCart(newArray));
    }
  }

  function Footer() {
    if (loading) {
      return <Loading size={loadingSize} color={loadingColor} />;
    }
  }

  function quantityFunction(text, item, index) {
    if (text === '') {
      const newArray = products.map(tems => ({...tems}));
      const Total = newArray[index].defaultQuantity * newArray[index].newValue;
      newArray[index] = {
        ...newArray[index],
        newQuantity: newArray[index].defaultQuantity,
        Total,
      };
      dispatch(CartActions.refreshCart(newArray));
    } else {
      const newArray = products.map(tems => ({...tems}));
      const Total = Number(text) * newArray[index].newValue;
      newArray[index] = {
        ...newArray[index],
        newQuantity: Number(text),
        Total,
      };
      dispatch(CartActions.refreshCart(newArray));
    }
  }

  return (
    <AllContain activeOpacity={1} onPress={Keyboard.dismiss}>
      <HeaderView />
      <Container>
        <OverContain2>
          <FlatList
            style={{paddingBottom: 10}}
            initialNumToRender={30}
            keyExtractor={item => item.id}
            keyboardDismissMode="none"
            data={products}
            ListFooterComponent={Footer()}
            renderItem={({item, index}) => (
              <CartProducts
                editable={active}
                currentValue={cartProducts}
                id={item.id}
                border={item.color}
                color={item.color}
                functionOnPress={() => deleteItem(item, index)}
                title={item.title.trim()}
                item={item.defaultValue}
                amount={item.defaultQuantity}
                total={item.Total}
                valueFunction={text => priceFunction(text, item, index)}
                amountFunction={text => quantityFunction(text, item, index)}
              />
            )}
          />
        </OverContain2>
      </Container>
      <ValueTotal AreaFlex={active}>
        <Total>
          <Text>ValorTotal</Text>
          <Text>{finalSum.toFixed(2)}</Text>
        </Total>
        {active ? (
          <Button onPress={() => placeId()}>
            <Finaliza>Finalizar</Finaliza>
          </Button>
        ) : (
          <View />
        )}
      </ValueTotal>
    </AllContain>
  );
}

Finalizar.propTypes = {
  loadingSize: PropTypes.string,
  loadingColor: PropTypes.string,
};

Finalizar.defaultProps = {
  loadingSize: 'large',
  loadingColor: colors.secundary,
};
