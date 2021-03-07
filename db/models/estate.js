const options = require('../model-opts');

module.exports = function (Sequelize, DataTypes) {
    const estate = Sequelize.define('estate', {
        id: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        district: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        province: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        contact: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        desc: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        tag: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },

        createTime: {
            field: 'create_time',
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW
        },
    }, Object.assign(options, {tableName: 'estate'}));

    return estate;
};
