import axios from 'axios';

const isDev = process.env.NODE_ENV === 'development';

// [TODO]: change prod host
export const apiHost = isDev
  ? process.env.REACT_APP_SERVER_HOST_DEV
  : process.env.REACT_APP_SERVER_HOST_PROD;

const axiosInstance = axios.create({ baseURL: `${apiHost}/api` });

axiosInstance.interceptors.request.use(
  (configs) => {
    // [TODO]: request send token in header
    // const token = getToken();
    // configs.headers.authorization = `Bearer ${token}`;
    return configs;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  // error
  (error) => {
    let { response } = error;
    errorCodeCheck(response.status);
    return Promise.reject(response);
  }
);

const errorCodeCheck = (status) => {
  switch (status) {
    case 401:
    case 403:
    case 500:
      sessionStorage.removeItem('token');
      break;
    default:
      break;
  }
};

export default axiosInstance;
