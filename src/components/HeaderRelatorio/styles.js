import styled from 'styled-components/native';
// eslint-disable-next-line import/no-extraneous-dependencies
import Icons from 'react-native-vector-icons/FontAwesome';
// eslint-disable-next-line no-unused-vars
import {colors, metrics} from '../../styles';

export const Container = styled.View`
  flex: 1;
  background: #ffffff;
  justify-content: space-between;
`;

export const Header = styled.View`
  height: 60px;
  background: ${() => colors.primary};
  flex-direction: row;
  justify-content: ${props => (props.AreaFlex ? 'space-between' : 'center')};
  align-items: center;
`;

export const TopIcons = styled(Icons)`
  font-size: ${() => metrics.fontSize(10)};
  color: ${() => colors.white};
  margin-left: 20px;
  margin-right: 20px;
`;

export const Placeholder = styled(Icons)`
  font-size: ${() => metrics.fontSize(5)};
  margin-left: 20px;
  margin-right: 20px;
  opacity: 0;
`;

export const Title = styled.Text`
  font-size: 24px;
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
  margin-left: 20px;
  margin-right: 10px;
  flex-direction: row;
  align-items: center
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

/* export const Camera = styled(RNCamera)`
  flex: 1;

`; */
