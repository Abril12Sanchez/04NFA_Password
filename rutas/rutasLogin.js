var ruta = require("express").Router(); //variable de ruta
var subirArchivo=require("../middlewares/subirArchivos");
var {mostrarUsuarios, nuevoUsuario}=require("../bd/usuariosBD");

ruta.get("/", async (req,res)=>{ //req y res las declaramos aqui, see pueden llamar distinto
 var usuarios= await mostrarUsuarios();
  res.render("registro",{usuarios});
})


 ruta.get("/nuevousuario", async (req,res)=>{
  res.render("usuarios/nuevo");
})
ruta.post("/nuevousuario", subirArchivo(), async (req,res)=>{
  //console.log(req.file);
  req.body.foto=req.file.originalname;
  //console.log(req.body);
  var error= await nuevoUsuario(req.body);
  //res.end();
  res.redirect("/");
});