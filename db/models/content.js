const options = require('../model-opts');

module.exports = function (Sequelize, DataTypes) {
    const content = Sequelize.define('content', {
        id: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        desc: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        content: {
            type: DataTypes.STRING(50000),
            allowNull: true,
        },
        classesId:{
            type: DataTypes.INTEGER(20),
            allowNull: true,
            field: 'classes_id',
        },
        coverImg: {
            type: DataTypes.STRING(50),
            allowNull: true,
            field: 'cover_img',
        },
        like: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        read: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        repliesCount:{
            type: DataTypes.INTEGER(20),
            allowNull:true,
            field: 'replies_count'
        },
        createTime: {
            field: 'create_time',
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW
        },
        updateTime: {
            field: 'update_time',
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW
        },
        createPerson:{
            type: DataTypes.STRING(10),
            allowNull: true,
            field:'create_person'
        },
        updatePerson:{
            type: DataTypes.STRING(10),
            allowNull: true,
            field:'update_person'
        },
        status:{
            type: DataTypes.INTEGER(2),
            allowNull: true,
            defaultValue: 0
        }
    }, Object.assign(options, {tableName: 'content'}));

    return content;
};
