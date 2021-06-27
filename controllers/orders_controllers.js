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
        // Gets all documents from order_product collection

        // for every product gets its information
        var orders_prod = [];
        return res.status(200).send(orders_prod);
    } catch (error) {
        console.log(error)
        return res.status(500).send([]);
    }
}

module.exports = {
    orderFood,
    getCafesOrders,
    updateOrderState
}