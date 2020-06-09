/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
// eslint-disable-next-line import/no-extraneous-dependencies
import {Dimensions, Animated, BackHandler} from 'react-native';
import * as LoginActions from '../../store/modules/login/actions';
import * as ReportActions from '../../store/modules/relatorio/actions';
import ButtonModal from '../../components/ButtonModal';

import {
  Container,
  Text,
  Button,
  TextButton,
  View,
  Box,
  Icon,
  Vendedor,
  WrenchIcon,
  Alert,
  Confirm,
  ConfirmContent,
  ConfirmStyle,
  ConfirmIconBox,
  ConfirmText,
  ConfirmIconText,
} from './styles';
import Logo from '../../components/Logo';
import {colors} from '../../styles';

export default function Menu() {
  const {loading} = useSelector(state => state.common);
  const {username} = useSelector(state => state.login);
  const {VenNro, showNumber} = useSelector(state => state.relatorio);
  const message = '';
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [animation, setAnimation] = useState(true);
  const [messageActive, setMessage] = useState(true);
  const [active, setActive] = useState(true);
  const [show, setShow] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const opacity = new Animated.Value(0);

  const {width} = Dimensions.get('window');

  function resetNumber() {
    dispatch(ReportActions.savedNumber(0, false, false));
    setModalVisible(false);
  }

  useEffect(() => {
    if (typeof VenNro === 'string') {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [VenNro]);

  function logout() {
    dispatch(LoginActions.logoutUser());
  }
  function showNumberVen() {
    if (VenNro !== 0) {
      setAnimation(false);
      setMessage(false);
      setTimeout(function dontdelete() {
        setMessage(true);
      }, 2350);
      return true;
    }
  }

  useEffect(() => {
    showNumberVen();
  }, [VenNro]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (active === true) {
          setAnimation(false);
          setActive(false);
          setTimeout(function dontdelete() {
            setActive(true);
          }, 3000);
          return true;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [active])
  );

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
    }).start();
  }, [animation]);

  useEffect(() => {
    setTimeout(function fadeout() {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 2000,
      }).start();
    }, 200);
    setAnimation(true);
  }, [animation]);

  function handleProducts() {
    dispatch(ReportActions.savedNumber(0, false, false));

    navigation.navigate('Order');
  }

  function orderToday() {
    dispatch(ReportActions.savedNumber(0, false, false));

    dispatch(ReportActions.reportDay(true));
    navigation.navigate('Report');
  }

  function orderAll() {
    dispatch(ReportActions.savedNumber(0, false, false));

    dispatch(ReportActions.reportDay(false));
    navigation.navigate('Report');
  }

  return (
    <Container>
      <Confirm animationType="slide" transparent visible={showNumber}>
        <ConfirmContent>
          <ConfirmStyle>
            {show ? (
              <ConfirmText style={{color: '#fff'}}>
                Pedido salvo como {VenNro}
              </ConfirmText>
            ) : (
              <ConfirmText style={{color: 'red'}}>{VenNro}</ConfirmText>
            )}
            <ConfirmIconBox onPress={() => resetNumber(false)}>
              <Icon name="check" style={{paddingLeft: 10}} />
              <ConfirmIconText>OK</ConfirmIconText>
            </ConfirmIconBox>
          </ConfirmStyle>
        </ConfirmContent>
      </Confirm>
      <Box onPress={() => logout()}>
        <WrenchIcon name="power-off" color="#ffffff" />
      </Box>
      <Logo message={message} />
      <View>
        <Button onPress={() => handleProducts()}>
          <Icon name="shopping-bag" color="#0AA111" />
          <TextButton>{'\t'}Pedido</TextButton>
        </Button>
        <Button onPress={() => orderToday()}>
          <Icon name="sun-o" color="#0AA111" />
          <TextButton>{'\t'}Pedido do dia</TextButton>
        </Button>
        <Button onPress={() => orderAll()} AreaPad>
          <Icon name="list" color="#0AA111" style={{marginTop: 3}} />
          <TextButton>{'\t'}Relatório</TextButton>
        </Button>
      </View>

      <Vendedor>
        <Text>
          Vendedor{'\n\n'}
          {username.trim()}
        </Text>

        {active ? (
          <View />
        ) : (
          <Animated.View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              height: 30,
              position: 'absolute',
              backgroundColor: colors.darkTransparent,
              width: (width / 8) * 3,
              opacity,
            }}>
            <Alert>Go back twice to close</Alert>
          </Animated.View>
        )}
      </Vendedor>
    </Container>
  );
}
// border-radius: 20px;
// width: ${(width / 8) * 3};
// height: 30px;
// background-color: ${() => colors.darkTransparent};
// position: absolute;
