var admin=require("firebase-admin");
var keys=require("../keys.json");

admin.initializeApp({
    credential:admin.credential.cert(keys)
});
var micuenta=admin.firestore();
var conexionUsu=micuenta.collection("miejemploBD");
var conexionPro=micuenta.collection("productos");

module.exports = {
    conexionUsu,
    conexionPro
}; 