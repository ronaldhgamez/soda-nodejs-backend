/* Variable's connection to Firebase */
const db = require('../firebase/firebase_config');
// Function to generate random ids for menus
var uniqid = require('uniqid');

const orderFood = async (req, res) => {
    try {
        const data = {
            "cafe_username": req.body.cafe_username,
            "user": req.body.user, /* who makes the order */
            "state": req.body.state, /* pending, delivered or preparing */
            "datetime": req.body.datetime,
            "total": req.body.total // total to pay
        };
        const id_order = uniqid(); // Generates unique id
        await db.collection('orders').doc(id_order).create(data);
        return res.status(200).send({ "ordered": true, "id_order": id_order });
    } catch (error) {
        return res.status(500).send({ "ordered": false, "error": error });
    }
};

async function getCafesOrders(req, res) {
    try {
        const snapshot = await db.collection('orders').where('cafe_username', '==', req.body.cafe_username).get();
        var orders = [];

        snapshot.forEach(doc => {
            var data = doc.data();
            data.id_order = doc.id;
            orders.push(data);
        })
        
        for await (let obj of orders) {
            const user = obj.user;
            const user_data = await (await db.collection('clients').doc(user).get()).data();
            console.log(user_data);
            var info = {
                "name": user_data.name,
                "lastname": user_data.lastname,
                "exact_direction": user_data.exact_direction
            };
            obj.user_data = info;
        }
         
        return res.status(200).send(orders);
    } catch (error) {
        console.log(error)
        return res.status(500).send([]);
    }
}

async function updateOrderState(req, res) {
    try {
        await db.collection('orders').doc(req.body.id).update({ "state": req.body.state });
        return res.status(200).send({ "updated": true });
    } catch (error) {
        return res.status(500).send({ "updated": false, "error": error }); /* 500: internal error */
    }
}

const insertOrderProduct = async (req, res) => {
    try {
        const data = {
            "id_order": req.body.id_order,
            "id_product": req.body.id_product,
            "amount": req.body.amount // total orders of a single product
        };
        await db.collection('order_product').doc().create(data);
        return res.status(200).send({ "inserted": true });
    } catch (error) {
        return res.status(500).send({ "inserted": false, "error": error });
    }
};

const getProductsOfOrders = async (req, res) => {
    try {
        console.log(req.body.id_order);
        // Gets all documents from order_product collection
        const snapshot = await db.collection('order_product').where('id_order', '==', req.body.id_order).get();
        var orders_prod = [];

        snapshot.forEach(doc => {
            var data = doc.data();
            data.id_order = doc.id;
            orders_prod.push(data);
        });

        for await (let obj of orders_prod) {
            const id_product = obj.id_product;
            const p_data = await (await db.collection('products').doc(id_product).get()).data();
            
            var info = {
                "name": p_data.name,
                "price": p_data.lastname,
            };
            obj.product_data = info;
        }
        // for every product gets its information
        return res.status(200).send(orders_prod);
    } catch (error) {
        console.log(error)
        return res.status(500).send([]);
    }
}

async function getProductData(id_product) {
    try {
        const producto = db.collection('products').doc(id_product);
        const snapshot = await producto.get();
        if (snapshot.exists) {
            console.log("existe producto")
            console.log(snapshot.data())
            return snapshot.data();
        }
    } catch (error) {
        return error
    }
}
async function getUserOrders(req, res) {
    try {
        const snapshot = await db.collection('orders').where('user', '==', req.body.user).get();
        var orders = [];

        snapshot.forEach(doc => {
            var data = doc.data();
            data.id_order = doc.id;
            orders.push(data);
        })
        return res.status(200).send(orders);
    } catch (error) {
        console.log(error)
        return res.status(500).send([]);
    }
}

async function getOrderData(req, res) {
    try {
        console.log(req.body.id_order)
        const order = db.collection('orders').doc(req.body.id_order);
        const doc = await order.get();
        if (doc.exists) {
            res.status(200).send({ msg: doc.data() })
        } else {
            res.status(404).send({ msg: false })
        }
    } catch (error) {
        res.status(500).send({ msg: error })
    }
}
module.exports = {
    orderFood,
    getCafesOrders,
    updateOrderState,
    getUserOrders,
    getOrderData,
    getProductsOfOrders,
    getProductData,
    insertOrderProduct
}