var db = require('../cloud_firebase')


const user_collection = db.collection('users');
const user_controller = {
    getall: async (req, res) => {
        try {
            var all_doc = await user_collection.get();
            const result = all_doc.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            if (!all_doc) {
                return res.status(400).json({
                    msg: 'get all message false',
                });
            } else {
                console.log(Date.now(), '\t Success!')
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

module.exports = user_controller;