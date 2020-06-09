/* eslint-disable no-use-before-define */
import React from 'react';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';

import {
  Product,
  Text,
  Img,
  Valor,
  ProductInfo,
  Add,
  QTD,
  Item,
  Plus,
  ValorItem,
  View2,
  Remove,
} from './styles';
import {currencyFormat} from '../../utils';

function ProductData({
  functionOnPress,
  setPlatform,
  functionSomePress,
  title,
  item,
  price,
  setPriceFunction,
  amount,
  setAmountFunction,
  color,
}) {
  return (
    <Product>
      <Img border={color} color={color} onPress={functionOnPress}>
        <Remove />
        <Text numberOfLines={3}>{title}</Text>
      </Img>
      <Valor>
        <ProductInfo>
          <View2>
            <Item>Valor</Item>
            <ValorItem
              returnKeyType={
                setPlatform
                // Platform.OS === 'ios' ? 'done' : 'next'
              }
              placeholder={currencyFormat(Number(item))}
              // eslint-disable-next-line radix
              onChangeText={setPriceFunction}
              keyboardType="number-pad"
            />
          </View2>
        </ProductInfo>
        <ProductInfo>
          <View2>
            <Item>QTD</Item>
            <QTD
              returnKeyType={setPlatform}
              placeholder="1"
              onChangeText={setAmountFunction}
              keyboardType="number-pad"
            />
          </View2>
        </ProductInfo>
      </Valor>
      <Add onPress={functionSomePress}>
        <Plus name="plus" />
      </Add>
    </Product>
  );
}

ProductData.propTypes = {
  functionOnPress: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  color: PropTypes.bool,
};

ProductData.defaultProps = {
  functionOnPress: () => {},
};

export default ProductData;
