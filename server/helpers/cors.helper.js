const corsOptionsDelegate = (req, callback) => {
  const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };

  // [TODO]
  // const { host = '', origin = '' } = req.headers;
  // const isValid = host.startsWith(process.env.SERVER_HOST) && new URL(origin).host.startsWith(process.env.CLIENT_HOST);

  // if (isValid) {
  //   corsOptions.credentials = true;
  //   corsOptions.origin = true;
  // }

  return callback(null, corsOptions);
};

export default corsOptionsDelegate;
