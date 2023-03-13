'use strict';

import path from 'path';
import Sequelize from 'sequelize';
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }

});
sequelize.authenticate().then(() => {
console.log('conexion establecida con la Base de Datos')
}).catch(error => {
  console.log(error)
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
