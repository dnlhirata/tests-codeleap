/* eslint-disable import/no-extraneous-dependencies */
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box
  }

  body {
    background: #DDDDDD;
    color: #000;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-size: 14px;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
  }

  button {
    cursor: pointer;
  }
`;
