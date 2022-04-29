const express = require("express");
const cors = require("cors");
const db = require('./cloud_firebase');
const app = express();
app.use(express.json());
app.use(cors());
const User = db.collection('users');

app.get("/index", async (req, res) => {
  const snapshot = await User.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});

app.post("/create", async (req, res) => {
  const data = req.body;
  await User.add({ data });
  res.send({ msg: "User Added" });
});


PORT=3033;
app.listen(PORT, () => console.log(`server is listening on port:http://localhost:${PORT}`));