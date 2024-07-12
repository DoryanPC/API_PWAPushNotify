
const { NotifyModel } = require('../mongoose/models/NotificationModel');
const webpush = require('web-push');
const UserController = require('./UserController.js');
const config = require('../config/config.js');

const NotificationController={};

const vapidKeys = {
    "publicKey":config.VPAID_PU_K,
    "privateKey": config.VPAID_PRI_K
}


NotificationController.createNotification = async (req = null, res = null) => {

    const newNotification=new NotifyModel({
      title:req.body.titulo,
      body:req.body.texto
    });
    
    let response = await newNotification.save();

    res.send(response);
};


NotificationController.getNotificationById = async (IdNotify) => {
    let notify=await NotifyModel.findById(IdNotify);
    return notify;
};

NotificationController.getNotificationActive = async (req = null, res = null) => {
    let notificaciones=await NotifyModel.find();    
    res.send({ data:notificaciones });
};


NotificationController.sendNotification = async (req, res) => {

    webpush.setVapidDetails(
        'mailto:example@yourdomain.org',
        vapidKeys.publicKey,
        vapidKeys.privateKey
    );

    let Notify=await NotificationController.getNotificationById(req.body.IdNotify);

    const payload = {
        "notification": {
            "title":Notify.title,
            "body":Notify.body,
            "vibrate": [100, 50, 100],
            "image":Notify.image,
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    }

    let UsersRegistered=await UserController.getUsers();

    UsersRegistered.forEach((credential) => {

   /* const pushSubscription = {
        endpoint: 'https://updates.push.services.mozilla.com/wpush/v2/gAAAAABmiAuCpWcA5LN0ZEpq6Ih5BKdz7gBhbcrb8wrsQdsnySggfBKGgI2PrDGAHV-1415vuaKO23cA2eRk4NamVZD7i0P0vKmGStfnFeZGjXkO3AaC6O5AuXjPWPUp2pJDENvk_wWjlZJSn0r7XS8qOsJyRQK2KRlchilBA_KP1-5LOitBYRc',
        keys: {
            auth: 'nz8F9fjTAmdpoiZCab5uBw',
            p256dh: 'BCvSlzWFFLtnX_kzWMztM6iE_qRqFe2ysL0zYGROPZmlMCVIuWiduP3EROluzflVFBCgJ-5_MySaL2ocaMlcbqc'
        }
            
    };*/
    const pushSubscription = {
        endpoint:credential.endpoint,
        keys: credential.keys
    };

    webpush.sendNotification(
        pushSubscription,
        JSON.stringify(payload))
        .then(callback => {
            console.log("Notificacion enviada");
        }).catch(err => {
            console.log('Sin respuesta: ', err);
        })



    });

    res.send({ data: 'Se envio subscribete!!' })


}; 

module.exports = NotificationController;

