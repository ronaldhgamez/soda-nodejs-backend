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
router.post('/api/registerSoda',login_register_controllers.registerSoda)
router.post('/api/addClient', login_register_controllers.addClient);

////////////////////////////////////////////////////////////////////////
////////////////////////// Customer's routes ///////////////////////////
router.post('/api/getClientData', clients_controllers.getClientData);
router.post('/api/updateUser', clients_controllers.updateUser);

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
router.put('/api/updateMenu', cafes_controlers.updateMenu);
router.delete('/api/deleteCafe',  cafes_controlers.deleteCafe);

////////////////////////////////////////////////////////////////////////
//////////////////////////// Orders routes /////////////////////////////
router.post('/api/orderFood', orders_controllers.orderFood);
router.post('/api/getCafesOrders', orders_controllers.getCafesOrders);
router.post('/api/updateOrderState', orders_controllers.updateOrderState);
router.post('/api/getUserOrders',orders_controllers.getUserOrders);
router.post('/api/getOrderData',orders_controllers.getOrderData);
router.post('/api/getProductsOfOrders',orders_controllers.getProductsOfOrders);
router.post('/api/insertOrderProduct', orders_controllers.insertOrderProduct);
router.post('/api/getProductsOfOrders', orders_controllers.getProductsOfOrders);

//Default route
router.get('/', (req, res) => {
    res.status(200).send('server running successfully!');
});

// Export routes.
module.exports = router;
