//YA NO LO REQUIERO

var admin=require("firebase-admin");
var keys1=require("../keys.json");

if(admin.apps.length){
    admin.initializeApp({
        credential: admin.credential.cert(keys1),
        appName: 'productos'
    });
}else{
    admin.app();
}

var micuenta=admin.firestore();
var conexionPro=micuenta.collection("productos");

module.exports = conexionPro;