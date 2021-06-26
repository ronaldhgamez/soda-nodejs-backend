const { Router } = require('express');
const router = Router();

const clients_controllers = require('../controllers/clients_controllers');
const cafes_controlers = require('../controllers/cafes_controlers');
const login_register_controllers = require('../controllers/login_register_controllers')
const orders_controllers = require('../controllers/orders_controllers')

////////////////////////////////////////////////////////////////////////
///////////////////// Login and Register's routes //////////////////////
router.post('/api/login', login_register_controllers.login)
router.post('/api/validateCafeCredentials', login_register_controllers.validateCafeCredentials);
router.post('/api/validateClientCredentials', login_register_controllers.validateClientCredentials);
router.post('/api/registerUser', login_register_controllers.registerUser)
router.post('/api/addClient', login_register_controllers.addClient);

////////////////////////////////////////////////////////////////////////
////////////////////////// Customer's routes ///////////////////////////
router.post('/api/getClientData', clients_controllers.getClientData);
router.post('/api/getClientPhone', clients_controllers.getClientPhone);
router.post('/api/updateUserInfo', clients_controllers.updateUserInfo);

////////////////////////////////////////////////////////////////////////
///////////////////////// Cafes's routes ///////////////////////////////
router.post('/api/addCafe', cafes_controlers.addCafe);
router.put('/api/updateCafe', cafes_controlers.updateCafe);
router.post('/api/getCafeData', cafes_controlers.getCafeData);
router.get('/api/getSodas', cafes_controlers.getSodas);
router.post('/api/addProduct', cafes_controlers.addProductToMenu);
router.post('/api/addMenu', cafes_controlers.addMenu);
router.post('/api/getCafeMenus', cafes_controlers.getCafeMenus);
router.post('/api/getProductsMenu', cafes_controlers.getProductsMenu);

////////////////////////////////////////////////////////////////////////
//////////////////////////// Orders routes /////////////////////////////
router.post('/api/orderFood', orders_controllers.orderFood);
router.post('/api/getCafesOrders', orders_controllers.getCafesOrders);
router.post('/api/updateOrderState', orders_controllers.updateOrderState);

// Default route.
router.get('/', (req, res) => {
    res.send({ "text": 'Server is running!' });
});

//Default route
router.get('/', (req, res) => {
    res.status(200).send('server running successfully!');
});

// Export routes.
module.exports = router;
