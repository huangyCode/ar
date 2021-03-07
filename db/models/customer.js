const options = require('../model-opts');

module.exports = function (Sequelize, DataTypes) {
    const customer = Sequelize.define('customer', {
        id: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'user_name'
        },
        phone:{
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        password:{
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        nickName: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'nick_name'
        },
        type:{
            type: DataTypes.INTEGER(5),
            defaultValue:0,
            allowNull: true,
        },
        businessId:{
            field: 'business_id',
            defaultValue:0,
            type: DataTypes.INTEGER(5),
        },
        status:{
            type: DataTypes.INTEGER(5),
            allowNull: true,
            defaultValue: 1
        },
        avatar: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        createTime: {
            field: 'create_time',
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW
        },
        updateTime: {
            field: 'update_time',
            type: DataTypes.STRING(500),
            defaultValue: Sequelize.NOW
        },

        createPerson:{
            type: DataTypes.STRING(20),
            allowNull: true,
            field:'create_person'
        },
        updatePerson:{
            type: DataTypes.STRING(20),
            allowNull: true,
            field:'update_person'
        },

    }, Object.assign(options, {tableName: 'customer'}));

    return customer;
};
