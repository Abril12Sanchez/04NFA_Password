var ruta = require("express").Router(); //variable de ruta
var subirArchivo=require("../middlewares/subirArchivos");
var {mostrarUsuarios, nuevoUsuario, modificarUsuario, buscarPorID, borrarUsuario}=require("../bd/usuariosBD");

ruta.get("/api/mostrarUsuarios", async (req,res)=>{ //req y res las declaramos aqui, see pueden llamar distinto
 var usuarios= await mostrarUsuarios();
  //res.render("usuarios/mostrar",{usuarios});
  if(usuarios.length>0)
    res.status(200).json(usuarios);
  else
    res.status(400).json("No hay usuarios");

})


ruta.post("/api/nuevousuario", subirArchivo(), async (req,res)=>{
  //console.log(req.body);
  req.body.foto=req.file.originalname;
  var error= await nuevoUsuario(req.body);
  if(error==0){
    res.status(200).json("Usuario Registrado");
  }else{
    res.status(400).json("Datos incorrectos");
  }

})

ruta.get("/modificar", async (req,res)=>{
  var usuario= await modificarUsuario();
  res.render("usuarios/modificar",{usuario});
})
ruta.post("/modificarusuario", async (req,res)=>{
  var error= await nuevoUsuario(req.body);
  res.redirect("/");
})

ruta.get("/api/buscarUsuarioPorId/:id",async(req,res)=>{

try{
  var user= await buscarPorID(req.params.id); //params recupera id
 if(!user){
  res.status(400).json("No se encontró ese usuario");
 }
 else{
  res.status(200).json(user);
 }
}catch(err){
  console.log("Error al buscar usuario"+err);
  res.status(500).json("Error del servidor");
}
//  console.log(user);
 
//  res.render("usuarios/modificar",{user});
});

ruta.post("/api/editarUsuario",subirArchivo(),async(req,res)=>{
  // console.log(req.body);//recive todo lo del formulario
  // res.end();
  var usuario=await buscarPorID(req.body.id);
  
  if(req.file){
    req.body.foto=req.file.originalname;
  }else{
    req.body.foto=usuario.foto;
  }

  var error=await modificarUsuario(req.body);
 // res.redirect("/");
 if(error==0){
  res.status(200).json("Usuario actualizado❤");
 }else{
  res.status(400).json("Error al editar usuario🤣🤣");
 }
});


ruta.get("/api/borrarUsuario/:id", async(req,res)=>{
  var error=await borrarUsuario(req.params.id);
  //res.redirect("/");
  if(error==0){
    res.status(200).json("Usuario Borrado");
  }else{
    res.status(400).json("Error al eliminar usuario 🤦‍♀️");
  }
});
module.exports = ruta;