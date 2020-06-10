/* eslint-disable import/no-extraneous-dependencies */
import styled from 'styled-components/native';
// import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Dimensions} from 'react-native';
import PropTypes from 'prop-types';

import Icons from 'react-native-vector-icons/FontAwesome';
import {RNCamera} from 'react-native-camera';
import {colors, metrics} from '../../styles';

const {height, width} = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background: ${colors.primary};
  border-color: ${colors.secundary};
  border-top-width: 2px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Text = styled.Text`
  font-size: ${() => metrics.fontSize(+20)};
  text-align: center;
`;

export const Icon = styled(Icons)`
  font-size: ${() => metrics.fontSize(10)};
  color: ${() => colors.white};
`;

export const Camera = styled(RNCamera)`
  /* position: absolute; */
  height: ${(height / 8) * 7}px;

  /* width: 20; */
`;

export const Item = styled.View`
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  border-radius: 12px;
  height: 90px;
  background: ${colors.primary};
`;

export const Errormsg = styled.Text`
  font-size: ${() => metrics.fontSize()};
  font-weight: bold;
  text-align: center;
  color: ${() => colors.red};
`;

export const ErrorDisplay = styled.View`
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  height: 30px;
  position: absolute;
  width: ${(width / 8) * 8}px;
  background: transparent;
`;

export const ErrorSee = styled.View`
  width: 90%;
  height: 30px;
  background: ${() => colors.dark};
`;

export const Loading = styled.ActivityIndicator.attrs(props => {
  return {
    size: `${props.size}`,
    color: `${props.color}`,
  };
})``;

Loading.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};
Loading.defaultProps = {
  size: 'small',
  color: colors.white,
};
