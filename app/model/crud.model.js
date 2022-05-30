'user strict';
var sql = require('../config/db.config');

class Task {
    constructor(task) {
        this.body = task;
    }

    static insert(table, data, result) {
        const body = data.body;
        sql.query(`INSERT INTO ${table} SET ?`, body, function (error, response) {
            if (error) {
                result(error);
            } else {
                body.id = response.insertId;
                result(null, body);
            }
        });
    }

    static getAll(table, queryparams, result) {
        var order = queryparams.order ? queryparams.order : "DESC"
        var order_by = queryparams.order_by ? queryparams.order_by : "id"

        var query = `SELECT * FROM ${table} ORDER BY ${order_by} ${order}`;

        if (queryparams.offset && queryparams.limit) {
            query += ` LIMIT ${queryparams.offset}, ${queryparams.limit}`;
        }

        sql.query(query, function (error, response) {
            if (error) {
                console.log(error);
                result(error);
            } else {
                result(null, response);
            }
        });
    }

    static get(table, id, result) {
        const query = `SELECT * FROM ${table} WHERE id = '${id}'`;
        sql.query(query, function (error, response) {
            if (error) {
                console.log(error);
                result(error);
            } else {
                result(null, response);
            }
        });
    }

    static update(table, id, data, result) {
        const body = data.body;
        const query = `UPDATE ${table} SET ? WHERE id = ?`;
        sql.query(query, [body, id], function (error, response) {
            if (error) {
                result(error);
            } else {
                result(null, body);
            }
        });
    }

    static delete(table, id, result) {
        const query = `DELETE FROM ${table} WHERE id = '${id}'`;
        sql.query(query, function (error, response) {
            if (error) {
                result(error);
            } else {
                result(null, response);
            }
        });
    }

    static getColumn(table, column, column_value, queryparams, result) {
        var order = queryparams.order ? queryparams.order : "DESC"
        var order_by = queryparams.order_by ? queryparams.order_by : "id"

        var query = `SELECT * FROM ${table} WHERE ${column} = '${column_value}' ORDER BY ${order_by} ${order}`;

        if (queryparams.offset && queryparams.limit) {
            query += ` LIMIT ${queryparams.offset}, ${queryparams.limit}`;
        }

        sql.query(query, function (error, response) {
            if (error) {
                console.log(error);
                result(error);
            } else {
                result(null, response);
            }
        });
    }

    static updateColumn(table, column, column_value, data, result) {
        const body = data.body;
        const query = `UPDATE ${table} SET ? WHERE ${column} = ?`;
        sql.query(query, [body, column_value], function (error, response) {
            if (error) {
                result(error);
            } else {
                result(null, response);
            }
        });
    }

    static deleteColumn(table, column, column_value, result) {
        const query = `DELETE FROM ${table} WHERE ${column} = '${column_value}'`;

        sql.query(query, function (error, response) {
            if (error) {
                result(error);
            } else {
                result(null, response);
            }
        });
    }

}

module.exports = Task;