/* Variable's connection to Firebase */
const db = require('../firebase/firebase_config');

/* Add a new customer to customer collection */
const addCustomer = async (req, res) => {
    try {
        const users = db.collection('customers');
        const snapshot = await users.where('user', '==', req.body.user).get();

        /* validates if the username already exists */
        if (snapshot.empty) {
            /* Add the new user. The  id of document is the same as the username */
            await users.doc(req.body.user).set(req.body);
            return res.status(200).send({ "inserted": true });
        }
        else { // matching id of document
            return res.status(200).send({ "inserted": false });
        }
    } catch (error) {
        return res.status(500).send(error); /* 500: internal error */
    }
};

async function getSodas(req, res) {
    try {
        const sodas = db.collection('cafes');
        const data = await sodas.get();
        var allCafes = []
        data.forEach(doc => {
            allCafes.push(doc.data())
        })
        res.status(200).send({ 'sodas': allCafes })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

module.exports = {
    addCustomer,
    getSodas
}