import mysql from 'mysql2/promise';

const connection = mysql.createPool({
    host: 'localhost',
    user: '',
    password: '',
    database: 'Leituras',
});

export default connection;