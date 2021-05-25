/* Variable's connection to Firebase */
const db = require('../firebase/firebase_config');


/* Returns all collection of customer on database */
const getCustomers = (req, res) => {
    db.ref('customers').once('value', (snapshot) => {
        const customers = snapshot.val();
        res.send(customers);
    });
};

/* Add a new customer to customer collection */
const addCustomer = (req, res) => {
    console.log(req.body);
    const customer = {
        "name": req.body.name,
        "lastname": req.body.lastname,
        "exact_direction": req.body.exact_direction,
        "idDistrict": req.body.idDistrict,
        "user": req.body.user,
        "pass": req.body.pass
    };
    /* push a new register into customer collection on Firebase */
    db.ref('customers').push(customer);
    res.send('customer inserted');
};

const deleteCustomer = (req, res) => {
    console.log(req.body);
    /* deletes a customer from the collection on Firebase */
    db.ref('customers/' + req.body.idCustomer).remove();
    res.send('customer deleted');
};

module.exports = {
    getCustomers,
    addCustomer,
    deleteCustomer
}