/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

// import {Searchbar} from 'react-native-elements';
import {
  Header,
  TopIcons,
  Title,
  InputView,
  Search,
  Searchbar,
  IdButton,
  ButtonIcons,
} from './styles';
// corrigir
export default function HeaderTitle({
  placeholder,
  onChangeText,
  value,
  changeInput,
  Id,
  otherPlaceHolder,
  otherChangeText,
  otherValue,
  navigateFinal,
  navigateMenu,
  navigateCamera,
}) {
  return (
    <>
      <Header AreaFlex>
        <TopIcons name="arrow-left" onPress={navigateMenu} />
        <Title>Produtos</Title>
        <TopIcons name="shopping-cart" onPress={navigateFinal} />
      </Header>
      <Header AreaFlex>
        <IdButton onPress={changeInput}>
          {Id ? <ButtonIcons name="pencil" /> : <ButtonIcons name="barcode" />}
        </IdButton>
        {Id ? (
          <InputView>
            <Searchbar
              placeholder={otherPlaceHolder}
              onChangeText={otherChangeText}
              value={otherValue}
            />
            {/* <Search name="search" />
            <Search>|</Search> */}
            <Search
              name="camera"
              style={{marginTop: 2, marginRight: 10}}
              onPress={navigateCamera}
            />
          </InputView>
        ) : (
          <InputView>
            <Searchbar
              placeholder={placeholder}
              onChangeText={onChangeText}
              value={value}
            />
            {/* <Search name="search" />
            <Search>|</Search> */}
            <Search
              name="camera"
              style={{marginTop: 2, marginRight: 10}}
              onPress={navigateCamera}
            />
          </InputView>
        )}
      </Header>
    </>
  );
}

HeaderTitle.propTypes = {
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  changeInput: PropTypes.func,
  Id: PropTypes.bool,
  otherPlaceHolder: PropTypes.string,
  otherChangeText: PropTypes.func,
  otherValue: PropTypes.number,
  navigateFinal: PropTypes.func,
  navigateMenu: PropTypes.func,
  navigateCamera: PropTypes.func,
};

HeaderTitle.defaultProps = {
  placeholder: 'Buscar Nome...',
  onChangeText: () => {},
  value: '',
  changeInput: () => {},
  Id: false,
  otherPlaceHolder: 'Buscar ID...',
  otherChangeText: () => {},

  navigateFinal: () => {},
  navigateMenu: () => {},
  navigateCamera: () => {},
};
