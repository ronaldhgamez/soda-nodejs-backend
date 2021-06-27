/* Variable's connection to Firebase */
const db = require('../firebase/firebase_config');

async function getClientData(req, res) {
    try {
        const clientsRef = db.collection('clients');
        const snapshot = await clientsRef.where('user', '==', req.body.userName).get();

        /* validates if the username already exists */
        if (snapshot.empty) {
            return res.status(404).send({ msg: false })
        }
        else {
            snapshot.forEach(doc => {
                return res.status(200).send({ msg: doc.data()})
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

async function updateUser(req, res) {
    try {
        const clientsRef = db.collection('clients');
        const snapshot = await clientsRef.where('user', '==', req.body.user).get();
        if (!snapshot.empty) {
            await db.collection('clients').doc(req.body.user).update(req.body)
            res.status(500).send({msg:true});
        } else {
            res.status(500).send({ msg: false });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}
module.exports = {
    getClientData,
    updateUser
}