/* Variable's connection to Firebase */
const db = require('../firebase/firebase_config');

/* Add the new menu to the restaurant. Generates id by itself */
const addMenu = async (req, res) => {
    try {
        await db.collection('menu').doc().set(req.body);

        let r = "";
        const citiesRef = db.collection('menu');
        const snapshot = await citiesRef.get();
        snapshot.forEach(doc => {
            r = doc.id
        });
        return res.status(200).send({ "idInsertado": r});
    } catch (error) {
        return res.status(500).send(error); // 500: internal error
    }
};

/* Add a new product to menu collection */
const addProduct = async (req, res) => {
    try {
        const snapshot = await db.collection('menu').doc(req.body.idMenu).get();
        const response= snapshot.data();

        /* validates if the menu already exists */
        if (response !== undefined) {
            /* Add the new product. The  id of document is the same as the username */
            await db.collection('products').doc().set(req.body);
            return res.status(200).send({ "inserted": true });
        }
        else { // matching id of document
            return res.status(200).send({ "inserted": false });
        }
    } catch (error) {
        return res.status(500).send(error); /* 500: internal error */
    }
};


module.exports = {
    addProduct,
    addMenu
}