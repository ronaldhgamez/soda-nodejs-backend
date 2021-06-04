const { Router } = require('express');
const router = Router();

const customers = require('../controllers/customers');
const restaurant = require('../controllers/restaurant');
<<<<<<< HEAD
const sodas = require('../controllers/sodas');
=======
const createMenu = require('../controllers/createMenu');
>>>>>>> 6724b6b3032c528be92d296878fe738e5a85ab08


////////////////////////////////////////////////////////////////////////
////////////////////////// Customer's routes ///////////////////////////
////////////////////////////////////////////////////////////////////////

router.post('/api/addCustomer', customers.addCustomer);
router.get('/api/getSodas',customers.getSodas);
////////////////////////////////////////////////////////////////////////
///////////////////////// Sodas's routes //////////////////////////
////////////////////////////////////////////////////////////////////////

router.post('/api/modifySoda',sodas.modifySoda);


//router.get('/api/', restaurant.);
//router.post('/api/',restaurant.);

////////////////////////////////////////////////////////////////////////
///////////////////////// CreateMenu's routes //////////////////////////
////////////////////////////////////////////////////////////////////////

router.post('/api/addProduct', createMenu.addProduct);
router.post('/api/addMenu', createMenu.addMenu);


// Default route.
router.get('/', (req, res) => {
    res.send({ "text": 'Server is running!' });
});

// Export routes.
module.exports = router;
