import styled from 'styled-components/native';
import Icons from 'react-native-vector-icons/FontAwesome';

// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line no-unused-vars
import {colors, metrics} from '../../styles';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${() => colors.primary};
`;

export const ProductView = styled.TouchableOpacity`
  background: ${colors.secundary};
  margin: 5px;
  height: 50px;
  width: 200px;
`;

export const Text = styled.Text`
  font-size: ${() => metrics.fontSize(-5)};
  text-align: center;
`;

export const Product = styled.View`
  height: 80px;
  flex-direction: row;
  padding-top: ${props => (props.AreaPadding ? 0 : 10)}px;
`;

export const Remove = styled(Icons)`
  position: absolute;
  font-size: ${() => metrics.fontSize(5)};
  color: ${() => colors.black};
`;

export const Img = styled.TouchableOpacity`
  flex: 3;
  border-width: 1px;
  border-color: ${props => (props.border ? colors.light : colors.red)};
  background: ${props => (props.color ? colors.white : colors.red)};
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  margin-top: 5px;
  margin-right: 10px;
  margin-left: 20px;
  margin-bottom: 5px;
`;

export const Valor = styled.View`
  flex: 6;
  border-width: 1px;
  border-color: ${() => colors.light};
  background: ${() => colors.white};
  border-radius: 12px;
  margin-top: 5px;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 5px;
  justify-content: space-around;
  flex-direction: row;
`;

export const ProductInfo = styled.View`
  flex: 1;
  align-items: center;
`;

export const View2 = styled.View`
  flex: 1;
  position: absolute;
`;

export const Item = styled.Text`
  font-size: ${() => metrics.fontSize()};
  font-weight: bold;
`;

export const QTD = styled.TextInput`
  text-align: center;
  /* align-items: center; */
  /* position: absolute; */
`;
export const ValorItem = styled.TextInput`
  text-align: center;
  /* align-items: center; */
  /* position: absolute; */
`;

export const View3 = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const Totals = styled.Text`
  text-align: center;
`;
