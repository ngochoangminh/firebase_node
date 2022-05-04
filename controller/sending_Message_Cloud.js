var serviceAccount = require("/home/aht/work/ohio_chat/back_node/ohio.json");
const admin = require('firebase-admin');
const functions = require('firebase-functions');
require('dotenv').config();
// token of client
var SERVER_KEY='ct3F81QjQZCne_fJ4qSDhS:APA91bG44FUFYX5sxvAC2rUg-xMU9IY_s0nuKanepBSDpGfR3IB1h5amgosgmzBbSojqJS_e-d5pt7_brvF8z5q8AKAlMuvNgvF6CpqLTDk-y2Z9GRwrogj4ENVemlPew7RiJ4Z-noIM';
// var SENDER_ID=140002509211;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ohio-chat-app-default-rtdb.asia-southeast1.firebasedatabase.app",
});
// const db = admin.firestore();

// sending cloud message
var payload = {
    // data: {
    //     title: "This is a Notification hahahaaha",
    //     body: "This is the body of the notification message. Time: " + String(Date.now())
    // },
    notification: {
        title: "This is a Notification hahahaaha",
        header: 'header',
        body: "This is the body of the notification message. Time: " + String(Date.now())
    }

  }
console.log(payload)
var option = {
    priority: "high",
    timeToLive: 60 * 60 *24
}


admin.messaging().sendToDevice(SERVER_KEY, payload, option)
    .then(
        function(response){console.log('Successfully sent message:', response);}
    ).catch(
        function(err){console.log('Error sending message:', err);}
    );


// exports.sendNotificationToTopic = functions.firestore.document('').onWrite(async (event) => {
//     //let docID = event.after.id;
//     let title = event.after.get('title');
//     let content = event.after.get('content');
//     var message = {
//         notification: {
//             title: title,
//             body: content,
//         },
//         topic: 'namelesscoder',
//     };
  
//     let response = await admin.messaging().send(message);
//     console.log(response);
// });
  
// exports.sendNotificationToFCMToken = functions.firestore.document('messages/{mUid}').onWrite(async (event) => {
//     const uid = event.after.get('userUid');
//     const title = event.after.get('title');
//     const content = event.after.get('content');
//     let userDoc = await admin.firestore().doc(`users/${uid}`).get();
//     let fcmToken = userDoc.get('fcm');
  
//     var message = {
//         notification: {
//             title: title,
//             body: content,
//         },
//         token: fcmToken,
//     }
  
//     let response = await admin.messaging().send(message);
//     console.log(response);
// });