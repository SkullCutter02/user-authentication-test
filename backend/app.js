const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { sequelize, User } = require("./models");
const { hashPassword, comparePassword } = require("./hash");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const hash = await hashPassword(password);
  const user = await User.create({ email, hash });
  const id = user.id;

  if (email && password) {
    jwt.sign({ id }, "secretkey", (err, token) => {
      return res.json({ token });
    });
  } else {
    return res.status(402).json({ msg: "Must include email or password" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email: email },
  });

  if (user) {
    const isValidPass = await comparePassword(password, user.hash);

    if (isValidPass) {
      jwt.sign({ id: user.id }, "secretkey", (err, token) => {
        return res.json({ token });
      });
    } else {
      return res.status(403).json({ msg: "Wrong password" });
    }
  } else {
    return res.status(403).json({ msg: "Email not found" });
  }
});

app.post("/profile/me", async (req, res) => {
  const { payload } = req.body;

  if (payload) {
    const user = await User.findOne({
      where: { id: payload.id },
    });

    if (user) {
      return res.json({ email: user.email });
    } else {
      return res.status(403).json({ msg: "Can't find user" });
    }
  } else {
    return res.status(500).json({ msg: "Please include a JWT" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server started on ${PORT}`);
  await sequelize.authenticate();
  console.log("Database Connected!");
});
