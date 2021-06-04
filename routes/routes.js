const { Router } = require('express');
const router = Router();

const customers = require('../controllers/customers');
const restaurant = require('../controllers/restaurant');
const sodas = require('../controllers/sodas');


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


// Default route.
router.get('/', (req, res) => {
    res.send({ "text": 'Server is running!' });
});

// Export routes.
module.exports = router;