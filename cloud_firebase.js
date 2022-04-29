var serviceAccount = require("./ohio-chat-app-firebase-adminsdk-ipri1-cc309fa2e0.json");
const admin = require('firebase-admin');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

initializeApp(
  {credential: cert(serviceAccount),}
);

const db = getFirestore();
// const dbs = admin.getFirestore();
// const msg = db.collection('users').doc('5CTqNn3sHVZrbk4yr5nU1IdaHLk1');
// msg.(doc => {
//   console.log(doc.id, '=>', doc.data());
// });
// console.log(msg)


module.exports=db;