import { useContext } from 'react';
import { UserContext } from 'providers/UserProvider';
import { ModalContext } from 'providers/ModalProvider';

export const useCurrentUser = () => {
  return useContext(UserContext);
};

export const useModal = () => {
  return useContext(ModalContext);
};
