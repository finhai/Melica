import styled from 'styled-components/native';
// eslint-disable-next-line import/no-extraneous-dependencies
import Icons from 'react-native-vector-icons/FontAwesome';
import {color} from 'react-native-reanimated';
import {colors, metrics} from '../../styles';

export const Container = styled.View`
  flex: 1;
  background: ${() => colors.primary};
`;

export const View1 = styled.View`
  border-width: 2px;
  border-color: ${() => colors.regular};
  background: ${() => colors.white};
  height: 80px;
  width: 100%;
  align-items: center
  justify-content: space-between
  flex-direction: row;
`;

export const ButtonView = styled.View`
  width: 20%;
  border-color: ${() => colors.regular};
  height: 80px;
  align-items: center;
  justify-content: center;

  border-left-width: 2px;
`;

export const Button = styled.TouchableOpacity`
  height: 80px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.TextInput`
  flex: 1;
  margin-left: 15px;
`;

export const Relatorio = styled.TouchableOpacity`
  height: 80px;
  align-items: center;
  justify-content: space-between
  flex-direction: row;
  width: 80%;
`;

export const AreaView = styled.View`
  flex: 1;
  justify-content: ${props => (props.AreaFlex ? 'flex-start' : 'flex-end')};
`;

export const Pedidos = styled.Text`
  color: ${() => colors.black};
  font-weight: bold;
  font-size: ${() => metrics.fontSize()};
  margin-left: 20px;
`;

export const Numbers = styled.Text`
  color: ${() => colors.black};
  font-weight: bold;
  font-size: ${() => metrics.fontSize()};
  padding-right: 10px;
`;

export const Icon = styled(Icons)`
  color: ${() => colors.black};
  font-size: ${() => metrics.fontSize(10)};
`;
