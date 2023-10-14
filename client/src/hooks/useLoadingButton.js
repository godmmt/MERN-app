import { useState } from 'react';

const useLoadingButton = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const hideButton = () => {
    setIsButtonVisible(false);
    console.log('Hide button');
  };
  const showButton = () => {
    setIsButtonVisible(true);
    console.log('Show button');
  };

  return {
    isButtonVisible,
    hideButton,
    showButton,
  };
};

export default useLoadingButton;
