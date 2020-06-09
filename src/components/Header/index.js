import React from 'react';
import PropTypes from 'prop-types';
import {Container, Button, IconButton, Text} from './styles';

export default function Header({
  buttonExist,
  disabled,
  title,
  icoName,
  functionOnPress,
}) {
  return (
    <Container>
      {buttonExist ? (
        <Button onPress={functionOnPress} disabled={disabled}>
          <IconButton name={icoName} />
          <Text>{title}</Text>
        </Button>
      ) : null}
    </Container>
  );
}
Header.propTypes = {
  buttonExist: PropTypes.bool,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  icoName: PropTypes.string,
  functionOnPress: PropTypes.func,
};
Header.defaultProps = {
  buttonExist: true,
  disabled: true,
  title: 'voltar',
  icoName: 'fonticons', // 'chevron-left',
  functionOnPress: () => {},
};
