const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.messCheckNoti=functions.pubsub.schedule("* * * * *").onRun((context)=>{
  const listConverstation = db.collection("messages").listDocuments();
  listConverstation.then((docs) =>{
    docs.forEach((doc) =>{
      const listSubDocs=db.collection("messages").doc(doc.id)
          .collection(doc.id).where("isSeen", "==", false).get();
      listSubDocs.then((sd) =>{
        sd.forEach((d) =>{
          let senderName;
          let deviceToken;
          // Check message time send within 60000 milisecond
          if ((d.data()["timestamp"]) > (Date.now()-60000)) {
            const sender = db.collection("users")
                .where("id", "==", d.data()["idFrom"]).get();
            sender.then((recs)=>{
              recs.forEach( (r) => {
                senderName = r.data()["displayName"];
                const receiver = db.collection("users")
                    .where("id", "==", d.data()["idTo"]).get();
                receiver.then((recs)=>{
                  recs.forEach( (r) => {
                    deviceToken = r.data()["deviceToken"];
                    const payload = {
                      notification: {
                        title: senderName,
                        body: String(d.data()["content"]),
                      },
                    };
                    const option = {
                      priority: "high",
                      timeToLive: 60 * 60 *24,
                    };
                    admin.messaging().sendToDevice(deviceToken, payload, option)
                        .then(function(response) {
                          console.log("Successfully sending message!",
                              response.results);
                        })
                        .catch(function(err) {
                          console.log("Error sending message:", err);
                        });
                  });
                });
              });
            });
          } else {
            console.log("No found new message.");
          }
        });
      });
    });
  });
  console.log("checking message successful");
  return null;
});
