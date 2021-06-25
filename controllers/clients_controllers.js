/* Variable's connection to Firebase */
const db = require('../firebase/firebase_config');

async function getClientData(req, res) {
    console.log("getblientdata")
    console.log(req.body.idUser)
    try {
        const clientsRef = db.collection('clients');
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
        const clientsRef = db.collection('clients');
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
            await db.collection('clients').doc(idDoc).update(object)
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
    getClientData,
    getClientPhone,
    updateUserInfo
}