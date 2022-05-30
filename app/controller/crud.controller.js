'use strict';

var Task = require('../model/crud.model');

exports.insert = function (req, res) {
    var body = new Task(req.body);
    Task.insert(req.params.table, body, function (error, task) {
        if (error)
            res.status(400).send(error);
        res.status(201).json(task);
    });
};

exports.getAll = function (req, res) {
    Task.getAll(req.params.table, req.query, function (error, task) {
        if (error)
            res.status(400).send(error);
        res.json(task);
    });
};

exports.get = function (req, res) {
    Task.get(req.params.table, req.params.id, function (error, task) {
        if (error)
            res.status(400).send(error);
        res.json(task);
    });
};

exports.update = function (req, res) {
    var body = new Task(req.body);
    Task.update(req.params.table, req.params.id, body, function (error, task) {
        if (error)
            res.status(400).send(error);
        res.json(task);
    });
};

exports.delete = function (req, res) {
    Task.delete(req.params.table, req.params.id, function (error, task) {
        if (error)
            res.status(400).send(error);
        res.json(task);
    });
};

exports.getColumn = function (req, res) {
    Task.getColumn(req.params.table, req.params.column, req.params.column_value, req.query, function (error, task) {
        if (error)
            res.status(400).send(error);
        res.json(task);
    });
};

exports.updateColumn = function (req, res) {
    var body = new Task(req.body);
    Task.updateColumn(req.params.table, req.params.column, req.params.column_value, body, function (error, task) {
        if (error)
            res.status(400).send(error);
        res.json(task);
    });
};

exports.deleteColumn = function (req, res) {
    Task.deleteColumn(req.params.table, req.params.column, req.params.column_value, function (error, task) {
        if (error)
            res.status(400).send(error);
        res.json(task);
    });
};