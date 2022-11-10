// TODO: DB(mysql) 연결
// TODO: 모델 코드

const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: '1234',
    database: 'kdt'
});

exports.postSignup = (data, callback) => {
    conn.query(
        `INSERT INTO user (userid, name, pw) VALUES ('${data.userid}', '${data.name}', '${data.pw}')`,
        (err, rows) => {
            if(err) {
                throw err;
            }

            console.log('User.js', rows);
            callback(true);
        }
    );
};

exports.postSignin = (data, callback) => {
    conn.query(
        `SELECT * FROM user WHERE userid = '${data.userid}' and pw = '${data.pw}' LIMIT 1`, (err, rows) =>{
            if (err) {
                throw err;
        }
        callback(rows[0]);
});
}

exports.postProfile = (userid, callback) => {
    conn.query(`SELECT * FROM user WHERE userid = '${userid}' LIMIT 1`, (err, rows) =>{
        if (err) {
            throw err;
    }
    callback(rows[0]);
});
}

// exports.postProfile = (data, callback)

exports.postEdit = (data, callback) => {
    conn.query(`UPDATE user SET userid = '${data.userid}', name = '${data.name}', pw = '${data.pw}' WHERE id = ${data.id}`, (err, rows) => {
        if (err) {
            throw err;
        }
        console.log('User.js: ', rows);
        callback(true);
    })
}


exports.postDelete = (data, callback) => {
    conn.query(`DELETE FROM user WHERE id= ${data.id}`, (err, rows) => {
        if (err) {
            throw err;
        }
        callback(true);
    });
   
}