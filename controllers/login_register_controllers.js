/* Variable's connection to Firebase */
const db = require('../firebase/firebase_config');

async function login(req, res) {
    try {
        const users = db.collection('clients');
        const data = await users.get();
        let flag = false
        data.forEach(doc => {
            if (doc.data().user == req.body.userName && doc.data().pass == req.body.password) {
                flag = true
                res.status(200).send({ msg: true ,type:'user'})
            }
        })
        const cafes= db.collection('cafes');
        const datos= await cafes.get();
        datos.forEach(dat=>{
            if(dat.data().cafe_username==req.body.userName && dat.data().pass == req.body.password){
                flag=true
                res.status(200).send({msg:true, type:'cafe'})
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
        const cafes=db.collection('cafes');
        const users = db.collection('clients');
        const snapshotuser=await users.where('user', '==', req.body.user).get();
        const snapshotcafe = await cafes.where('cafe_username', '==', req.body.user).get();

        if (snapshotuser.empty && snapshotcafe.empty) {
            await users.doc(req.body.user).set(req.body);
            res.status(200).send({ msg: true,info:"Registrado correctamente" });
        } else {
            res.status(200).send({msg: false, info: "El nombre de usuario ya existe"});
        }
    } catch (error) {
        res.status(500).send({msg:false,info:"Error interno"})
    }
}

async function registerSoda(req,res){
    try {
        const cafes=db.collection('cafes');
        const users = db.collection('clients');
        const snapshotuser=await users.where('user', '==', req.body.cafe_username).get();
        const snapshotcafe = await cafes.where('cafe_username', '==', req.body.cafe_username).get();
        console.log(snapshotcafe.empty)
        console.log(snapshotuser.empty)
        if (snapshotuser.empty && snapshotcafe.empty) {
            await cafes.doc(req.body.cafe_username).set(req.body);
            res.status(200).send({msg: true,info:"Registrado correctamente" });
        } else {
            res.status(200).send({msg: false, info:"El nombre de usuario ya existe"});
        }
    } catch (error) {
        res.status(500).send({msg:false,info:"Error interno"})
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
    addClient,
    registerSoda
}