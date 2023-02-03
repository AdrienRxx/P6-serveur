const sauces = require("../models/models_sauce.js");
const fs = require("fs");

async function createSauces(req, res) {
  const saucesObject = JSON.parse(req.body.sauces);
  delete saucesObject._id;
  delete saucesObject._userId;
  const sauces = new Sauces({
    ...saucesObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  await sauces.save().catch((error) => {
    res.status(400).json({ error });
  });

  res.status(201).json({ message: "Objet enregistré !" });
}

async function modifySauces(req, res, next) {
  let saucesObject;

  if (req.file)
    saucesObject = {
      ...JSON.parse(req.body.thing),
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    };
  else saucesObject = { ...req.body };

  delete saucesObject._userId;
  Sauces.findOne({ _id: req.params.id })
    .then((thing) => {
      if (thing.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        Sauces.updateOne(
          { _id: req.params.id },
          { ...saucesObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Objet modifié!" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
}

async function deleteSauces(req, res, next) {
  Sauces.findOne({ _id: req.params.id })
    .then((thing) => {
      if (thing.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = thing.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauces.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Objet supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
}

async function getOneSauces(req, res, next) {
  sauces
    .findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
}

async function getAllSauces(req, res, next) {
  sauces
    .find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
}

module.exports = {
  createSauces,
  modifySauces,
  deleteSauces,
  getOneSauces,
  getAllSauces,
};
