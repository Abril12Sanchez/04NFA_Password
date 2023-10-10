var conexionPro=require("./conexion").conexionPro;
var Producto=require("../modelos/Producto");
//const conexionPro = require("./conexionPro");

async function mostrarProducto(){
    var products=[];
    try{ 
        var productos= await conexionPro.get(); //trae toda la info de la tabla
        productos.forEach(producto => {
            var product=new Producto(producto.id, producto.data());
            if(product.bandera==0){
                products.push(product.obtenerData);
            }
        });
    } 
    catch(err){
        console.log("Error al recuperar PRODUCTOS en la base de datos"+err);
    }
    return products;
}

async function buscarPorID(id){
   /* var product;
   // console.log(id);
    try{
        var producto=await conexionPro.doc(id).get(); // doc como registro en mysql
        var productoObjeto=new Producto(producto.id, producto.data());
        if(productoObjeto.bandera==""){
            product=productoObjeto.obtenerData;
        }
    }
    catch(err){
        console.log("Error al recuperar los productos"+err);

    }
    return product; */
    var producto = null; //inicio la variable producto
  
    try {
      var productoDoc = await conexionPro.doc(id).get(); //busca el producto por id
      
      if (productoDoc.exists) {
        producto = new Producto(productoDoc.id, productoDoc.data());  //si lo encuentra 
        
        if (producto.bandera == 0) { //si el producto existe y no esta vacio lo retorna
          producto = producto.obtenerData; //retorna el producto
        }
      }
    } catch (err) {
      console.log("Error al recuperar al producto" + err); //si no lo encuentra
    }
    
    return producto; // retonrna si no encuentra nada
}

async function nuevoProducto(datos) {
    var producto = new Producto(null, datos);
    var error = 1;
    if (producto && producto.bandera == 0) {
        try {
            await conexionPro.doc().set(producto.obtenerData);
            console.log("Producto insertado a la BD");
            error = 0;
        } catch (err) {
            console.log("Error al capturar nuevo producto" + err);
        }
    }
    return error;
}


async function modificarProducto(datos){
    var error=1;
    var respuestaBuscarP=await buscarPorID(datos.id);
    if(respuestaBuscarP!=undefined){
     var producto=new Producto(datos.id, datos);
       
    if (producto.bandera==0){
        try{
            await conexionPro.doc(producto.id).update(producto.obtenerData);
            console.log("Producto actualizado en la BD");
            error=0;
        }
        catch(err){
            console.log("Error al actualizar producto"+err);
        }
    }
}
    return error;
}


async function borrarProducto(id) {
    var error=1;
    var product=await buscarPorID(id);
    if(product!= undefined){
        try{
            await conexionPro.doc(id).delete();
            console.log("PRODUCTO borrado");
            error=0;
        }
        catch(err){
            console.log("Error al borrar PRODUCTO"+err);
        }
    }
    
    return error;
}

module.exports={
    mostrarProducto,
    buscarPorID,
    nuevoProducto,
    modificarProducto,
    borrarProducto
}