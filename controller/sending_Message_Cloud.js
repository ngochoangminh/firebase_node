var serviceAccount = require("/home/aht/work/ohio_chat/back_node/ohio.json");
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const cron = require('node-cron');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ohio-chat-app-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = admin.firestore();
cron.schedule('*/10 * * * * *', function() {
    // sending cloud message
    const list_Converstation = db.collection('messages').listDocuments();
    list_Converstation.then(docs =>{
        docs.forEach(doc => {
            const list_sub_docs = db.collection('messages').doc(doc.id).collection(doc.id).where('isSeen','==',false).get();
            list_sub_docs.then(sd => {
                sd.forEach(d => {
                    // Check message time send within 60000 mili seccond (1min)               
                    if ((d.data()['timestamp']) > (Date.now()-10000)) {
                        var sender = db.collection('users').where('id','==',d.data()['idFrom']).get();
                        sender.then(recs=>{recs.forEach( r => {
                            sender_name = r.data()['displayName'];
                            var receiver = db.collection('users').where('id','==',d.data()['idTo']).get();
                            receiver.then(recs=>{recs.forEach( r => {
                                device_token = r.data()['deviceToken'];
                                var payload = {
                                    notification: {
                                        title: sender_name,
                                        header: 'header',
                                        body: String(d.data()['content']),
                                    }
                                }
                                var option = {
                                    priority: "high",
                                    timeToLive: 60 * 60 *24,
                                }
                                // console.log(payload)
                                admin.messaging().sendToDevice(device_token, payload, option)
                                .then(
                                    function(response){console.log('Sending Successfully!', response.results, payload['notification']);}
                                ).catch(
                                    function(err){console.log('Error sending message:', err);}
                                );
                                })
                            })
                            })
                            
                        })                  
                    } else {
                        console.log('No found new message.');
                    }
                });
            });
        });
    });
});