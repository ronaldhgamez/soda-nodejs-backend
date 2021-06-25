const { Router } = require('express');
const router = Router();

const customers = require('../controllers/customers');
const restaurant = require('../controllers/restaurant');
const sodas = require('../controllers/soda');
const createMenu = require('../controllers/createMenu');
const loginRegister= require('../controllers/loginRegister')
const orders = require('../controllers/Orders')

////////////////////////////////////////////////////////////////////////
///////////////////// Login and Register's routes //////////////////////
router.post('/api/login',loginRegister.login);
router.post('/api/registerUser',loginRegister.registerUser);
router.post('/api/registerSoda',loginRegister.registerSoda);

////////////////////////////////////////////////////////////////////////
////////////////////////// Customer's routes ///////////////////////////
router.post('/api/addCustomer', customers.addCustomer);
router.get('/api/getSodas', customers.getSodas);
router.post('/api/getClientData',customers.getClientData);
router.post('/api/getClientPhone',customers.getClientPhone);
router.post('/api/updateUserInfo',customers.updateUserInfo);

////////////////////////////////////////////////////////////////////////
///////////////////////// Sodas's routes ///////////////////////////////
router.post('/api/modifySoda', sodas.modifySodas);

////////////////////////////////////////////////////////////////////////
///////////////////////// CreateMenu's routes //////////////////////////
router.post('/api/addProduct', createMenu.addProduct);
router.post('/api/addMenu', createMenu.addMenu);

////////////////////////////////////////////////////////////////////////
//////////////////////////// Orders routes /////////////////////////////
router.post('/api/orderFood', orders.orderFood);
router.post('/api/getCafesOrders', orders.getCafesOrders);
router.post('/api/updateOrderState', orders.updateOrderState);

//Default route
router.get('/', (req, res) => {
    res.status(200).send('server running successfully!');
});

// Export routes.
module.exports = router;
