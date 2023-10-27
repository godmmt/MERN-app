import { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AuthService from 'services/auth.service';
import { toast } from 'react-toastify';

export const UserContext = createContext();

const UserProvider = () => {
  const [currentUser, setCurrentUser] = useState({});

  const { id, role, accessToken, refreshToken } = currentUser;

  const hasUser = !!(id && role && accessToken && refreshToken);
  const isInstructor = role === 'instructor';
  const isStudent = role === 'student';

  const login = (value) => {
    setCurrentUser(value);
    Object.entries(value).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
    toast.success('Login successfully.');
  };

  const logout = () => {
    setCurrentUser({});
    AuthService.authKeys.forEach((key) => {
      localStorage.removeItem(key);
    });
    toast.success('Logout successfully.');
  };

  const value = {
    id,
    role,
    hasUser,
    isStudent,
    isInstructor,
    accessToken,
    refreshToken,
    setCurrentUser,
    login,
    logout,
  };

  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  return (
    <UserContext.Provider value={value}>
      <Outlet />
    </UserContext.Provider>
  );
};

export default UserProvider;
