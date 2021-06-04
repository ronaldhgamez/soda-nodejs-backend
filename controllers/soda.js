/* Variable's connection to Firebase */
const db = require('../firebase/firebase_config');

const modifySodas = async(req,res)=>
{
    try {
        await db.collection('cafes').doc(req.body.idCafe).set(req.body);
        return res.status(200).send({ "updated": true });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ "updated": false }); /* 500: internal error */
    }
}

module.exports={
    modifySodas
}