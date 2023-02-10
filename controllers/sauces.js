const Sauces = require("../models/models_sauce.js");

const fs = require("fs");

async function createSauces(req, res) {
  const saucesObject = JSON.parse(req.body.sauce);
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

  console.log(req.file);
  if (req.file)
    saucesObject = {
      ...JSON.parse(req.body.sauce),
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
  Sauces.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
}

async function getAllSauces(req, res, next) {
  Sauces.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
}

async function likeDislikeSauce(req, res, next) {
  let like = req.body.like;
  let userId = req.body.userId;
  let sauceId = req.params.id;

  //Une expression à comparer avec chacune des case
  switch (like) {
    //Les instructions à exécuter lorsque l'expression correspond au cas présenté pour cette case
    case 1:
      await Sauces.updateOne(
        { _id: sauceId },
        { $push: { usersLiked: userId }, $inc: { likes: +1 } }
      ).catch((error) => res.status(400).json({ error }));
      res.status(200).json({ message: `J'aime` });

      break;

    case 0:
      //Les instructions à exécuter lorsque l'expression correspond au cas présenté pour cette case
      const sauce = await Sauces.findOne({ _id: sauceId }).catch((error) =>
        res.status(404).json({ error })
      );

      if (sauce.usersLiked.includes(userId)) {
        await Sauces.updateOne(
          { _id: sauceId },
          { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
        ).catch((error) => res.status(400).json({ error }));
        res.status(200).json({ message: `Neutre` });
      }
      if (sauce.usersDisliked.includes(userId)) {
        await Sauces.updateOne(
          { _id: sauceId },
          { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
        ).catch((error) => res.status(400).json({ error }));
        res.status(200).json({ message: `Neutre` });
      }

      break;

    case -1:
      //Les instructions à exécuter lorsque l'expression correspond au cas présenté pour cette case
      await Sauces.updateOne(
        { _id: sauceId },
        { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } }
      ).catch((error) => res.status(400).json({ error }));
      res.status(200).json({ message: `Je n'aime pas` });

      break;

    default:
      //Les instructions à exécuter si l'expression ne correspond à aucun cas de figure précédemment décrit.
      console.log(error);
  }
}

module.exports = {
  createSauces,
  modifySauces,
  deleteSauces,
  getOneSauces,
  getAllSauces,
  likeDislikeSauce,
};
