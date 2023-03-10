
import app from "./app";
import {sequelize} from "./dataBase/config/connection";




const main= ()=>{
    app.listen(app.get("port"))
    console.log(`Server on port ${app.get("port")}`);
    sequelize.testConn()
}

main();