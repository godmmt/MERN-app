import { useContext } from 'react';
import { UserContext } from 'providers/UserProvider';

const useCurrentUser = () => {
  return useContext(UserContext);
};

export default useCurrentUser;
