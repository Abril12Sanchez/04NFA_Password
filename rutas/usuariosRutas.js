var ruta = require("express").Router(); //variable de ruta
var subirArchivo=require("../middlewares/subirArchivos");
var {mostrarUsuarios, nuevoUsuario, modificarUsuario, buscarPorID, borrarUsuario,login}=require("../bd/usuariosBD");

ruta.get("/", async (req,res)=>{ //req y res las declaramos aqui, see pueden llamar distinto
 var usuarios= await mostrarUsuarios();
  res.render("login",{usuarios});
})

ruta.get("/mostrar", async (req,res)=>{ //req y res las declaramos aqui, see pueden llamar distinto
 var usuarios= await mostrarUsuarios();
  res.render("usuarios/mostrar",{usuarios});
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


ruta.get("/modificar", async (req,res)=>{
  var usuario= await modificarUsuario();
  res.render("usuarios/modificar",{usuario});
})
ruta.post("/modificarusuario", async (req,res)=>{
  var error= await nuevoUsuario(req.body);
  res.redirect("/");
})

ruta.get("/editar/:id",async(req,res)=>{
 var user= await buscarPorID(req.params.id); //params recupera id
// console.log(user);
 
 res.render("usuarios/modificar",{user});
});

ruta.post("/editar",subirArchivo(), async(req,res)=>{
  // console.log(req.body);//recive todo lo del formulario
  // res.end();
  
  // if(req.file!=undefined){
  //   req.body.foto=req.file.originalname;
  // }
  var usuario=await buscarPorID(req.body.id);
  if(req.file){
    req.body.foto=req.file.originalname;
  }else{
    req.body.foto=usuario.foto;
  }
   
  var error=await modificarUsuario(req.body);
  res.redirect("/");
});


ruta.get("/borrar/:id", async(req,res)=>{
  await borrarUsuario(req.params.id);
  res.redirect("/");
});

ruta.post("/login",async(req,res)=>{
  var user=await login(req.body);
  console.log(user);
  if(user==undefined){
    res.redirect("/error")
  }else{
    res.redirect("/mostrar"); //cuando tengo esa ruta
  }
})

ruta.get("/registro", async(req,res)=>{
  res.render("/usuarios/nuevo"); //para ir a algun archivo
})


ruta.get("/error",async(req,res)=>{
  res.render("pantallaError");
})
module.exports = ruta;