class Usuario {
    constructor(id, data) { // Constructor de la clase
        this.bandera = 0; // Propiedades de la clase
        this.id = id;  // Propiedades de la clase
        this.nombre = data.nombre;  // Propiedades de la clase
        this.usuario = data.usuario;  // Propiedades de la clase
        this.password = data.password;  // Propiedades de la clase
        this.edad = data.edad;  // Propiedades de la clase
        this.foto=data.foto;
    }
    // Metodos de la clase
    set id(id) {
        if (id != null) { // Si el id es nulo, se asigna 0 a la propiedad bandera
            id.length>0?this._id=id:this.bandera=1; // Si el id es mayor a 0, se asigna a la propiedad _id, si no, se asigna 1 a la propiedad bandera
        }
    }
    set nombre(nombre) {
        nombre.length > 0 ? this._nombre = nombre : this.bandera = 1; // Si el nombre es mayor a 0, se asigna a la propiedad _nombre, si no, se asigna 1 a la propiedad bandera primero se asigna el valor de la propiedad nombre a la propiedad _nombre
    }
    set usuario(usuario) {
        usuario.length > 0 ? this._usuario = usuario : this.bandera = 1;  // Si el usuario es mayor a 0, se asigna a la propiedad _usuario, si no, se asigna 1 a la propiedad bandera
    }
    set password(password) {
        password.length > 0 ? this._password = password : this.bandera = 1; // Si el password es mayor a 0, se asigna a la propiedad _password, si no, se asigna 1 a la propiedad bandera
    }
    set edad(edad) {
        edad > 0 ? this._edad = edad : this.bandera = 1; // Si la edad es mayor a 0, se asigna a la propiedad _edad, si no, se asigna 1 a la propiedad bandera
    }
    set foto(foto) {
        foto.length > 0 ? this._foto = foto : this.bandera = 1; // Si la edad es mayor a 0, se asigna a la propiedad _edad, si no, se asigna 1 a la propiedad bandera
    } 
    get id() {
    return this._id; // Se retorna el valor de la propiedad _id
    }
    get nombre() {
    return this._nombre;  // Se retorna el valor de la propiedad _nombre
    }º  
    get usuario() {
    return this._usuario;  // Se retorna el valor de la propiedad _usuario
    }
    get password() {
    return this._password;  // Se retorna el valor de la propiedad _password
    }
    get edad() {
    return this._edad;  // Se retorna el valor de la propiedad _edad
    }
    get foto() {
        return this._foto;  // Se retorna el valor de la propiedad _edad
        }

    get obtenerData(){
        if(this._id !=null)
        return {
            id: this.id,  // Se retorna el valor de la propiedad id de el get id
            nombre: this.nombre,  // Se retorna el valor de la propiedad nombre de el get nombre
            usuario: this.usuario, // Se retorna el valor de la propiedad usuario de el get usuario
            password: this.password,  // Se retorna el valor de la propiedad password de el get password
            edad: this.edad,  // Se retorna el valor de la propiedad edad de el get edad
            foto: this.foto
        }
        else{
            return {
                nombre: this.nombre,  // Se retorna el valor de la propiedad nombre de el get nombre
                usuario: this.usuario, // Se retorna el valor de la propiedad usuario de el get usuario
                password: this.password,  // Se retorna el valor de la propiedad password de el get password
                edad: this.edad,  // Se retorna el valor de la propiedad edad de el get edad
                foto:this.foto
            }
        }
        
    }
    
}

module.exports = Usuario; // Se exporta la clase Usuario