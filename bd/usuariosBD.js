var conexion=require("./conexion").conexionUsu;
var Usuario=require("../modelos/Usuario");
var {encriptarPassword, validadPassword}=require("../middlewares/funcionesPassword");

async function mostrarUsuarios(){
    var users=[];
    try{ 
        var usuarios= await conexion.get(); //trae toda la info de la tabla
        usuarios.forEach(usuario => {
            //nuevas cosas
            var user=new Usuario(usuario.id, usuario.data());
            if(user.bandera==0){
                users.push(user.obtenerData);
               // console.log(user.obtenerData);
            }
        });
         
    }
    catch(err){
        console.log("Error al recuperar usuarios en la base de datos"+err);
    }
    return users;
}

async function buscarPorID(id){
    var user;
   // console.log(id);
    try{
        var usuario=await conexion.doc(id).get(); // doc como registro en mysql
        var usuarioObjeto=new Usuario(usuario.id, usuario.data());
        if(usuarioObjeto.bandera==0){
            user=usuarioObjeto.obtenerData;
        }
    }
    catch(err){
        console.log("Error al recuperar al usuario"+err);
    }
    return user; 
}

async function nuevoUsuario(datos){
    var {hash, salt}=encriptarPassword(datos.password);
    datos.passwsord=hash;
    datos.salt=salt;
    var user=new Usuario(null, datos);
    var error=1;
        if(user.bandera==0){
            try{
                // //MANDAMOS ENCRIPTAR
                // var{salt, hash}=encriptarPassword(user.obtenerData.password);//regresa pass encryp
                // console.log(hash);
                user.password=hash;
                user.obtenerData.salt=salt;
                console.log(salt);
                await conexion.doc().set(user.obtenerData); 
                console.log("Usuario insertado a la BD");
                error=0;
            }
            catch(err){
                console.log("Error al capturar nuevo usuario"+err);
            }
        }
        return error;
}


async function modificarUsuario(datos){
    console.log(datos.fotoVieja);
    console.log(datos.passwsordViejo);
    var error=1;
    var respuestaBuscar=await buscarPorID(datos.id);
    if(respuestaBuscar!=undefined){
        if(datos.password=""){
            datos.password=datos.passwsordViejo;
            datos.salt=datos.saltViejo;
        }else{
            var {salt, hash}=encriptarPassword(datos.password);
            datos.password=hash;
            datos.salt=salt;
        }
            var user=new Usuario(datos.id, datos);
        if (user.bandera==0){
            try{
                await conexion.doc(user.id).set(user.obtenerData); 
                console.log("Registro actualizado");
                error=0;
            }catch(err){
                console.log("Error al modificar usuario"+err);
            }
        }   
    }
    
    return error; 
}

async function borrarUsuario(id) {
var error=1;
   var user= await buscarPorID(id);
   if(user!=undefined){
    try{
        await conexion.doc(id).delete();
        console.log("Registro borrado");
        error=0;
    }
    catch(err){
        console.log("Error al borrar usuario"+err);
    }
   }
    return error;
    
}


async function login(datos){
    var user=undefined;
    var usuarioObjeto;
    try{
        var usuarios=await conexion.where('usuario', '==',datos.usuario).get();
        if(usuarios.docs.length==0){ //no existe
            return undefined
        }
        usuarios.docs.filter((doc)=>{
            var validar=validadPassword(datos.password, doc.data().password, doc.data().salt);
            if(validar){
                usuarioObjeto=new Usuario(doc.id, doc.data());
                if(usuarioObjeto.bandera==0){
                    user=usuarioObjeto.obtenerData;
                }
            }
            else
            return undefined;
        });
    }
    catch(err){
        console.log("Error al recuperar al usuario+err");
    }
    return user;
}


module.exports={
    mostrarUsuarios,
    buscarPorID,
    nuevoUsuario,
    modificarUsuario,
    borrarUsuario,
    login
}