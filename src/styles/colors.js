export default {
  white: '#FFF',
  lighter: '#EEE',
  light: '#DDD',
  regular: '#999',
  dark: '#666',
  darker: '#333',
  black: '#000',
  userInput: '#555555',
  buttons: '#000000',
  userName: '#7F7F7F',
  menu: '#FFFFFF',
  product: '#333333',

  primary: '#0F4E3F',
  secundary: '#0AA111',
  success: '#9DCA83',
  danger: '#E37A7A',
  red: '#FF2E2E',

  tranparent: 'transparent',
  darkTransparent: 'rgba(26, 26, 26, 0.8)',
  whiteTransparent: 'rgba(255,255,255,0.3)',
  random: () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },
  colorPickerOne: '#183937',
  colorPickerTwo: '#234644',
  colorPickerThree: '#345A58',
  colorPickerFour: '#4B7573',
  // others colors
  colorPickerFive: '#039349',
  colorPickerSix: '#04B25D',
  colorPickerSeven: '#13D179',
  colorPickerEight: '#33E696',
};
