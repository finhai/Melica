import styled from 'styled-components/native';
import {produceWithPatches} from 'immer';
import {colors} from '../../styles';

export const Container = styled.View`
  border-width: 1px;
  border-color: ${() => colors.secundary};
  background: ${() => colors.white};
  border-radius: 12px;
  height: 60px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
`;
export const Input = styled.TextInput`
  flex: 1;
  margin-left: 15px;
`;
