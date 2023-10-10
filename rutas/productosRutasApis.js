var ruta = require("express").Router(); //variable de ruta
//var subirArchivo=require("../middlewares/subirArchivos");
var {
  mostrarProducto,
  nuevoProducto,
  modificarProducto,
  buscarPorID,
  borrarProducto,
} = require("../bd/productosBD");
const subirArchivo = require("../middlewares/subirArchivos");

//MUESTRA PRODUCTOS
ruta.get("/producto/api/mostrarProducto", async (req, res) => {
  //req y res las declaramos aqui, see pueden llamar distinto
  var productos = await mostrarProducto();
  if (productos.length > 0) {
    res.status(200).json(productos);
  } else {
    res.status(400).json("No hay productos disponibles");
  }
});

//AGREGA NUEVO PRODUCTO
ruta.post("/api/nuevoProducto", subirArchivo(), async (req, res) => {
  req.body.foto=req.file.originalname;
  var error = await nuevoProducto(req.body);
  
  if (error == 0) {
    res.status(200).json("Producto agregado");
  } else {
    res.status(400).json("Error al ingresar nuevo usuario");
  }
});
 
//BUSCA PRODUCTO POR ID
ruta.get("/producto/api/buscarProductoPorId/:id", async (req, res) => {
  try {
    var product = await buscarPorID(req.params.id);
    if (!product) {
      res.status(400).json("No se encontró ese producto");
    } else {
      res.status(200).json(product);
    }
  } catch (err) {
    console.error("Error al buscar producto" + err);
    res.status(500).json("Error interno del servidor");
  }
});

//EDITA PRODUCTO
ruta.post("/api/editarProducto", subirArchivo(), async (req, res) => {
  var producto=await buscarPorID(req.body.id);
  if(req.file){
    req.body.foto=req.file.originalname;
  }else{
    req.body.foto=producto.foto;
  }
  
  
  var error = await modificarProducto(req.body);
  if (error == 0) {
    res.status(200).json("Producto Actualizado");
  } else {
    res.status(400).json("Error al editar producto");
  }
});

//BORRA PRODUCTO
ruta.get("/api/borrarProducto/:id", async (req, res) => {
  var error = await borrarProducto(req.params.id);
  if (error == 0) {
    res.status(200).json("Producto Borrado");
  } else {
    res.status(400).json("Error al eliminar producto");
  }
});

module.exports = ruta;
