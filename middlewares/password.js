function autorizado(req,res, cb){
    // console.log("holis");
    // console.log(req.session.usuario);
    if(req.session.usuario){
        cb();
    }else{
        res.redirect("/");
    }
}

module.exports={
    autorizado
}