const sauces = require("../models/models_sauce.js");

exports.createSauces = (req, res, next) => {
  delete req.body._id;
  const sauces = new Sauces({
    ...req.body,
  });
  sauces
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifySauces = (req, res, next) => {
  sauces
    .updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauces = (req, res, next) => {
  sauces
    .deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneSauces = (req, res, next) => {
  sauces
    .findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  sauces
    .find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
};
