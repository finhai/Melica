import styled from 'styled-components/native';
import Icons from 'react-native-vector-icons/FontAwesome';
import {colors, metrics} from '../../styles';

export const Container = styled.View`
  height: 80px;
  padding: 20px;
`;
export const ButtonArea = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${colors.colorPickerTwo};
  border-radius: 8px;
`;

export const Icon = styled(Icons)`
  color: ${colors.colorPickerFive};
  font-size: ${metrics.fontSize()};
  font-weight: bold;
  padding-right: 5px;
  padding-left: 5px;
`;

export const Text = styled.Text`
  color: ${colors.colorPickerFive};
  font-size: ${metrics.fontSize()};
  font-weight: bold;
  padding-right: 5px;
  padding-left: 5px;
`;
