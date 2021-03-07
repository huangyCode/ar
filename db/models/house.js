const options = require('../model-opts');

module.exports = function (Sequelize, DataTypes) {
    const house = Sequelize.define('house', {
        id: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        img: {
            type: DataTypes.STRING(225),
            allowNull: true,
        },
        desc: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        area: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        price: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        createTime: {
            field: 'create_time',
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW
        },
    }, Object.assign(options, {tableName: 'house'}));

    return house;
};
