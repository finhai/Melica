/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

import {FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Container} from './styles';
import HeaderRelatorio from '../../components/HeaderRelatorio';
import Relatorio from '../../components/Relatorio';
import {dateTimeCountrySpecify} from '../../utils';
import * as RelatorioActions from '../../store/modules/relatorio/actions';
import * as CartActions from '../../store/modules/cart/actions';

export default function Pedido() {
  const {cartProducts} = useSelector(state => state.cart);
  const {relatorio, today, totalPages} = useSelector(state => state.relatorio);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [date, setDate] = useState(
    new Date(dateTimeCountrySpecify('+3:00').setHours(0, 0, 0, 0))
  );
  // date.setHours(-4, 0, 0, 0);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const sumTotal = cartProducts.map(element => Number(element.Total));
  const finalSum = sumTotal.reduce((a, b) => a + b, 0);

  function loadOrder(item) {
    if (cartProducts.length !== 0) {
      RelatorioAction(finalSum, cartProducts);
    }
    dispatch(CartActions.active(item.VenSitVen));
    navigation.navigate('ReportCart');
    dispatch(CartActions.orderCart(item.VenNro, 1, date, item.VenSitVen));
  }

  function RelatorioAction(totalParam, cartParam) {
    dispatch(RelatorioActions.requestRelatorio(totalParam, cartParam));
  }

  useEffect(() => {
    if (today === true) {
      dispatch(RelatorioActions.ordersToday(page, date));
    } else if (today !== true) {
      dispatch(RelatorioActions.refreshRelatorio(page, date));
    }
  }, [date]);

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShow(Platform.OS === 'ios');
  //   setDate(currentDate);
  // };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  // function EndReached() {
  //   if (page < totalPages) {
  //     setPage(page + 1);
  //   }
  // }
  // console.tron.log('value date');
  // console.tron.log(date);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // currentDate.setHours(-4, 0, 0, 0);

    setShow(false);
    setDate(currentDate);
    // console.tron.log('event.timestamp', event);
    // const newData = new Date(event);
    // console.tron.log('newData', new Date(1588564800000));
  };

  function EndReached() {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  useEffect(() => {
    if (page !== 1) {
      dispatch(RelatorioActions.addPage(page, date));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Container>
      <HeaderRelatorio
        onChange={onChange}
        showDatepicker={showDatepicker}
        day={today}
        date={date}
        mode={mode}
        show={show}
        left="arrow-left"
        right="calendar"
        middle=""
        display="calendar"
        title="Pedidos"
        navigate={() => navigation.navigate('Menu')}
      />

      <FlatList
        initialNumToRender={10}
        keyExtractor={item => item.VenNro.toString()}
        // onEndReachedThreshold={0.5}
        // onEndReached={() => EndReached()}
        data={relatorio}
        onEndReachedThreshold={0.5}
        onEndReached={() => EndReached()}
        renderItem={({item, index}) => (
          <Relatorio
            color={item.color}
            id={item.VenNro}
            total={item.VenTot}
            hour={item.VenHora}
            active={item.VenSitVen}
            functionOnPress={() => loadOrder(item)}
          />
        )}
      />
    </Container>
  );
}
