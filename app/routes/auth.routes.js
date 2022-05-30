module.exports = app => {
  const auth = require('../controller/auth.controller');

  var router = require("express").Router();

  router.route('/:table')
    .post(auth.loginAuth);

  router.route('/register/:table')
    .post(auth.createAuth);

  router.route('/access-token/:table')
    .post(auth.accessToken);

  router.route('/refresh-token/:table')
    .post(auth.refreshToken);

  app.use("/auth", router);
};