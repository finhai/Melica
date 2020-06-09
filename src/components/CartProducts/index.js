/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React, {useState, useEffect} from 'react';
import {Platform, Animated, View} from 'react-native';
import PropTypes from 'prop-types';

import {useDispatch} from 'react-redux';
import * as CartActions from '../../store/modules/cart/actions';

import {
  Product,
  Text,
  Img,
  Valor,
  ProductInfo,
  QTD,
  Item,
  ValorItem,
  View3,
  View2,
  Totals,
  Remove,
} from './styles';
// isso deve ser corrigido, pois não é um component
function ProductData({
  id,
  title,
  item,
  amount,
  functionOnPress,
  color,
  total,
  currentValue,
  valueFunction,
  amountFunction,
  PlatformOS,
  editable,
}) {
  const dispatch = useDispatch();
  const fixprice = parseFloat(item).toFixed(2);
  const fixQtd = parseFloat(amount);
  const fixTotal = total;
  const [Qtd, setQtd] = useState(fixQtd);
  const [price, setPrice] = useState(fixprice);
  const [endValue, setendValue] = useState(fixprice);
  const [endQtd, setendQtd] = useState(fixQtd);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // function Total() {
  //   if (Qtd === fixQtd && price !== fixprice) {
  //     setendValue(parseFloat(price.replace(/,/g, '.')));
  //     setendQtd(Qtd);
  //   } else if (Qtd !== fixQtd && price === fixprice) {
  //     setendQtd(Qtd);
  //     setendValue(parseFloat(price.replace(/,/g, '.')));
  //   } else if (Qtd !== fixQtd && price !== fixprice) {
  //     setendValue(parseFloat(price.replace(/,/g, '.')));
  //     setendQtd(Qtd);
  //   } else if (Qtd === '' || price === '') {
  //     setendValue(price.replace(/,/g, '.'));
  //     setendQtd(Qtd);
  //   } else {
  //     setendValue(price.replace(/,/g, '.'));
  //     setendQtd(Qtd);
  //   }
  //   // settotalValue(parseFloat(endQtd * endValue).toFixed(2));
  //   // eslint-disable-next-line no-use-before-define
  //   newTotalValue(Number(endQtd), Number(endValue), id, currentValue);
  // }

  // function newTotalValue(qtdParam, priceParam, idParam, valueParam) {
  //   dispatch(CartActions.newTotal(qtdParam, priceParam, idParam, valueParam));
  // }

  // useEffect(() => {
  //   if (Qtd === '') {
  //     setQtd(fixQtd);
  //   }
  //   if (price === '') {
  //     setPrice(fixprice);
  //   }
  //   Total();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [Qtd, price, endValue, endQtd]);

  return (
    <Product>
      <Img border={color} color={color} onPress={functionOnPress}>
        <Text numberOfLines={3}>{title}</Text>
      </Img>
      <Valor>
        <ProductInfo>
          <View2>
            <Item>Valor</Item>
            <ValorItem
              editable={editable}
              value={parseFloat(price)}
              returnKeyType={PlatformOS}
              placeholder={fixprice.toString()}
              // eslint-disable-next-line radix
              // onChangeText={text => setPrice(text)}
              onChangeText={valueFunction}
              keyboardType="number-pad"
            />
          </View2>
        </ProductInfo>
        <ProductInfo>
          <View2>
            <Item>QTD</Item>
            <QTD
              editable={editable}
              value={Qtd}
              returnKeyType={PlatformOS}
              placeholder={fixQtd.toString()}
              // onChangeText={text => setQtd(text)}
              onChangeText={amountFunction}
              keyboardType="number-pad"
            />
          </View2>
        </ProductInfo>
        <ProductInfo>
          <View3>
            <Item>Total</Item>
            <Totals>{parseFloat(fixTotal).toFixed(2)}</Totals>
          </View3>
        </ProductInfo>
      </Valor>
    </Product>
  );
}

ProductData.propTypes = {
  functionOnPress: PropTypes.func,
  color: PropTypes.bool,
  border: PropTypes.bool,
  valueFunction: PropTypes.func,
  amountFunction: PropTypes.func,
  editable: PropTypes.bool,
};
ProductData.defaultProps = {
  functionOnPress: () => {},
  color: true,
  border: true,
  valueFunction: () => {},
  amountFunction: () => {},
};

export default ProductData;
