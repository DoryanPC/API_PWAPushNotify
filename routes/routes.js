const express = require('express');
const router = express.Router();

const NotifyController = require('../controllers/NotificationController.js');

const UserController = require('../controllers/UserController.js');

router.get('/',()=>{
return '<h1>API CORRIENDO</h1>'
});

router.post('/api/saveNotification',NotifyController.createNotification);

router.post('/api/saveToken',UserController.saveTokenDB);

router.get('/api/getNotifications',NotifyController.getNotificationActive);

router.post('/api/send',NotifyController.sendNotification);

module.exports = router;