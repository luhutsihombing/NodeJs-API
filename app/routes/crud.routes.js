module.exports = function (app) {
    const crud = require('../controller/crud.controller');
    const auth = require('../config/middleware/auth');

    var router = require("express").Router();

    router.route('/:table')
        .get(crud.getAll)
        .post(crud.insert);

    router.route('/:table/:id')
        .get(crud.get)
        .put(crud.update)
        .delete(crud.delete);

    router.route('/:table/:column/:column_value')
        .get(crud.getColumn)
        .put(crud.updateColumn)
        .delete(crud.deleteColumn);

    // Without Authentication
    // app.use("/", router);

    // For Authentication use like this
    app.use("/crud", router);
};
