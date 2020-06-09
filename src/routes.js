import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {setNavigator} from './services/navigation';

// import Try from './pages/Try';
import Login from './pages/Login';
import Menu from './pages/Menu';

import Order from './pages/Order';
import Report from './pages/Report';
import Finalizar from './pages/Finalizar';
import Camera from './pages/Camera';
import Memory from './pages/Random';
import ReportCart from './pages/ReportCart';

const Stack = createStackNavigator();
export const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export default function Routes() {
  return (
    <NavigationContainer ref={setNavigator}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{}}
        mode="modal"
        headerMode="none">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="Report" component={Report} />
        <Stack.Screen name="Finalizar" component={Finalizar} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Memory" component={Memory} />
        <Stack.Screen name="ReportCart" component={ReportCart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
