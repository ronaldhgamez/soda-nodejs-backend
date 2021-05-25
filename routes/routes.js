const { Router } = require('express');
const router = Router();

const customers = require('../controllers/customers');
const restaurant = require('../controllers/restaurant');


////////////////////////////////////////////////////////////////////////
////////////////////////// Customer's routes ///////////////////////////
////////////////////////////////////////////////////////////////////////

router.get('/api/getCustomers', customers.getCustomers);
router.post('/api/addCustomer', customers.addCustomer);
router.delete('/api/deleteCustomer', customers.deleteCustomer);

////////////////////////////////////////////////////////////////////////
///////////////////////// Restaurant's routes //////////////////////////
////////////////////////////////////////////////////////////////////////

//router.get('/api/', restaurant.);
//router.post('/api/',restaurant.);


// Default route.
router.get('/', (req, res) => {
    res.send({ "text": 'Server is running!' });
});

// Export routes.
module.exports = router;