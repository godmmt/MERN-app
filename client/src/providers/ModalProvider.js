import { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';

export const ModalContext = createContext();

const ModalProvider = () => {
  // 控制Login Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const value = { isModalOpen, setIsModalOpen };

  return (
    <ModalContext.Provider value={value}>
      <Outlet />
    </ModalContext.Provider>
  );
};

export default ModalProvider;
