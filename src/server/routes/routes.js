module.exports = function (router, routes) {
  Object.keys(routes).forEach((route) => {
    router.use('', routes[route].routes(), routes[route].allowedMethods()); // register event
  });
  return router.routes()
};