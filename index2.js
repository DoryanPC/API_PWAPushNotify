const webpush = require('web-push');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const router = express.Router();
/**
 * Settings VAPID
 */

const vapidKeys = {
    "publicKey": "BBxVIegBGDP2eo1wsx_m777_5qI5q3IvyBH5SLb54NmItBs8L0XVnIreUG1LLdedPpLnphJVvoMINxBN1eDBvmc",
    "privateKey": "dhjgipONCV9PCjY-3BImAvSp-RKGDa5ZD4FZSjpcUoM"
}

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);


const handlerResponse  = (res,data,code = 200) => {
    res.status(code).send({data});
}

const savePush = async (req,res) => {

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

}


const enviarNotificacion = (req, res) => {

    const pushSubscription = {
        endpoint: 'https://updates.push.services.mozilla.com/wpush/v2/gAAAAABmguIR9ybAPgWqWL6EtqQ0-Ct-gFvWaYIM-xQtaKyaDV0syaZas9rpMhapowb9jYUYEMG3HlTT-eKDFVF_-5PY33jU4WJssLVH4xICR5o4tc5Q9WBylSeDbylbD1wvg7kaobQnu8OtzVRZdCPO-OiJsig10U_iWSFFcjqA7CPDiQHxJO8',
        keys: {
            auth: '8Oc1vsUZuhG9ao8s9prx_g',
            p256dh: 'BB9EUpXCBcwpvxlD38v6zYhSZXUF9A_F47a5OA8aHjCWwucwn-3duJ-mgB-iMrgXeu3kyQcWJ2F6v7GsWwo66iM'
        }
    };

    const payload = {
        "notification": {
            "title": "😄😄 Saludos",
            "body": "Subscribete a mi canal de YOUTUBE",
            "vibrate": [100, 50, 100],
            "image": "https://avatars2.githubusercontent.com/u/15802366?s=460&u=ac6cc646599f2ed6c4699a74b15192a29177f85a&v=4",
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    }

    webpush.sendNotification(
        pushSubscription,
        JSON.stringify(payload))
        .then(res => {
            console.log('Enviado !!');
        }).catch(err => {
            console.log('Error', err);
        })

    res.send({ data: 'Se envio subscribete!!' })

}

app.route('/api/enviar').post(enviarNotificacion);

app.route('/api/save').post(savePush);

const httpServer = app.listen(9000, () => {
    console.log("HTTP Server running at http://localhost:" + httpServer.address().port);
});