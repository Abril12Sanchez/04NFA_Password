var ruta = require("express").Router(); //variable de ruta
var {mostrarProducto, nuevoProducto, modificarProducto, buscarPorID, borrarProducto}=require("../bd/productosBD");
const subirArchivo = require("../middlewares/subirArchivos");


ruta.get("/producto", async (req,res)=>{ //req y res las declaramos aqui, see pueden llamar distinto
    var productos= await mostrarProducto();
     res.render("productos/mostrarP",{productos});
   })

   ruta.get("/nuevoproducto", async (req,res)=>{
     res.render("productos/nuevoP");
   })

   ruta.post("/nuevoproducto", subirArchivo(), async (req,res)=>{
    req.body.foto=req.file.originalname;
     var error= await nuevoProducto(req.body);
     res.redirect("/producto/producto"); 
   })

   ruta.get("/producto/editarP/:id", async (req, res) => {
    var product = await buscarPorID(req.params.id);
    res.render("productos/modificarP", { product });
})
ruta.post("/editarP",subirArchivo(), async (req, res) => {

  var usuario=await buscarPorID(req.body.id);
  if(req.file){
    req.body.foto=req.file.originalname;
  }else{
    req.body.foto=usuario.foto;
  }
    var error = await modificarProducto(req.body);
    res.redirect("/producto/producto");
})
   
   
   ruta.get("/borrarP/:id", async(req,res)=>{
     await borrarProducto(req.params.id);
     res.redirect("/producto/producto");
   });
   
   module.exports = ruta;