// importa el módulo de node `file-system`
const fs = require('fs').promises

fs.unlink('./ruta/borrarArchivos')
  .then(() => {
    console.log('File removed')
  }).catch(err => {
    console.error('Something wrong happened removing the file', err)
  }) 