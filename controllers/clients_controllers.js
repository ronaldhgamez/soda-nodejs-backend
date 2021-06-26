/* Variable's connection to Firebase */
const db = require('../firebase/firebase_config');

async function getClientData(req, res) {
    console.log("getblientdata")
    console.log(req.body.userName)
    try {
        const clientsRef = db.collection('clients');
        const snapshot = await clientsRef.where('user', '==', req.body.userName).get();

        /* validates if the username already exists */
        if (snapshot.empty) {
            return res.status(404).send({ msg: false })
        }
        else {
            snapshot.forEach(doc => {
                console.log(doc.data())
                return res.status(200).send({ msg: doc.data()})
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

async function getClientPhone(req, res) {
    try {
        const clientsRef = db.collection('clientPhoneNumber');
        const snapshot = await clientsRef.where('userName', '==', req.body.userName).get();

        /* validates if the username already exists */
        if (snapshot.empty) {
            return res.status(404).send({ msg: false })
        }
        else {
            snapshot.forEach(doc => {
                return res.status(200).send({ msg: doc.data() })
            })
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}
async function updateUserInfo(req, res) {
    try {
        //console.log(req.body)
        const clientsRef = db.collection('clients');
        const snapshot = await clientsRef.where('user', '==', req.body.user).get();
        let idDoc = null
        snapshot.forEach(a => {
            idDoc = a.id
        })
        const object = {
            "name": req.body.name,
            "lastname": req.body.lastname,
            "pass": req.body.pass,
            "exact_direction": req.body.exact_direction,
            "district": req.body.district,
            "img_ulr": req.body.img_ulr,
            "user": req.body.user
        }
        console.log(idDoc)
        console.log(req.body)
        if (idDoc) {
            await db.collection('clients').doc(idDoc).update(object)
        } else {
            return res.status(500).send({ msg: false })
        }

        //actualizar telefono
        const PhoneRef = db.collection('clientPhoneNumber');
        const snapshotPhone = await PhoneRef.where('userName', '==', req.body.user).get();
        let idDocPhone = null
        snapshotPhone.forEach(b => {
            idDocPhone = b.id
        })
        const objectPhone = {
            "userName": req.body.user,
            "phoneNumber": req.body.phoneNumber
        }
        if (PhoneRef) {
            await db.collection('clientPhoneNumber').doc(idDocPhone).update(objectPhone)
        } else {
            return res.status(500).send({ msg: false })
        }
        return res.status(200).send({ msg: true })
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}
module.exports = {
    getClientData,
    getClientPhone,
    updateUserInfo
}