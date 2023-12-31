var express = require("express");
var cors=require("cors"); //nueva
var path = require("path"); // Add this line to require the 'path' module
var rutas = require("./rutas/usuariosRutas");
var rutasPro = require("./rutas/productosRutas");
var rutasUsuariosApis=require("./rutas/usuariosRutasApis")
var rutasProductosApis=require("./rutas/productosRutasApis");
//var session=requiere("express-session"); //se almacena en el servidor
var session=require("cookie-session");
require("dotenv").config();
const app = express();
app.set("view engine", "ejs");
app.use(cors());//nueva
app.use(session({
    name: 'session',
    keys:[process.env.KEYS],
    maxAge:24*60*60*1000
}));

app.set('views', path.join(__dirname, 'views'));
//app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", rutas);
app.use("/producto", rutasPro);
app.use("/",rutasUsuariosApis);
app.use("/producto",rutasProductosApis);
app.use("/", express.static(path.join(__dirname,"/web")));

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Servidor en http://localhost:" + port);
});
 