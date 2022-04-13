const express = require('express');
const Controller = require('../Controllers/register');


//Router initialisation
const router = express.Router();

//Routes
router.get('/api/login',Controller.login);
router.get('/api/checkPan',Controller.checkPanCard);
router.post('/api/register',Controller.register);
router.post('/api/updatePassword',Controller.updatePassword);
router.get('/api/viewAccounts',Controller.viewAccounts);
router.get('/api/customerInfo',Controller.customerInfo);
router.get('/api/viewTransactions',Controller.viewTransanctions);
module.exports = router;