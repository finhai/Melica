import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {colors, metrics} from '../../styles';

export const Container = styled.View`
  border-width: 1px;
  border-color: ${() => colors.secundary};
  background: ${() => colors.secundary};
  border-radius: 12px;
  height: 60px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 40px;
`;
export const Button = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const Text = styled.Text`
  color: ${() => colors.buttons};
  font-weight: bold;
  font-size: ${metrics.fontSize()};
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
