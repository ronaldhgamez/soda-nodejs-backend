const { Router } = require('express');
const router = Router();

const customers = require('../controllers/customers');
const restaurant = require('../controllers/restaurant');
const sodas = require('../controllers/soda');
const createMenu = require('../controllers/createMenu');


////////////////////////////////////////////////////////////////////////
////////////////////////// Customer's routes ///////////////////////////
////////////////////////////////////////////////////////////////////////

router.post('/api/addCustomer', customers.addCustomer);
router.get('/api/getSodas', customers.getSodas);
////////////////////////////////////////////////////////////////////////
///////////////////////// Sodas's routes //////////////////////////
////////////////////////////////////////////////////////////////////////

router.post('/api/modifySoda', sodas.modifySodas);

////////////////////////////////////////////////////////////////////////
///////////////////////// CreateMenu's routes //////////////////////////
////////////////////////////////////////////////////////////////////////

router.post('/api/addProduct', createMenu.addProduct);
router.post('/api/addMenu', createMenu.addMenu);


// Default route.
router.get('/', (req, res) => {
    res.send({ "state": 'Server is running!' });
});

// Export routes.
module.exports = router;
