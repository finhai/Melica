import React from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator} from 'react-native';
import {Container, ButtonArea, Icon, Text} from './styles';

export default function ButtonModal({
  icoName,
  icoSize,
  titleButton,
  functionOnPress,
  loading,
  IcoPosition,
  disabled,
}) {
  return (
    <Container>
      <ButtonArea disabled={disabled} onPress={functionOnPress}>
        {loading ? (
          <ActivityIndicator size="small" color="#FEFAF4" />
        ) : IcoPosition === 'left' ? (
          <>
            <Icon name={icoName} size={icoSize} />
            <Text>{titleButton}</Text>
          </>
        ) : (
          <>
            <Text>{titleButton}</Text>
            <Icon name={icoName} size={icoSize} />
          </>
        )}
      </ButtonArea>
    </Container>
  );
}
ButtonModal.propTypes = {
  icoName: PropTypes.string,
  icoSize: PropTypes.number,
  titleButton: PropTypes.string,
  functionOnPress: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  IcoPosition: PropTypes.string,
};
ButtonModal.defaultProps = {
  icoName: 'fonticons',
  icoSize: 22,
  titleButton: 'Title button',
  functionOnPress: () => {},
  disabled: false,
  loading: false,
  IcoPosition: 'left',
};
