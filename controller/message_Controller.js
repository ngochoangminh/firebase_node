var db = require('../cloud_firebase')


const messages_collection = db.collection('messages');

var doc_0 = 'yqKUIi5i3MNy9IoWxqtzEXf7Zyz2 - VD7i4PpHBLfOSMv4lR3wlhvtpXw1';
var sub_coll_1 = 'yqKUIi5i3MNy9IoWxqtzEXf7Zyz2 - VD7i4PpHBLfOSMv4lR3wlhvtpXw1'
const messasge_controller = {
    getall: async (req, res) => {
        try {
            var all_doc = await messages_collection.get();
            const result = all_doc.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            if (!all_doc) {
                return res.status(400).json({
                    msg: 'get all message false',
                });
            } else {
                return res.status(200).json({
                    result
                });
            }
        } catch (err) {
            return res.status(400).json({
                msg: err.message,
            });
        }
    },
    get_once: async (req, res) => {
        try {
            var all_doc = await messages_collection.doc(doc_0).collection(sub_coll_1).get()
            const result = all_doc.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            if (!all_doc) {
                return res.status(400).json({
                    msg: 'get all message false',
                });
            } else {
                return res.status(200).json({
                    result
                });
            }
        } catch (err) {
            return res.status(400).json({
                msg: err.message,
            });
        }
    },
    get_: async (req, res) => {
        try {
            
        } catch (err) {
            return res.status(400).json({
                msg: err.message,
            });
        }
    },
}

module.exports = messasge_controller;