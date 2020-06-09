import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import Icons from 'react-native-vector-icons/FontAwesome';

import {colors, metrics} from '../../styles';

// eslint-disable-next-line no-unused-vars
const {height, width} = Dimensions.get('window');

export const AllContain = styled.View`
  flex: 1;
  background: ${() => colors.primary};
`;

export const Container = styled.View`
  flex: 2;
  background: ${() => colors.primary};
`;

export const OverContain = styled.View`
  align-items: center;
`;

export const OverContain2 = styled.View`
  padding-bottom: 10px;
`;

export const IconContainer = styled.View`
  height: 60px;
  width: ${(width / 8) * 4}px;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  /* background-color: #000; */
`;

export const ValueTotal = styled.View`
  height: 100px;
  width: 100%;
  align-items: center;
  justify-content: ${props => (props.AreaFlex ? 'space-around' : 'center')};
  background: ${() => colors.primary};
`;

export const IconAppearance = styled.View`
  height: 60px;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  /* background-color: #232; */
`;

export const Icon = styled(Icons)`
  font-size: ${() => metrics.fontSize(15)};
  color: ${() => colors.white};
`;

export const Total = styled.View`
  height: 30px;
  width: ${(width / 8) * 6}px;
  border-width: 1px;
  border-color: ${() => colors.light};
  background: ${() => colors.white};
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 12px;
`;

export const Button = styled.TouchableOpacity`
  height: 40px;
  text-align: center;
  width: ${(width / 8) * 7}px;
  justify-content: space-around;
  align-items: center;
  border-radius: 12px;
  background: ${() => colors.secundary};
`;

export const Finaliza = styled.Text`
  font-size: ${() => metrics.fontSize(5)};
  font-weight: bold;
  font-style: italic;
`;

export const Text = styled.Text`
  font-size: ${() => metrics.fontSize()};
  font-weight: bold;
`;

export const Loading = styled.ActivityIndicator.attrs(props => {
  return {
    size: `${props.size}`,
    color: `${props.color}`,
  };
})``;

export const Alert = styled.Text`
  font-size: ${() => metrics.fontSize(-5)};
  color: ${() => colors.white};
`;

Loading.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};
Loading.defaultProps = {
  size: 'small',
  color: colors.white,
};
