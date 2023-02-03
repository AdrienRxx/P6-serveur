const bcrypt = require("bcrypt");
const { sign } = require("../manager/jwt.js");
const { User } = require("../models/user_model.js");

async function signup(req, res) {
  const { email, password } = req.body;
  if (!email) throw new Error("Email invalid");
  if (!password) throw new Error("Password invalid");

  const hash = await bcrypt.hash(password, 10).catch((error) => {
    throw res.status(500).json({ error });
  });

  const user = new User({ email, password: hash });
  await user.save().catch((error) => {
    throw res.status(400).json({ error });
  });

  res.status(201).json({ message: "Utilisateur créé !" });
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).catch((error) => {
    throw res.status(500).json({ error });
  });
  if (!user) return res.status(401).json({ error: "Utilisateur non trouvé !" });

  const valid = await bcrypt.compare(password, user.password).catch((error) => {
    throw res.status(500).json({ error });
  });
  if (!valid)
    return res.status(401).json({ error: "Mot de passe incorrect !" });

  res.status(200).json({
    userId: user._id,
    token: sign({ userId: user._id }),
  });
}

module.exports = { login, signup };
