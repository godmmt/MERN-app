import { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AuthService from 'services/auth.service';

export const UserContext = createContext();

const UserProvider = () => {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  const value = { currentUser, setCurrentUser };

  return (
    <UserContext.Provider value={value}>
      <Outlet />
    </UserContext.Provider>
  );
};

export default UserProvider;
