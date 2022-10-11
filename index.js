const app = require("express")();

app.get("/", (req, res) => {
  res.json({ name: "Ana" }).status(200);
});

app.listen(3000);
