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
        return res.status(500).send(error)
    }
}

async function getClientData(req, res) {
    console.log("getblientdata")
    console.log(req.body.idUser)
    try {
        const clientsRef = db.collection('client');
        const snapshot = await clientsRef.where('idCliente', '==', parseInt(req.body.idUser)).get();

        /* validates if the username already exists */
        if (snapshot.empty) {
            return res.status(404).send({ msg: false })
        }
        else {
            snapshot.forEach(doc => {
                console.log(doc.data())
                return res.status(200).send({ msg: doc.data() })
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
        const snapshot = await clientsRef.where('idCliente', '==', parseInt(req.body.idUser)).get();

        /* validates if the username already exists */
        if (snapshot.empty) {
            console.log("no ha encontrado el telefono")
            return res.status(404).send({ msg: false })
        }
        else {
            console.log("Se encontró el telefono")
            snapshot.forEach(doc => {
                return res.status(200).send({ msg: doc.data() })
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}
async function updateUserInfo(req, res) {
    try {
        const clientsRef = db.collection('client');
        const snapshot = await clientsRef.where('idCliente', '==', parseInt(req.body.userId)).get();
        let idDoc = null
        snapshot.forEach(a => {
            idDoc = a.id
        })
        const object = {
            "nombre": req.body.nombre,
            "apellidos": req.body.apellidos,
            "contrasena": req.body.contrasena,
            "direccionExacta": req.body.direccionExacta,
            "idCliente": req.body.userId,
            "idDistrito": req.body.idDistrito,
            "imagenPerfil": req.body.imagenPerfil,
            "usuario": req.body.usuario
        }
        console.log(idDoc)
        console.log(req.body)
        if (idDoc) {
            await db.collection('client').doc(idDoc).update(object)
        } else {
            return res.status(500).send({ msg: false })
        }

        //actualizar telefono
        const PhoneRef = db.collection('clientPhoneNumber');
        const snapshotPhone = await PhoneRef.where('idCliente', '==', parseInt(req.body.userId)).get();
        let idDocPhone = null
        snapshotPhone.forEach(b => {
            idDocPhone = b.id
        })
        const objectPhone = {
            "idCliente": req.body.userId,
            "telefono": req.body.telefono
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
    addCustomer,
    getSodas,
    getClientData,
    getClientPhone,
    updateUserInfo
}