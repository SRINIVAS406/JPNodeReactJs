const express = require("express");
const app = express();

app.get("/node", (req, res) => {
  res.send("hello Sinu");
});

app.listen(5000, () => {
  console.log("Server running @port 5000");
});
