var serviceAccount = require("./ohio.json");
const admin = require('firebase-admin');
require('dotenv').config();
console.log(serviceAccount)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ohio-chat-app-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.firestore();

// const list_Converstation = db.collection('messages').listDocuments();
// list_Converstation.then(doc => {
//   doc.forEach(d => {
//     console.log(d.id)
//   })
// });

// const msg = db.collection('users').get();
// msg.then(doc => { 
//   doc.docs.forEach(d => {
//     console.log(d.data());
//   }); 
// });

module.exports = db;