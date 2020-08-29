import styled from 'styled-components';

export const Container = styled.div`
  & > div {
    padding: 0 30px;
  }

  div.post-header {
    background: #000;
    color: white;

    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 20px;
    }

    > div {
      display: flex;
      align-items: center;

      button {
        background: inherit;
        border: 0;
      }

      button + button {
        margin-left: 10px;
      }
    }
  }

  div.post-info {
    display: flex;
    justify-content: space-between;
    padding: 23px;

    p {
      color: #888888;
      font-size: 18px;
    }
  }

  div.post-content {
    font-size: 16px;
    padding-bottom: 20px;
  }

  div.post-to-delete {
    padding: 15px 30px;

    display: flex;
    justify-content: space-between;

    p {
      color: #888888;
      font-size: 18px;
    }

    button + button {
      margin-left: 10px;
    }
  }
`;
