const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
const connection = new Sequelize('facturacionvalkimia','root','',{
    host:'localhost',
    dialect:'mysql',
    port:3030
    //logging:false
}) // Example for sqlite

const testConn = async()=>{
    try {
        await connection.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}



export const sequelize = {connection, testConn};