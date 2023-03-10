import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser'
import db from "./dataBase/models";
const mysql = require('mysql');
const sequelize = db.sequelize;


//ROUTES


const app = express()


const whitelist = ["http://127.0.0.1:5173"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))



app.use(bodyParser.json()) 
app.set("port",4000)


export default app;