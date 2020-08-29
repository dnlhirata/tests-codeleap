import React, { createContext, useCallback, useContext, useState } from 'react';

import Spinner from '../components/Spinner';

interface SpinnerContextData {
  showSpinner(): void;
  hideSpinner(): void;
}

const SpinnerContext = createContext<SpinnerContextData>(
  {} as SpinnerContextData,
);

const SpinnerProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showSpinner = useCallback(() => {
    setIsLoading(true);
  }, []);

  const hideSpinner = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <SpinnerContext.Provider value={{ showSpinner, hideSpinner }}>
      {children}
      <Spinner isLoading={isLoading} />
    </SpinnerContext.Provider>
  );
};

function useSpinner(): SpinnerContextData {
  const context = useContext(SpinnerContext);

  if (!context) {
    throw new Error('useSpinner must be used within a SpinnerProvider');
  }

  return context;
}

export { SpinnerProvider, useSpinner };
