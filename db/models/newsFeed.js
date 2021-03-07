const options = require('../model-opts');

module.exports = function(Sequelize, DataTypes) {
    const newsFeed = Sequelize.define('newsFeed', {
        id: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        buildId:{
            type: DataTypes.STRING(20),
            allowNull: false,
            field:'build_id'
        },
        desc:{
            type: DataTypes.STRING(200),
            allowNull: false,
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
    }, Object.assign(options, {tableName: 'news_feed'}));

    return newsFeed;
};
