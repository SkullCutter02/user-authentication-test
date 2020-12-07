const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    jwt.sign({ user: { email, password } }, "secretkey", (err, token) => {
      res.json({ token });
    });
  } else {
    return res.status(500).json({ msg: "Must include email or password" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
