module.exports = {
    test: {
        username: 'root',
        password: '123456',
        database: 'ar',
        port: '3306',
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        seederStorage: 'sequelize'
    },
    production: {
        username: 'root',
        password: 'cattalk123456',
        database: 'ar',
        port: '3306',
        host: '120.55.60.49',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        seederStorage: 'sequelize'
    }
}[process.env.NODE_ENV || 'test'];
