const options = require('../model-opts');

module.exports = function(Sequelize, DataTypes) {
    const buildHouseLink = Sequelize.define('buildHouseLink', {
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
        houseId:{
            type: DataTypes.STRING(20),
            allowNull: false,
            field:'house_id'
        },
        createTime: {
            field: 'create_time',
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW
        },
    }, Object.assign(options, {tableName: 'build_house_link'}));

    return buildHouseLink;
};
