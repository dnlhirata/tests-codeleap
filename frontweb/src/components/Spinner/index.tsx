import React from 'react';
import Loader from 'react-loader-spinner';

import { Container } from './styles';

interface SpinnerProps {
  isLoading: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <Container>
        <Loader type="TailSpin" height={150} width={150} />
      </Container>
    );
  }
  return <></>;
};

export default Spinner;
