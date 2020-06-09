import styled from 'styled-components/native';
// eslint-disable-next-line import/no-extraneous-dependencies
import Icons from 'react-native-vector-icons/FontAwesome';
import {colors, metrics} from '../../styles';

export const Container = styled.View`
  flex: 1;
  background: ${() => colors.primary};
`;

export const View1 = styled.View`
  border-top-width: 2px;
  border-color: ${props => (props.color ? colors.regular : colors.dark)};
  background: ${() => colors.white};
  height: 80px;
  width: 100%;
  align-items: center
  justify-content: space-between
  flex-direction: row;
`;

export const ButtonView = styled.View`
  width: 20%;
  border-top-width: 1px;
  border-color: ${props => (props.color ? colors.regular : colors.dark)};
  height: 80px;
  align-items: center;
  justify-content: center;

  border-left-width: 1px;
`;

export const Button = styled.TouchableOpacity`
  background: ${props => (props.color ? colors.white : colors.regular)};
  height: 80px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.TextInput`
  flex: 1;
  margin-left: 15px;
`;

export const Value = styled.View`
background: ${props => (props.color ? colors.white : colors.regular)};
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
  padding-right: 10px;
  text-decoration-line: underline;
  font-size: ${() => metrics.fontSize()};
`;

export const Numbers = styled.Text`
  color: ${() => colors.black};
  font-weight: bold;
  margin-left: 10px;
  /* font-weight: underline; */
  text-decoration-line: underline;
  font-size: ${() => metrics.fontSize()};
`;

export const Icon = styled(Icons)`
  color: ${props => (props.color ? colors.black : colors.white)};
  font-size: ${() => metrics.fontSize(10)};
`;
