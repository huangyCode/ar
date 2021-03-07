const options = require('../model-opts');

module.exports = function(Sequelize, DataTypes) {
    const admin = Sequelize.define('admin', {
        id: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username:{
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        type: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
        },
        merchantId:{
            type: DataTypes.INTEGER(20),
            allowNull: false,
            field:'merchant_id'
        }
    }, Object.assign(options, {tableName: 'admin'}));

    return admin;
};
