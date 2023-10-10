class Producto { 
    constructor(id, datos) { 
        this.id = id; 
        this.nombre = datos.nombre; 
        this.descripcion = datos.descripcion; 
        this.precio = datos.precio; 
        this.cantidad = datos.cantidad; 
        this.foto=datos.foto;
        this.bandera = 0; 
        
    } 
    set id(id){ 
        if(id!=null){ 
            id.length>0?this._id=id:this.bandera=1; 
        } 
    } 
    set nombre(nombre){ 
        nombre.length>0?this._nombre=nombre:this.bandera=1; 
    } 
    set descripcion(descripcion){ 
        descripcion.length>0?this._descripcion=descripcion:this.bandera=1; 
    }  
    set precio(precio){ 
        precio.length>0?this._precio=precio:this.bandera=1; 
    } 
    set cantidad(cantidad){ 
        cantidad.length>0?this._cantidad=cantidad:this.bandera=1; 
    } 
    set foto(foto) {
        foto.length > 0 ? this._foto = foto : this.bandera = 1; 
    }
   
    get id(){ 
        return this._id; 
    } 
    get nombre(){ 
        return this._nombre; 
    } 
    get descripcion(){ 
        return this._descripcion; 
    } 
    get precio(){ 
        return this._precio; 
    } 
    get cantidad(){ 
        return this._cantidad; 
    } 
    get foto(){
        return this._foto;
    }
    get obtenerData(){ 
        if(this._id!=null){ 
            return{ 
                id:this.id, 
                nombre:this.nombre, 
                descripcion:this.descripcion, 
                precio:this.precio, 
                cantidad:this.cantidad, 
                foto:this.foto
            } 
        } 
        else{ 
            return{ 
                nombre:this.nombre, 
                descripcion:this.descripcion, 
                precio:this.precio, 
                cantidad:this.cantidad,
                foto:this.foto 
            } 
    } 
    } 
 
} 
 
module.exports = Producto;