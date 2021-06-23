/* Variable's connection to Firebase */
const db = require('../firebase/firebase_config');

const orderFood = async (req, res) => {
    try {
        const data = {
            "cafe": req.body.cafe,
            "client": req.body.client, /* who makes the order */
            "state": req.body.state, /* pending, delivered or preparing */
            "date": req.body.date,
            "total": req.body.total // total to pay
        };

        await db.collection('orders').doc().create(data);
        return res.status(200).send({ "ordered": true });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "ordered": false });
    }
};

async function getCafesOrders(req, res) {
    try {
        const snapshot = await db.collection('orders').where('cafe', '==', req.body.cafe).get();
        var orders = [];

        snapshot.forEach(doc => {
            var data = doc.data();
            data.id = doc.id;
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
        console.log(error);
        return res.status(500).send({ "updated": true }); /* 500: internal error */
    }
}

module.exports = {
    orderFood,
    getCafesOrders,
    updateOrderState
}