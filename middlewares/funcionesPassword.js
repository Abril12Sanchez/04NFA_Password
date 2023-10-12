const { log } = require("console");
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


// var {salt, hash}=encriptarPassword("hola");
// console.log("salt: "+salt);
// console.log(hash);
// console.log(validadPassword("hola",hash, salt));



module.exports={
    encriptarPassword,
    validadPassword
}