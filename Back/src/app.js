import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const mysql = require("mysql");

//ROUTES
import clienteRouter from "./routes/Routes.Clientes";
import ciudadRouter from "./routes/Routes.Ciudades";
import facturasRouter from "./routes/Router.Facturas";
//

const app = express();

//Cors Configuration
const whitelist = ["http://127.0.0.1:5173"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
//Cors Configuration

app.use(methodOverride("_method"));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false })); //URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.set("port", 4000);
app.use("/api/clients", clienteRouter);
app.use("/api/cities", ciudadRouter);
app.use("/api/bills", facturasRouter);

export default app;
