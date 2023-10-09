import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToTopWhenRouteChange = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default useScrollToTopWhenRouteChange;
