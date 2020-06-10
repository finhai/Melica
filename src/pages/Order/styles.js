import styled from 'styled-components/native';
// eslint-disable-next-line import/no-extraneous-dependencies
import Icons from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import {colors, metrics} from '../../styles';

export const Container = styled.View`
  flex: 1;

  background: ${() => colors.white};
  align-items: center;
`;

export const Header = styled.View`
  height: 60px;
  background: ${() => colors.primary};
  flex-direction: row;
  justify-content: ${props => (props.AreaFlex ? 'space-between' : 'center')};
  align-items: center;
`;

export const TopIcons = styled(Icons)`
  font-size: ${() => metrics.fontSize()};
  color: ${() => colors.white};
  margin-left: 20px;
  margin-right: 20px;
`;

export const Title = styled.Text`
  font-size: ${() => metrics.fontSize()};
  font-weight: bold;
  color: ${() => colors.white};
`;

export const Errormsg = styled.Text`
  font-size: ${() => metrics.fontSize()};
  font-weight: bold;
  text-align: center;
  color: ${() => colors.red};
`;

export const Search = styled(Icons)`
  font-size: ${() => metrics.fontSize()};
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

export const Alert = styled.Text`
  font-size: ${() => metrics.fontSize()};
  color: ${() => colors.white};
  text-align: center;
`;

export const View = styled.View`
  flex: 1;
  background: ${() => colors.primary};
`;

export const Modal = styled.Modal``;

export const ModalForm = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
`;

/* export const Camera = styled(RNCamera)`
  flex: 1;

`; */

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
