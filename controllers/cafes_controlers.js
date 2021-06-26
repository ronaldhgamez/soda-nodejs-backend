/* Variable's connection to Firebase */
const db = require('../firebase/firebase_config');
// Function to generate random ids for menus
var uniqid = require('uniqid');

/* Add a new cafe to cafes collection */
const addCafe = async (req, res) => {
    try {
        const cafes = db.collection('cafes');
        const snapshot = await cafes.doc(req.body.cafe_username).get();

        /* validates if the cafe's username already exists */
        if (!snapshot.empty) {
            /* Add a new cafe. The id of document is the same as the username */
            await cafes.doc(req.body.cafe_username).create(req.body);
            return res.status(200).send({ "inserted": true });
        }
        else
            return res.status(200).send({ "inserted": false, "msg": "cafe username already exist." });
    } catch (error) {
        return res.status(500).send({ "inserted": false, "error": error }); /* 500: internal error */
    }
}

const updateCafe = async (req, res) => {
    try {
        await db.collection('cafes').doc(req.body.cafe_username).update(req.body);
        return res.status(200).send({ "updated": true });
    } catch (error) {
        return res.status(500).send({ "updated": false, "error": error }); /* 500: internal error */
    }
}

const getCafeData = async (req, res) => {
    try {
        const reg = await db.collection('cafes').doc(req.body.cafe_username).get();
        const response = reg.data();
        return (response != undefined) ? res.status(200).send(response) : res.status(200).send({});
    } catch (error) {
        return res.status(500).send({ "error": error }); /* 500: internal error */
    }

}

async function getSodas(req, res) {
    try {
        const data = await db.collection('cafes').get();
        var allCafes = []
        data.forEach(doc => {
            var cafe = doc.data();
            cafe.cafe_username = doc.id;
            allCafes.push(cafe);
        })
        res.status(200).send({ 'sodas': allCafes })
    } catch (error) {
        return res.status(500).send(error)
    }
}

/* Add the new menu to the cafes. */
const addMenu = async (req, res) => {
    try {
        const body = {
            "cafe_username": req.body.cafe_username,
            "description": req.body.description
        };
        const id_menu = uniqid(); // Generates unique id
        await db.collection('menus').doc(id_menu).create(body);
        return res.status(200).send({ "inserted": true, "id_menu": id_menu });
    } catch (error) {
        return res.status(500).send({ "inserted": false, "error": error }); /* 500: internal error */
    }
};

/* Add a new product to menu collection */
const addProductToMenu = async (req, res) => {
    try {
        const snapshot = await db.collection('menus').doc(req.body.id_menu).get();
        const response = snapshot.data();

        /* validates if the menu already exists */
        if (response !== undefined) {
            /* Add the new product to the menu */
            await db.collection('products').doc().set(req.body);
            return res.status(200).send({ "inserted": true });
        }
        else
            return res.status(200).send({ "inserted": false, "mgs": "id_menu does not exist." });
    } catch (error) {
        return res.status(500).send({ "inserted": false, "error": error }); /* 500: internal error */
    }
};


const getCafeMenus = async (req, res) => {
    try {
        const menus = db.collection('menus');
        const snapshot = await menus.where('cafe_username', '==', req.body.cafe_username).get();

        var response = [];
        snapshot.forEach(m => {
            var data = m.data();
            data.id = m.id;
            response.push(data);
        });
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send([]);
    }
}

const mi = async cafe_username => {

}

module.exports = {
    addCafe,
    updateCafe,
    getCafeData,
    getSodas,
    addMenu,
    addProductToMenu,
    getCafeMenus
}