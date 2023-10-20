var crypto =require("crypto");

function encriptarPassword(password){
    var salt=crypto.randomBytes(32).toString('hex');//entrega en flujo de bits
    var hash=crypto.scryptSync(password, salt ,100000,64,'sha512').toString('hex');
    return {salt, hash}
}

function validadPassword(password, hash, salt){
    var hashEvaluar=crypto.scryptSync(password, salt, 100000,64,'sha512').toString('hex');
    return hashEvaluar=== hash
}


function autorizado(req,res, cb){
    if(req.session.usuario || req.session.admin ){
        cb();
    }else{
        res.redirect("/");
    }
}

function admin(req,res, cb){
    // console.log("holis");
    // console.log(req.session.usuario);
    if(req.session.admin){
        cb();
    }else{
        if(req.session.usuario){
            res.redirect("/mostrar");
        }else{
            res.redirect("/");
        }
    }
}

// var {salt, hash}=encriptarPassword("hola");
// console.log("salt: "+salt);
// console.log(hash);
// console.log(validadPassword("hola",hash, salt));




module.exports={
    encriptarPassword,
    validadPassword,
    autorizado, 
    admin
}