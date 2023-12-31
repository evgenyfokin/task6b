'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const {Model} = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};


let sequelize;

const databaseUrl = process.env.CLEARDB_DATABASE_URL

if (databaseUrl) {
    const connectionParams = new URL(databaseUrl); // Разбиваем URL на компоненты
    sequelize = new Sequelize(connectionParams.pathname.substr(1), connectionParams.username, connectionParams.password, {
        host: connectionParams.hostname,
        dialect: 'mysql',
        protocol: 'mysql',
        port: connectionParams.port,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Важно добавить эту опцию, если сервер базы данных использует самоподписанный сертификат
            }
        }
    });
} else {
    const env = process.env.NODE_ENV || 'development';
    const config = require(__dirname + '/../config/config.json')[env];
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            file.indexOf('.test.js') === -1
        );
    })
    .forEach(file => {
        'use strict';
        const {
            Model
        } = require('sequelize');
        module.exports = (sequelize, DataTypes) => {
            class User extends Model {
                static associate(models) {
                    // define association here
                }
            }

            User.init({
                name: DataTypes.STRING
            }, {
                sequelize,
                modelName: 'User',
            });
            return User;
        };
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync()

module.exports = db;
