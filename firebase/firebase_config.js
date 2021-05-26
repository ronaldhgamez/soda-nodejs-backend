var admin = require("firebase-admin");

var serviceAccount = require("./sodas-db-nodejs-firebase-adminsdk-fukds-90c7ef3db0.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sodas-db-nodejs-default-rtdb.firebaseio.com"
});
const db = admin.firestore();

module.exports = db;