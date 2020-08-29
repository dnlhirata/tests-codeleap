import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

interface Props {
  colorType?:
    | 'primary'
    | 'transparent'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning';
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & Props;

const Button: React.FC<ButtonProps> = ({ children, type, ...rest }) => (
  <Container {...rest}>{children}</Container>
);

export default Button;
