/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Value,
  Pedidos,
  Numbers,
  Icon,
  ButtonView,
  Button,
  View1,
} from './styles';
// vcê sabe ou acha que sabe ? sabe,
function Relatorio({functionOnPress, id, total, hour, color}) {
  const pad = '0000';
  const n = id;
  const result = (pad + n).slice(-pad.length);
  const Number = result.toString();

  return (
    <View1>
      <Value color={color}>
        <Numbers>{Number}</Numbers>
        <Pedidos>{hour}</Pedidos>
        <Pedidos>${total.toFixed(2)}</Pedidos>
      </Value>
      <ButtonView>
        {color ? (
          <Button color={color} onPress={functionOnPress}>
            <Icon name="edit" color={color} />
          </Button>
        ) : (
          <Button color={color} onPress={functionOnPress}>
            <Icon name="eye" color={color} />
          </Button>
        )}
      </ButtonView>
    </View1>
  );
}

Relatorio.propTypes = {
  functionOnPress: PropTypes.func,
  id: PropTypes.number,
  color: PropTypes.bool,
  total: PropTypes.number,
  hour: PropTypes.number,
};

Relatorio.defaultProps = {
  functionOnPress: () => {},
  color: true,
};

export default Relatorio;
