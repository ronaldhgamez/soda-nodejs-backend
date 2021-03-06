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

/* to delete a cafe by its username */
const deleteCafe = async (req, res) => {
    try {
        await db.collection('cafes').doc(req.body.cafe_username).delete();
        return res.status(200).send({ "deleted": true });
    } catch (error) {
        return res.status(500).send({ "deleted": false, "error": error }); /* 500: internal error */
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
        const { cafe_username } = req.body;
        const snapshot = await db.collection('menus').where('cafe_username', '==', cafe_username).get();

        var response = [];
        snapshot.forEach(async m => {
            var data = m.data();
            data.id_menu = m.id;
            data.display = false;
            response.push(data);
        });

        for await (let obj of response) {

            const id_menu = obj.id_menu;
            const snapshot2 = await db.collection('products').where('id_menu', '==', id_menu).get();
            var response2 = [];
            
            snapshot2.forEach(p => {
                var data = p.data();
                data.id_product = p.id;
                data.selected = false;
                data.amount = 1;
                response2.push(data);
            });
            obj.product_list = response2;
        }
        return res.status(200).send(    response);
    } catch (error) {
        return res.status(500).send([]);
    }
}

const getProductsMenu = async (req, res) => {
    try {
        const products = db.collection('products');
        const snapshot = await products.where('id_menu', '==', req.body.id_menu).get();

        var response = [];
        snapshot.forEach(p => {
            var data = p.data();
            data.id_product = p.id;
            response.push(data);
        });
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send([]);
    }
}

/* to update menu description */
const updateMenu = async (req, res) => {
    try {
        const data = { "description": req.body.description };
        await db.collection('menus').doc(req.body.id_menu).update(data);
        return res.status(200).send({ "updated": true });
    } catch (error) {
        return res.status(500).send({ "updated": false, "error": error }); /* 500: internal error */
    }
}


module.exports = {
    addCafe,
    updateCafe,
    getCafeData,
    getSodas,
    addMenu,
    addProductToMenu,
    getCafeMenus,
    getProductsMenu,
    updateMenu,
    deleteCafe
}