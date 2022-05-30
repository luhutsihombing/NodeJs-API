'use strict';

var Task = require('../model/auth.model');
var Crud = require('../model/crud.model');

const jwt = require('../include/jwt/index');

exports.loginAuth = function (req, res) {
    var body = new Task(req.body);
    Task.loginAuth(req.params.table, body, function (error, task) {
        if (error)
            res.status(400).send(error);
        res.json(task);
    });
};

exports.createAuth = function (req, res) {
    var body = new Task(req.body);
    Task.createAuth(req.params.table, body, function (error, task) {
        if (error)
            res.status(400).send(error);
        res.status(201).json(task);
    });
};

exports.accessToken = function (req, res) {
    jwt.accessTokenDecode(function (e) {
        if (e.status) {
            Crud.get(req.params.table, e.data.id, function (error, task) {
                if (error)
                    res.status(400).send(error);
                res.json(task[0]);
            });
        } else {
            return res.status(e.code).send({
                message: e.message
            });
        }
    }, req.body.access_token);

};

exports.refreshToken = function (req, res) {
    jwt.refreshTokenDecode(function (e) {
        if (e.status) {
            return res.send({
                access_token: jwt.accessTokenEncode(e.data.id),
                refresh_token: jwt.refreshTokenEncode(e.data.id)
            })
        } else {
            return res.status(e.code).send({
                message: e.message
            });
        }
    }, req.body.refresh_token);

};