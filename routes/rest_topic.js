var express = require("express");
var router = express.Router();

/* IMPORTE El ARCHIVO CON EL NOMBRE_CLASE */
const topic = require("../models").topic;
const flashcard_topic = require("../models").flashcard_topic;
const flashcard = require("../models").flashcard;

router.get("/findAll/json", function (req, res, next) {
    /* MÉTODO ESTÁTICO findAll  */

    topic
        .findAll({
            attributes: { exclude: ["updatedAt", "createdAt"] },
        })
        .then((resultado) => {
            res.json(resultado);
        })
        .catch((error) => res.status(400).send(error));
});

router.get("/findById/:id/json", function (req, res, next) {
    let id = req.params.id;

    topic
        .findByPk(id)
        .then((instancia) => {
            if (instancia) {
                res.status(200).json(instancia);
            } else {
                res.status(404).json({
                    error: "No existe registro con el identificador " + id,
                });
            }
        })
        .catch((error) => res.status(400).send(error));
});

router.post("/save", function (req, res, next) {
    topic
        .create(req.body)
        .then((instancia) => {
            res.status(201).json(instancia);
        })
        .catch((error) => {
            res.status(500).json({ error: "Error al crear el registro" });
        });
});

router.put("/update/:id", function (req, res, next) {
    let id = req.params.id;

    topic
        .findByPk(id)
        .then((instancia) => {
            if (instancia) {
                instancia
                    .update(req.body)
                    .then((instanciaActualizada) => {
                        res.status(201).json(instanciaActualizada);
                    })
                    .catch((error) => {
                        res.status(500).json({
                            error: "Error al actualizar el registro",
                        });
                    });
            } else {
                res.status(404).json({
                    error: "No existe registro con el identificador " + id,
                });
            }
        })
        .catch((error) => res.status(400).send(error));
});

router.delete("/delete/:id", function (req, res, next) {
    let id = req.params.id;

    topic
        .findByPk(id)
        .then((instancia) => {
            if (instancia) {
                flashcard_topic
                    .findAll({
                        attributes: { exclude: ["updatedAt", "createdAt"] },
                        where: { topic_id: id },
                    })
                    .then((resultado) => {
                        if (resultado) {
                            if (resultado.length > 0) {
                                deleteForeigns(resultado).then(() => {
                                    instancia
                                        .destroy()
                                        .then(() => {
                                            res.status(204).json({
                                                mensaje: "Registro eliminado",
                                            });
                                        })
                                        .catch((error) => {
                                            res.status(500).json({
                                                error: error,
                                            });
                                        });
                                })
                            }
                        }
                    });
            } else {
                res.status(404).json({
                    error: "No existe registro con el identificador " + id,
                });
            }
        })
        .catch((error) => res.status(400).send(error));
});

function deleteForeigns(resultado){
    return new Promise((resolve, reject) => {
        for (let registro of resultado) {
            registro.destroy().then(() => {
                flashcard.destroy({
                    where: {
                        id: registro.flashcard_id,
                    },
                });
            });
        }
        resolve()
    });
}

module.exports = router;
