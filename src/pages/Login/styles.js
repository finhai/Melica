import styled from 'styled-components/native';
import {colors} from '../../styles';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background: ${() => colors.primary};
  padding: 20px;
`;
export const Error = styled.Text`
  color: ${() => colors.Error};
  margin-bottom: 20px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;

export const AreaView = styled.View`
  flex: 1;
  background: ${() => colors.primary};
`;
export const Modal = styled.Modal``;
export const AreaModal = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const AreaOptions = styled.View`
  height: 35%;
  width: 95%;
  border-radius: 32px;
  background-color: ${colors.colorPickerSix};
  justify-content: center;
  align-items: center;
`;
export const AreaTitle = styled.View`
  height: 40px;
  justify-content: center;
  align-items: center;
`;
export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${colors.white};
`;
export const AreaOption = styled.View`
  flex-direction: row;
  border-radius: 32px;
  background-color: ${colors.colorPickerSix};
  justify-content: center;
  align-items: center;
`;
