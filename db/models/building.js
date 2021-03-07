const options = require('../model-opts');

module.exports = function (Sequelize, DataTypes) {
    const building = Sequelize.define('building', {
        id: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        estateId: {
            type: DataTypes.INTEGER(20),
            allowNull: true,
            field: 'estate_id',
        },
        number: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        openTime:{
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'open_time',
        },
        contact: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        priceFrom: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'price_from',
        },
        priceTo: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'price_to',
        },
        unit:{
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        createTime: {
            field: 'create_time',
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW
        },
    }, Object.assign(options, {tableName: 'building'}));

    return building;
};
