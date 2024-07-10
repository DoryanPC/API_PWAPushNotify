
const { UserModel } = require('../mongoose/models/UserModel.js');
const { format } = require('date-fns');

const UserController={};

UserController.getUsers = async (req, res) => {
  let users=await UserModel.find();    
  return users;
};

UserController.saveTokenServer = async (req, res) => {

    try{

        const name = Math.floor(Date.now()/1000);
    
        let tokenbrowser = req.body.token;
    
        let data = JSON.stringify(tokenbrowser);
    
        const dirPath = path.join(__dirname, './tokens');
        const filePath = path.join(dirPath, 'token-' + name + '.json');
    
        fs.mkdir(dirPath, { recursive: true }, (err) => {
            if (err) {
              console.error('Error creating directory:', err);
              return;
            }
          
            fs.writeFile(filePath, data, (err) => {
              if (err) {
                console.error('Error writing file:', err);
              } else {
                console.log('File written successfully');
              }
            });
          });
        
        res.send({ data: 'Token almacenado',status:400 });
        
    }catch(error){
        console.log(error);
    
        res.send({ data: 'Error al guardar token',status:404 });
     }
}; 

UserController.saveTokenDB = async (req, res) => {

    let tokenbrowser = req.body.token;

    let fecha_actual=format(new Date(), 'yyyy-MM-dd');
     // Crear y guardar un documento
    const nuevoUsuario = new UserModel({
        endpoint:tokenbrowser.endpoint,
        expirationTime:tokenbrowser.expirationTime,
        keys:tokenbrowser.keys,
        registered:fecha_actual
    });
    
  nuevoUsuario.save()
    .then((usuarioGuardado) => {
      console.log('Token guardado');
      res.send({ data: 'Token guardado exitosamente',status:404 });
    })
    .catch((error) => {
      console.error('Error al guardar el token:', error);
    });
}; 

module.exports = UserController;