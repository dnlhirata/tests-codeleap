import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface Props {
  name: string;
  label?: string;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const TextInput: React.FC<InputProps> = ({ name, label, ...rest }) => {
  const inputRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <label htmlFor={fieldName}>{label}</label>
      <input
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      <span className="error">{error}</span>
    </Container>
  );
};

export default TextInput;
