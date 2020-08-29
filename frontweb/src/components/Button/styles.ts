import styled, { css } from 'styled-components';

interface ContainerProps {
  colorType?:
    | 'primary'
    | 'transparent'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning';
}

const buttonTypeColors = {
  primary: css`
    background: #387aff;
    color: white;
  `,

  transparent: css`
    background: inherit;
  `,

  secondary: css`
    background: #6c757d;
    color: white;
  `,

  success: css`
    background: #3ba745;
    color: white;
  `,

  danger: css`
    background: #dc3545;
    color: white;
  `,

  warning: css`
    background: #f7c10a;
    color: white;
  `,
};

export const Container = styled.button<ContainerProps>`
  height: 25px;
  padding: 0 20px;
  color: #fff;
  font-size: 12px;
  text-transform: uppercase;
  line-height: 25px;

  border-radius: 4px;
  border: 0;

  ${(props) => buttonTypeColors[props.colorType || 'primary']}
`;
