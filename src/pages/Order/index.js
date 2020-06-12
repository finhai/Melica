/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable radix */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FlatList, Platform, Animated, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import * as CommonActions from '../../store/modules/common/actions';

import * as ProductsActions from '../../store/modules/products/actions';
import * as CartActions from '../../store/modules/cart/actions';

import {
  Loading,
  Container,
  Errormsg,
  Alert,
  View,
  Modal,
  ModalForm,
} from './styles';
import {colors} from '../../styles';

import HeaderSearch from '../../components/HeaderSearch';
import Products from '../../components/Products';
import {currencyFormat} from '../../utils';

// coloca nos parametros o que precisa a  osentendi, ta na pagina agora
export default function Pedido({loadingSize, loadingColor}) {
  const {errorTrue} = useSelector(state => state.products);
  const {VenNro} = useSelector(state => state.relatorio);
  const {loading, message, error} = useSelector(state => state.common);
  const {products, totalPages, InputState} = useSelector(
    state => state.products
  );
  const {cartProducts} = useSelector(state => state.cart);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const color = true;
  const length = 20;
  const [query, setQuery] = useState('');
  // const [loading, setLoading] = useState(true);
  const [show, setshow] = useState(false);
  const [page, setPage] = useState(1);
  const [falseData, setFalseData] = useState([]);
  const [otherQuery, setOtherQuery] = useState(0);
  const [animation, setAnimation] = useState(true);
  const [messageActive, setMessage] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const [active, setActive] = useState(true);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [qtd, setQtd] = useState('');
  const [refresh, setRefresh] = useState(false);
  const opacity = new Animated.Value(0);
  const lengthAmount = cartProducts.map(item => {
    return Number(item.defaultQuantity);
  });
  const amount = lengthAmount.reduce(function(a, b) {
    return a + b;
  }, 0);

  useEffect(() => {
    console.tron.log('here', lengthAmount);
  }, [cartProducts, lengthAmount]);

  const {width} = Dimensions.get('window');

  useEffect(() => {
    if (query !== '') {
      if (query.length >= 3) {
        setshow(true);
        dispatch(ProductsActions.requestProductList(page, query));
      }
    } else if (query === '') {
      setPage(1);
      setshow(false);
      setFalseData(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (otherQuery !== 0) {
      setshow(true);
      dispatch(ProductsActions.requestIDProductList(otherQuery));
    } else if (otherQuery === 0) {
      setPage(1);
      setshow(false);
      setFalseData(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otherQuery]);

  // useEffect(() => {
  //   if (amount <= 0) {
  //     setAmount(1);
  //   }
  //   if (price === '') {
  //     setPrice(null);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [amount, price]);

  // eslint-disable-next-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   dispatch(ProductsActions.requestChangePage(page, query));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [page]);

  useEffect(() => {
    setFalseData(products);
  }, [products]);

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
  function EndReached() {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  function dispatchIt(item) {
    dispatch(
      ProductsActions.requestAddCartProduct(
        item.id,
        item.title,
        item.defaultQuantity,
        item.defaultvalue,
        item.newValue,
        item.newQuantity,
        item.Total,
        parseInt(item.code),
        item.grun,
        color,
        cartProducts
      )
    );
  }

  function refeshHandle() {
    if (refresh) {
      setRefresh(true);
    } else if (query !== '') {
      dispatch(ProductsActions.requestProductList(page, query));
      setRefresh(false);
    } else if (otherQuery !== '') {
      dispatch(ProductsActions.requestIDProductList(otherQuery));
      setRefresh(false);
    }
  }

  function Footer() {
    if (loading) {
      return <Loading size={loadingSize} color={loadingColor} />;
    }
    if (errorTrue) {
      return (
        <Container>
          <Errormsg>{message}</Errormsg>
        </Container>
      );
    }
    if (query !== '' || otherQuery !== 0) {
      if (products.length === 0) {
        return (
          <Container>
            <Errormsg>no Products</Errormsg>
          </Container>
        );
      }
    }
  }
  function addProductShow(item) {
    if (active === true) {
      setName(item.title.substring(0, length));
      if (item.newQuantity === '') {
        setPrice(item.newValue);
        setQtd(1);
      } else if (item.newValue === '') {
        setPrice(Number(item.ProPreco).toFixed(2));
        setQtd(item.newQuantity);
      } else {
        setPrice(Number(item.newValue).toFixed(2));
        setQtd(item.newQuantity);
      }
      setModalVisible(true);
      setAnimation(false);
      setActive(false);
      setTimeout(function dontdelete() {
        setModalVisible(false);
        setActive(true);
      }, 1500);
      return true;
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
        newValue: item.ProPreco,
        newQuantity: 1,
        code: item.Procod,
        grun: item.ProGruN,
        Total: total,
        color: true,
      };
      addProductShow(newValue);
      dispatchIt(newValue);
    } else if (item.amount !== undefined || item.price !== undefined) {
      if (item.amount === 0) {
        const total = item.price * 1;
        const newValue = {
          id: item.ProGrupo,
          title: item.ProGrupoDe,
          defaultvalue: item.ProPreco,
          defaultQuantity: item.amount,
          newValue: item.price,
          newQuantity: item.amount,
          code: item.Procod,
          grun: item.ProGruN,
          Total: total,
          color: true,
        };

        addProductShow(newValue);
        dispatchIt(newValue);
      } else {
        const total = item.price * item.amount;
        const newValue = {
          id: item.ProGrupo,
          title: item.ProGrupoDe,
          defaultvalue: item.ProPreco,
          defaultQuantity: item.amount,
          newValue: item.price,
          newQuantity: item.amount,
          code: item.Procod,
          grun: item.ProGruN,
          Total: total,
          color: true,
        };

        addProductShow(newValue);
        dispatchIt(newValue);
      }
    }
  }

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
    }).start();
  }, [opacity]);

  useEffect(() => {
    setTimeout(function fadeout() {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 100,
      }).start();
    }, 1500);
    setAnimation(true);
  }, [opacity]);

  function changeInput() {
    if (InputState === false) {
      setQuery('');
      dispatch(ProductsActions.changeState(true));
    } else {
      setOtherQuery(0);
      dispatch(ProductsActions.changeState(false));
    }
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

  function goBack() {
    dispatch(CommonActions.resetLoadingActivity());
    navigation.goBack();
  }

  function Camera() {
    dispatch(CommonActions.resetLoadingActivity());
    navigation.navigate('Camera');
  }

  return (
    <>
      <HeaderSearch
        placeholder="Buscar Nome..."
        onChangeText={text => setQuery(text)}
        value={query}
        Id={InputState}
        otherPlaceHolder="Buscar ID..."
        otherChangeText={text => setOtherQuery(text)}
        otherValue={otherQuery}
        changeInput={changeInput}
        navigateMenu={() => goBack()}
        navigateFinal={() => choosePage()}
        navigateCamera={() => Camera()}
        length={amount}
      />
      {show ? (
        <>
          <FlatList
            style={{backgroundColor: '#fff', paddingBottom: 10}}
            keyboardDismissMode="none"
            onRefresh={() => refeshHandle()}
            refreshing={refresh}
            // style={{paddingBottom: 10}}
            initialNumToRender={10}
            onEndReachedThreshold={0.5}
            onEndReached={() => EndReached()}
            ListFooterComponent={Footer()}
            data={falseData}
            keyExtractor={({item}, index) => index.toString()}
            renderItem={({item, index}) => (
              <Products
                // price={item.price}
                // amount={item.amount}
                key={index.toString()}
                border={color}
                color={color}
                id={item.ProGrupo.trim()}
                title={item.ProGrupoDe.trim()}
                item={item.ProPreco}
                // amount={item.}
                setPlatform={Platform.OS === 'ios' ? 'done' : 'next'}
                setPriceFunction={text =>
                  functionChangePrice(text, index, falseData)
                }
                setAmountFunction={text =>
                  functionChangeAmount(text, index, falseData)
                }
                functionSomePress={() => addProduct(item)}
              />
            )}
          />
          <Container />
        </>
      ) : (
        <Container />
      )}
      {active ? (
        <Container />
      ) : (
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <ModalForm>
            <Animated.View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                height: 60,
                position: 'absolute',
                backgroundColor: colors.darkTransparent,
                width: (width / 8) * 6,
                opacity,
              }}>
              <Alert>
                adicionado ao carrinho: {'\n'}
                {name} {'\n'} preço: {price} {'\t'} qtd: {qtd}
              </Alert>
            </Animated.View>
          </ModalForm>
        </Modal>
      )}
    </>
  );
}

Pedido.propTypes = {
  loadingSize: PropTypes.string,
  loadingColor: PropTypes.string,
};

Pedido.defaultProps = {
  loadingSize: 'large',
  loadingColor: colors.secundary,
};
