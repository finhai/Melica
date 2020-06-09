/* eslint-disable no-use-before-define */
import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';

import {useState} from 'react';
import {colors} from '../../styles';
import Numbers from '../../../assets/dataFake/index';

const {width, height} = Dimensions.get('window');

export default function Memory() {
  const [listCircles, setListCircle] = useState([]);
  return Numbers.map(data => {
    const randomlf = Math.min(
      Math.max(Math.round(Math.random() * width, 0)),
      width - 30
    );
    const randomtb = Math.min(
      Math.max(Math.round(Math.random() * height, 0)),
      height
    );
    listCircles.push([randomlf, randomtb]);
    const styles = StyleSheet.create({
      circle: {
        width: 30,
        height: 30,
        backgroundColor: colors.darker,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: randomtb,
        left: randomlf,
      },
    });

    function determinPos(circleParam) {
      console.tron.log(listCircles);
    }

    return (
      <View
        style={styles.circle}
        onStartShouldSetResponder={() => determinPos(styles.circle)}>
        <Text>{data.index}</Text>
      </View>
    );
  });
}
