const config = require('./config/config.js');
const routes = require('./routes/routes.js');
const cors = require('cors');
const webpush = require('web-push');

const express = require('express');
const app = express();

const mongoose = require('mongoose');

//conexion a mongo
mongoose.connect('mongodb+srv://doryan:admin@cluster0.gwc5u9s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}).then(() => {
    console.log('Conexion a mongo DB exitosa');
}).catch(error => {
    console.error('Conexión fallida al servidor DB: '+config.DBMONGO,error);
});

// Configurar middleware para analizar el cuerpo de la solicitud
app.use(express.json()); // para aplicaciones con Content-Type: application/json
app.use(express.urlencoded({ extended: true })); // para aplicaciones con Content-Type: application/x-www-form-urlencoded
app.use(cors());// Configurar CORS

app.use('/', routes);

app.listen(config.PORT, config.HOST, function () {
  console.log(`App listening on http://${config.HOST}:${config.PORT}`);
});