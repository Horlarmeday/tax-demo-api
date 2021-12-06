import staffRoutes from '../modules/User/staff.routes';
import taxRoutes from '../modules/Tax/tax.routes';

export default server => {
  server.use('/api/staffs', staffRoutes);
  server.use('/api/taxes', taxRoutes);

  server.use((req, res, next) => {
    const apiTimeout = 18000;
    // set the timeout for all HTTP requests
    req.setTimeout(apiTimeout, () => {
      const err = new Error('Request Timeout');
      err.status = 408;
      next(err);
    });

    // set the server response timeout for all HTTP requests
    res.setTimeout(apiTimeout, () => {
      const err = new Error('Service Unavailable');
      err.status = 503;
      next(err);
    });
    next();
  });
  server.use((req, res, next) => {
    const err = res.status(404).json('Resource does not exist');
    next(err);
  });
};
