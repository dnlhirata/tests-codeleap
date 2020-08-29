import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
  place-content: center;
`;

export const Content = styled.div`
  overflow-x: scroll;
  width: 800px;
  background: #fff;

  display: flex;
  flex-direction: column;

  & > div + div {
    margin-top: 35px;
  }

  h1 {
    height: 50px;
    margin-bottom: 10px;
    background: #000;
    color: #fff;

    display: flex;
    align-items: center;

    padding-left: 30px;
  }

  & > div {
    margin: 0 30px;

    display: flex;
    flex-direction: column;
    border: 1px solid #bfbfbf;

    h4 {
      font-size: 25px;
      margin-bottom: 15px;
      font-weight: bold;
    }
  }
`;

export const Form = styled(Unform)`
  padding: 30px;

  & > div.create-button {
    display: flex;
    justify-content: flex-end;

    button {
      width: 100px;
      background: black;
      color: white;
    }
  }
`;
