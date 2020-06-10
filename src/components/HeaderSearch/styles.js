/* eslint-disable no-unused-vars */
import styled from 'styled-components/native';
// eslint-disable-next-line import/no-extraneous-dependencies
import Icons from 'react-native-vector-icons/FontAwesome';
import {Dimensions} from 'react-native';

import {SearchBar} from 'react-native-elements';
// eslint-disable-next-line no-unused-vars
import {colors, metrics} from '../../styles';

const {height, width} = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background: ${() => colors.primary};
`;

export const Header = styled.View`
  height: 60px;
  width: ${(width / 8) * 8}px;
  background: ${() => colors.primary};
  flex-direction: row;
  /* justify-content: ${props =>
    props.AreaFlex ? 'space-between' : 'center'}; */
  justify-content: space-between;
  align-items: center;
`;

export const IconContainer = styled.View`
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;

  background: transparent;
`;

export const TopIcons = styled(Icons)`
  font-size: ${() => metrics.fontSize(10)};
  color: ${() => colors.white};
  overflow: hidden;
  position: absolute;
  /* position: absolute; */
`;

export const ButtonIcons = styled(Icons)`
  font-size: ${() => metrics.fontSize(10)};
  color: ${() => colors.white};
`;

export const Title = styled.Text`
  font-size: ${() => metrics.fontSize(5)};
  font-weight: bold;
  color: ${() => colors.white};
`;

export const Search = styled(Icons)`
  font-size: ${() => metrics.fontSize(10)};
  color: ${() => colors.light};
  margin-right: 5px;
`;

export const InputView = styled.View`
  flex: 1
  border-width: 1px;
  border-color: ${() => colors.secundary};
  background: ${() => colors.white};
  border-radius: 12px;
  height: 40px;
  margin-left: 5px;
  margin-right: 10px;
  flex-direction: row;
  align-items: center;

`;

export const IdButton = styled.TouchableOpacity`
  width: 45px;
  height: 40px;
  border-radius: 12px;
  border-color: ${() => colors.dark};
  background: ${() => colors.primary};
  border-width: 1px;
  margin-left: 5px;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.TextInput`
  flex: 1;
  margin-left: 15px;
  color: ${() => colors.dark};
`;

export const Scroll = styled.ScrollView`
  flex: 1;
  padding-top: 5px;
`;

export const Count = styled.View`
  width: 15px;
  height: 15px;
  border-radius: ${15 / 2}px;
  background: ${() => colors.red};
  margin-left: 15px;
  margin-bottom: 15px;
  justify-content: center;
  align-items: center;
`;

export const Counting = styled.Text`
  font-size: ${() => metrics.fontSize(-3)};
  color: ${() => colors.black};
  text-align: center;
  font-weight: bold;
`;

/* export const Camera = styled(RNCamera)`
  flex: 1;

`; */

export const Searchbar = styled(SearchBar).attrs(props => {
  return {
    searchIcon: false,
    clearIcon: {
      iconStyle: {fontSize: 30, color: colors.light},
      containerStyle: {backgroundColor: colors.white},
    },
    inputStyle: {backgroundColor: colors.white},
    inputContainerStyle: {backgroundColor: colors.white},
    containerStyle: {
      borderBottomColor: 'transparent',
      borderTopColor: 'transparent',
      flex: 1,
      backgroundColor: colors.white,
      height: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
  };
})``;
