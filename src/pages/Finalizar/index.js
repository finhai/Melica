/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {FlatList, View, Platform, UIManager, BackHandler} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

import {useNavigation} from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import Header from '../../components/Header';
import Logo from '../../components/Logo';
import * as CommonActions from '../../store/modules/common/actions';

import CartProducts from '../../components/CartProducts';
import HeaderReport from '../../components/HeaderRelatorio';

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
} from './styles';

function HeaderView() {
  const message = '';
  const {error} = useSelector(state => state.common);
  const navigation = useNavigation();
  const app = {
    backButtonDialog: false,
  };
  const dispatch = useDispatch();

  function goBack() {
    dispatch(CommonActions.resetLoadingActivity());
    navigation.goBack();
  }

  function Order() {
    dispatch(CommonActions.resetLoadingActivity());
    navigation.navigate('Order');
  }

  return (
    <>
      <HeaderReport
        left="arrow-left"
        right=""
        middle=""
        navigate={() => goBack()}
      />
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
              onPress={() => navigation.navigate('Camera')}
            />
            <Text style={{color: '#fff'}}>Código de barras</Text>
          </IconAppearance>
        </IconContainer>
      </OverContain>
    </>
  );
}

// function BottomView() {
//   const {cartProducts, VenSitVen} = useSelector(state => state.cart);
//   const {relatorio} = useSelector(state => state.relatorio);

//   const sumTotal = cartProducts.map(element => Number(element.Total));
//   const finalSum = sumTotal.reduce((a, b) => a + b, 0);
//   const navigation = useNavigation();
//   const [active, setActive] = useState(true);
//   const dispatch = useDispatch();

//   function placeId() {
//     dispatch(RelatorioActions.requestRelatorio(finalSum, cartProducts));
//     navigation.navigate('Menu');
//     dispatch(CartActions.resetCart());
//   }

//   useEffect(() => {
//     if (cartProducts.length === 0) {
//       setActive(false);
//     } else {
//       setActive(true);
//     }
//   }, [cartProducts]);

//   return (
//     <ValueTotal AreaFlex={active}>
//       <Total>
//         <Text>ValorTotal</Text>
//         <Text>{finalSum.toFixed(2)}</Text>
//       </Total>
//       {active ? (
//         <Button onPress={() => placeId()}>
//           <Finaliza>Finalizar</Finaliza>
//         </Button>
//       ) : (
//         <View />
//       )}
//     </ValueTotal>
//   );
// }

export default function Finalizar() {
  const {cartProducts, VenSitVen} = useSelector(state => state.cart);
  const {relatorio} = useSelector(state => state.relatorio);

  const [products, setProducts] = useState(cartProducts);
  const sumTotal = products.map(element => Number(element.Total));
  const finalSum = sumTotal.reduce((a, b) => a + b, 0);
  const navigation = useNavigation();
  const [active, setActive] = useState(true);
  const dispatch = useDispatch();

  const [id, setId] = useState(relatorio.length);
  const animation = useState(new Animated.Value(0));

  // console.tron.log(cartProducts);

  function placeId() {
    dispatch(RelatorioActions.requestRelatorio(finalSum, cartProducts));
    dispatch(CommonActions.resetLoadingActivity());

    navigation.navigate('Menu');
    dispatch(CartActions.resetCart());
  }

  useEffect(() => {
    if (cartProducts.length === 0) {
      setActive(false);
    } else {
      setActive(true);
    }
  }, [cartProducts]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function deleteItem(item, index) {
    if (item.color === true) {
      const colorArray = cartProducts.map(tems => ({...tems}));
      colorArray[index] = {
        ...colorArray[index],
        color: false,
        title: 'Remove Item ?',
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

  // function previousTotalValue(qtdParam, priceParam, idParam, valueParam) {
  //   dispatch(CartActions.newTotal(qtdParam, priceParam, idParam, valueParam));
  // }

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
    <AllContain>
      <HeaderView />
      <Container>
        <OverContain2>
          <FlatList
            initialNumToRender={30}
            keyExtractor={item => item.id}
            keyboardDismissMode="none"
            data={products}
            renderItem={({item, index}) => (
              <CartProducts
                PlatformOS={Platform.OS === 'ios' ? 'done' : 'next'}
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
