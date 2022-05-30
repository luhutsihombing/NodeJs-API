'user strict';
var sql = require('../config/db.config');
const jwt = require('../include/jwt/index');

const bcrypt = require('bcrypt');
const saltRounds = 10;

class Task {
    constructor(task) {
        this.body = task;
    }

    static loginAuth(table, data, result) {
        const body = data.body;

        const query = `SELECT * FROM ${table} 
        WHERE
        email = '${body.email}'
        `;
        sql.query(query, async function (error, response) {
            if (error) {
                result(error);
            } else {
                if (response.length) {
                    const match = await bcrypt.compare(body.password, response[0].password);
                    
                    if(match) {
                        result(null, {
                            access_token: jwt.accessTokenEncode(response[0].id),
                            refresh_token: jwt.refreshTokenEncode(response[0].id),
                            user : response[0]
                        });
                    }   else {
                        result({
                            message: "Incorrect Password"
                        });
                    }
                    
                } else {
                    result({
                        message: "Wrong Email"
                    });
                }
            }
        });
    }

    static createAuth(table, data, result) {
        const body = data.body;
        bcrypt.hash(body.password, saltRounds, function (err, hash) {
            body.password = hash;
            sql.query(`INSERT INTO ${table} SET ?`, body, function (error, response) {
                if (error) {
                    result(error);
                } else {
                    result(null, {
                        access_token: jwt.accessTokenEncode(response.insertId),
                        refresh_token: jwt.refreshTokenEncode(response.insertId)
                    });
                }
            });
        });
    }

}
module.exports = Task;