/* Variable's connection to Firebase */
const db = require('../firebase/firebase_config');

async function login(req, res) {
    try {
        const users = db.collection('clients');
        const data = await users.get();
        let flag = false
        data.forEach(doc => {
            console.log(doc.data().user)
            if (doc.data().user == req.body.userName && doc.data().pass == req.body.password) {
                flag = true
                res.status(200).send({ msg: true})
            }
        })
        if (!flag)
            res.status(404).send({ msg: false })
    } catch (error) {
        return res.status(500).send(error)
    }
}

const validateClientCredentials = async (req, res) => {
    try {
        const clients = db.collection('clients');
        const snapshot = await clients.doc(req.body.user).get();

        /* validates if the username exists */
        if (!snapshot.empty) {
            // validates password
            const isValid = (req.body.pass === snapshot.data().pass) ? true : false;
            if (isValid)
                return res.status(200).send({ "valid": isValid });
            else
                return res.status(200).send({ "valid": isValid, "msg": "La contraseña es incorrecta" });
            
        }
    } catch (error) {
        return res.status(200).send({ "valid": false, "msg": "El nombre de usuario no existe" });
    }
}

/* Validates cafe's credentials for login */
const validateCafeCredentials = async (req, res) => {
    try {
        const cafes = db.collection('cafes');
        const snapshot = await cafes.doc(req.body.cafe_username).get();

        /* validates if the cafe's username exists */
        if (!snapshot.empty) {
            // validates password
            const isValid = (req.body.pass === snapshot.data().pass) ? true : false;
            if (isValid)
                return res.status(200).send({ "valid": isValid });
            else
                return res.status(200).send({ "valid": isValid, "msg": "La contraseña es incorrecta" });
        }
    } catch (error) {
        return res.status(200).send({ "valid": false, "msg": "El nombre de usuario del cafe no existe" });
    }
}

async function registerUser(req, res) {
    try {
        const users = db.collection('clients');
        const data = await users.get();
        let flag = false
        data.forEach(doc => {
            if (doc.data().usuario == req.body.usuario || doc.data().idCliente == req.body.idCliente) {
                flag = true
                res.status(404).send({ msg: false })
            }
        })
        if (!flag) {
            datos = {
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                contrasena: req.body.contrasena,
                direccionExacta: req.body.direccionExacta,
                idCliente: req.body.idCliente,
                imagenPerfil: "https://cdn.pixabay.com/photo/2012/06/19/10/32/owl-50267_960_720.jpg",
                idDistrito: req.body.idDistrito,
                usuario: req.body.usuario
            }
            const response = await db.collection('clients').doc().set(datos)
            const responsePhone = await db.collection('clientPhoneNumber').doc().set({ idCliente: req.body.idCliente, telefono: req.body.telefono })
            res.status(200).send({ msg: true })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

/* Add a new customer to customer collection */
const addClient = async (req, res) => {
    try {
        const users = db.collection('clients');
        const snapshot = await users.where('user', '==', req.body.user).get();

        // validates if the username already exists
        if (snapshot.empty) {
            // Add the new user. The  id of document is the same as the username
            await users.doc(req.body.user).set(req.body);
            return res.status(200).send({ "inserted": true });
        }
        else {
            return res.status(200).send({ "inserted": false, "msg": "El nombre de usuario ya existe!" });
        }
    } catch (error) {
        return res.status(500).send({ "inserted": false, "error": error });
    }
};

module.exports = {
    login,
    validateClientCredentials,
    validateCafeCredentials,
    registerUser,
    addClient
}