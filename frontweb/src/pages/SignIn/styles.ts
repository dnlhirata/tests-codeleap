import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  height: 200px;
  width: 400px;
  background: #fff;
  padding: 20px;

  display: flex;
  flex-direction: column;
  place-content: center;

  h2 {
    margin-bottom: 10px;
  }

  > div {
    display: flex;
    justify-content: space-between;

    button {
      width: 100px;
      background: black;
      color: white;
    }
  }
`;

export const Form = styled(Unform)``;
