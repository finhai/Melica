import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors, metrics} from '../../styles';

export const Container = styled.View`
  flex-direction: column;
  height: 30px;
  justify-content: flex-start;
  align-items: flex-start;
`;
export const Button = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background: #12ccaa;
  padding: 5px;
  border-radius: 6px;
`;
export const Text = styled.Text`
  color: ${colors.primary};
  font-size: ${metrics.fontSize()};
  font-weight: bold;
`;
export const IconButton = styled(Icon)`
  color: ${colors.primary};
  font-size: ${metrics.fontSize()};
  font-weight: bold;
`;
