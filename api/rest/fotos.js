var express = require("express");
var router = express.Router();

const { Sequelize, Op } = require("sequelize");
const Foto = require("../models").foto;
const Etiqueta = require("../models").etiqueta;

const path = "public/images/";

const multer = require("multer");
const storage = multer.diskStorage({
  destination: path,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/findAll/json", function (req, res, next) {
  Foto.findAll({
    attributes: { exclude: ["updatedAt", "createdAt"] },
    include: [
      {
        model: Etiqueta,
        attributes: ["texto"],
        through: { attributes: [] },
      },
    ],
  })
    .then((fotos) => {
      res.json(fotos);
    })
    .catch((error) => res.status(400).send(error));
});

router.get("/findById/:id/json", function (req, res, next) {
  let id = parseInt(req.params.id);
  console.log(id);

  Foto.findAll({
    attributes: { exclude: ["updatedAt", "createdAt"] },
    include: [
      {
        model: Etiqueta,
        attributes: ["texto"],
        through: { attributes: [] },
      },
    ],
    where: {
      [Op.and]: [{ id: id }],
    },
  })
    .then((fotos) => {
      res.json(fotos);
    })
    .catch((error) => res.status(400).send(error));
});

router.post("/save", upload.single("archivo"), function (req, res, next) {
  console.log(req.body);
  let { titulo, descripcion, calificacion, ruta } = req.body;

  Foto.create({
    titulo: titulo,
    descripcion: descripcion,
    calificacion: parseFloat(calificacion),
    ruta: path + ruta,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
    .then((foto) => {
      res.json(foto);
    })
    .catch((error) => res.status(400).send(error));
});

router.put("/update", function (req, res, next) {
  let { id, title, description, rate, ruta } = req.body;
  console.log(id, title, description, rate, ruta);

  Foto.update(
    {
      titulo: title,
      descripcion: description,
      calificacion: parseFloat(rate),
      ruta: path + ruta,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      where: {
        id: parseInt(id),
      },
    }
  )
    .then((respuesta) => {
      console.log(respuesta);
      res.json(respuesta);
    })
    .catch((error) => res.status(200).send(error));
});

router.delete("/delete/:id", function (req, res, next) {
  let id = parseInt(req.params.id);

  Foto.destroy({
    where: {
      id: id,
    },
  })
    .then((respuesta) => {
      res.json(respuesta);
    })
    .catch((error) => res.status(400).send(error));
});

module.exports = router;
