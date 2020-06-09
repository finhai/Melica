import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

// eslint-disable-next-line import/no-extraneous-dependencies
import Icons from 'react-native-vector-icons/FontAwesome';
import {colors, metrics} from '../../styles';

const {width} = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background: ${() => colors.primary};
`;

export const View = styled.View`
  flex: 1;
  background: ${() => colors.primary};
`;

export const Text = styled.Text`
  color: ${() => colors.userName};
  text-align: center;
  margin-bottom: 40px;
`;
export const Button = styled.TouchableOpacity`
  background: ${() => colors.white};
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  height: 50px;
  /* margin-top: ${props => (props.AreaPad ? 80 : 0)}px; */
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  flex-direction: row;
`;
export const TextButton = styled.Text`
  color: ${() => colors.black};
  font-weight: bold;
  text-align: center;
  align-content: center;
  margin-right: 20px;
`;

export const MenuText = styled.Text`
  height: 50px;
  color: ${() => colors.white};
  text-align: center;
  font-weight: bold;
  align-content: center;
`;
export const Image = styled.Image`
  /* flex: 1; */
  /* width: width;
  height: height; */
  /* width: 100%; */
`;
export const Box = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-width: 1px;
  border-color: ${() => colors.secundary};
  background: ${() => colors.secundary};
  border-radius: 12px;
  margin-top: 40px;
  margin-left: 20px;
  justify-content: center;
  align-items: center;
`;
export const Icon = styled(Icons)``;

export const WrenchIcon = styled(Icons)`
  font-size: ${() => metrics.fontSize(15)};
`;

export const Vendedor = styled.View`
  height: 80px;
  background: ${colors.primary}
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`;

export const Alert = styled.Text`
  font-size: ${() => metrics.fontSize(-5)};
  color: ${() => colors.white};
`;

export const Confirm = styled.Modal``;

export const ConfirmContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ConfirmStyle = styled.View`
  height: 120px;
  width: 90%;
  border-radius: 34px;
  background-color: ${colors.colorPickerSix};
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

export const ConfirmIconBox = styled.TouchableOpacity`
  height: 30px;
  width: 80px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 12px;
  background-color: ${colors.white};
`;

export const ConfirmText = styled.Text`
  font-size: ${() => metrics.fontSize(+10)};
  color: ${() => colors.black};
  font-weight: bold;
  text-align: center;
`;

export const ConfirmIconText = styled.Text`
  font-size: ${() => metrics.fontSize()};
  color: ${() => colors.black};
  font-weight: bold;
  padding-right: 10px;
`;
