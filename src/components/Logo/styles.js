import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {metrics, colors} from '../../styles';

export const Container = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  background: ${colors.primary};
`;
export const AreaImage = styled.View`
  flex: 1;
  flex-wrap: wrap;
  flex-grow: 1;
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
  background: ${colors.primary};
`;
export const Image = styled.Image`
  flex: 1;
  width: null;
  height: null;
  resize-mode: contain;
  width: 100%;
`;

export const Message = styled.Text`
  background: ${colors.primary};
  color: ${colors.primary};
  font-size: ${metrics.fontSize()};

  color: ${props => (props.error ? colors.danger : props.color)};
`;
Message.propTypes = {
  color: PropTypes.string,
};
Message.defaultProps = {
  color: colors.white,
};
