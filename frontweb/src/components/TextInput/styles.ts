import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  label {
    padding-bottom: 5px;
  }

  input {
    color: #000;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #8b9aa7;
    font-size: 16px;
    height: 27px;
    padding-left: 10px;

    ::placeholder {
      font-size: 13px;
    }

    &:disabled {
      color: #969696;
      background: #e8e8e8;
      border: 0;
    }
  }

  span.error {
    height: 20px;
    color: red;
  }
`;
