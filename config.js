var config = {
    host: 'localhost',
    port: 3000,
    db: {
        connectionLimit: 10,
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'test',
        connectTimeout: 10000, // 10s
        // charset: 'utf8'
    }
};

module.exports = config;
