import React from 'react';
import PropTypes from 'prop-types';
import {Container, Input} from './styles';

export default function InputForm({
  onSubmitEditing,
  placeholder,
  functionOnChangeText,
  autoCompleteType,
  autoCorrect,
  autoFocus,
  blurOnSubmit,
  caretHidden,
  clearButtonMode,
  clearTextOnFocus,
  contextMenuHidden,
  defaultValue,
  editable,
  enablesReturnKeyAutomatically,
  autoCapitalize,
  secureTextEntry,
}) {
  // isso é um component
  return (
    <Container>
      <Input
        onSubmitEditing={onSubmitEditing}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
        autoCompleteType={autoCompleteType}
        onChangeText={functionOnChangeText}
        autoCorrect={autoCorrect}
        autoFocus={autoFocus}
        blurOnSubmit={blurOnSubmit}
        // curso oculto
        caretHidden={caretHidden}
        // botao de limpeza(only one line)
        clearButtonMode={clearButtonMode}
        clearTextOnFocus={clearTextOnFocus}
        contextMenuHidden={contextMenuHidden}
        defaultValue={defaultValue}
        editable={editable}
        enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
      />
    </Container>
  );
}
InputForm.propTypes = {
  onSubmitEditing: PropTypes.func,
  secureTextEntry: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  placeholder: PropTypes.string,
  functionOnChangeText: PropTypes.func,
  autoCompleteType: PropTypes.string,
  autoCorrect: PropTypes.bool,
  autoFocus: PropTypes.bool,
  blurOnSubmit: PropTypes.bool,
  caretHidden: PropTypes.bool,
  clearButtonMode: PropTypes.string,
  clearTextOnFocus: PropTypes.bool,
  contextMenuHidden: PropTypes.bool,
  defaultValue: PropTypes.string,
  editable: PropTypes.bool,
  enablesReturnKeyAutomatically: PropTypes.bool,
};
InputForm.defaultProps = {
  onSubmitEditing: () => {},
  secureTextEntry: false,
  autoCapitalize: 'none',
  placeholder: 'placeholder input:',
  functionOnChangeText: () => {},
  autoCompleteType: 'off',
  autoCorrect: false,
  autoFocus: false,
  blurOnSubmit: true,
  caretHidden: false,
  // ('never', 'while-editing', 'unless-editing', 'always')
  clearButtonMode: 'never',
  clearTextOnFocus: true,
  contextMenuHidden: true,
  defaultValue: '',
  editable: true,
  enablesReturnKeyAutomatically: false,
};
