# TestTecnicoValkimia

Proyecto que consta de un backend realizado con node y expres desarrollado en Javascript con una base de datos Mysql conectada mediante Sequelize.
El frontedn se encuentra desarrollado con Reat, UiMaterial  y Axios para el consumo de las Apis.

Se trata de una aplicación pequeña la cual consta de un ABM de clientes y donde pueden listarse la totalidad de los mismos, modificar los datos o eliminarlos de forma simple. Tambien consta con un visualizador de facturas por cliente y un modulo para poder agregar nuevas facturas a un cliente determinado.

##Para ejecutar la aplicacion se debe
-[] Instalar todas las  dependencias tanto del back como del fron dirigiéndose  endose a las raices de cada proyecto y ejecutando en terminal el comando **npm i**
-[] Configurar la conexion a la BBDD en el archivo **config.js** que se encuentra en la carpeta /Back/src/dataBase/config/ .
-[] Ejecutar ambos proyectos paralelamente con el comando **npm run dev**

Luego de tener instalas las dependecias, los dos proyectos corriendo en paralelo y la base de datos configurada correctamente la aplicación deberia poder ejecutarse correctamente desde cualquier navegador
