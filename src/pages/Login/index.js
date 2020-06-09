/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  AreaView,
  Modal,
  AreaModal,
  AreaOptions,
  AreaTitle,
  Title,
  AreaOption,
} from './styles';

import * as LoginActions from '../../store/modules/login/actions';
// import * as ProductsActions from '../../store/modules/products/actions';

import Header from '../../components/Header';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ButtonModal from '../../components/ButtonModal';

export default function Login() {
  const {loading, error, message} = useSelector(state => state.common);
  const [userName, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [typeConection, setTypeConection] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  async function functionSetBaseUrl(typeConectionParam) {
    const url = typeConectionParam
      ? 'http://10.0.0.31:3333'
      : 'http://melica.performancecloud.com.br:3333';
    await AsyncStorage.setItem('@Melica:api', url);
  }
  function handleLogin() {
    dispatch(LoginActions.loginRequest(userName, senha));
    // dispatch(ProductsActions.requestProductList());
  }

  useEffect(() => {
    dispatch(LoginActions.requestUserExist());
  }, [dispatch]);

  return (
    <Container>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <AreaModal>
          <AreaOptions>
            <AreaTitle>
              <Title>Tipo de conexão</Title>
            </AreaTitle>
            <AreaOption>
              <ButtonModal
                titleButton="  Local  "
                icoName="database"
                disabled={loading}
                loading={loading}
                functionOnPress={() => {
                  functionSetBaseUrl(true);
                  setTypeConection(true);
                  setModalVisible(false);
                }}
              />
              <ButtonModal
                titleButton="Externo"
                icoName="cloud"
                disabled={loading}
                loading={loading}
                functionOnPress={() => {
                  functionSetBaseUrl(false);
                  setTypeConection(false);
                  setModalVisible(false);
                }}
              />
            </AreaOption>
          </AreaOptions>
        </AreaModal>
      </Modal>
      <Header
        disabled={loading}
        buttonExist
        icoName="gear"
        title=""
        functionOnPress={() => setModalVisible(true)}
      />
      <Logo message={message} error={error} />
      <Input
        placeholder="Usuario"
        value={userName}
        functionOnChangeText={e => {
          setUsername(e);
        }}
      />
      <Input
        secureTextEntry
        placeholder="Senha"
        value={senha}
        functionOnChangeText={text => {
          setSenha(text);
        }}
        onSubmitEditing={() => handleLogin()}
      />
      <AreaView>
        <Button
          title="Entrar"
          functionOnPress={() => {
            handleLogin();
          }}
          loading={loading}
          disabled={!userName}
        />
      </AreaView>
    </Container>
  );
}
