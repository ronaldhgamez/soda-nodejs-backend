const db = require('../firebase/firebase_config');

async function login(req, res) {
    try {
        const users = db.collection('client');
        const data = await users.get();
        let flag = false
        data.forEach(doc => {
            console.log(doc.data().usuario)
            if (doc.data().usuario == req.body.userName && doc.data().contrasena == req.body.password) {
                flag = true
                res.status(200).send({ msg: doc.data().idCliente })
            }
        })
        if (!flag)
            res.status(404).send({ msg: false })
    } catch (error) {
        return res.status(500).send(error)
    }
}

async function registerUser(req, res) {
    try {
        const users = db.collection('client');
        const data = await users.get();
        let flag = false
        data.forEach(doc => {
            if (doc.data().usuario == req.body.usuario || doc.data().idCliente == req.body.idCliente) {
                flag = true
                res.status(404).send({ msg: false })
            }
        })
        if(!flag){
            datos={
                nombre:req.body.nombre,
                apellidos:req.body.apellidos,
                contrasena:req.body.contrasena,
                direccionExacta:req.body.direccionExacta,
                idCliente:req.body.idCliente,
                imagenPerfil:"https://cdn.pixabay.com/photo/2012/06/19/10/32/owl-50267_960_720.jpg",
                idDistrito:req.body.idDistrito,
                usuario:req.body.usuario
            }
            const response=await db.collection('client').doc().set(datos)
            const responsePhone=await db.collection('clientPhoneNumber').doc().set({idCliente:req.body.idCliente,telefono:req.body.telefono})
            res.status(200).send({msg:true})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    login,
    registerUser
}