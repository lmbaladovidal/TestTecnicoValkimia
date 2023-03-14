require('dotenv').config()
module.exports = {
    "development": {
      "username": process.env.USER,
      "password": process.env.PASSWORD, 
      "database": process.env.DATABASE,
      "host": process.env.HOST,
      "port":process.env.PORT,
      "dialect": process.env.DIALECT
    },
    "test": {
      "username": "root",
      "password": "", 
      "database": "chec_db",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  }
  