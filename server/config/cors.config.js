// 參考網址：https://www.npmjs.com/package/cors

const corsOptionsDelegate = (req, callback) => {
  const corsOptions = {
    // 設置 header 的 Access-Control-Allow-Origin
    origin: [process.env.CLIENT_SERVER],
    // 設置 header 的 Access-Control-Allow-Methods
    methods: 'GET, POST, DELETE, PUT, PATCH, OPTIONS',
    // 設置 header 的 Access-Control-Allow-Credentials
    credentials: true,
  };

  callback(null, corsOptions);
};

export default corsOptionsDelegate;
