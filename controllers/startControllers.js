import Joi from 'joi';
import startsData from "../data/startData.json"assert {
  type: 'json'
}

const stars = startsData;

export function getAllStars(req, res) {
  res.json(stars);
}

export function filterStars(req, res) {
  const { name, type } = req.query;
  let filteredStars = stars;

  if (name) {
    filteredStars = filteredStars.filter((star) =>
      star.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (type) {
    filteredStars = filteredStars.filter((star) =>
      star.type.toLowerCase().includes(type.toLowerCase())
    );
  }
  if (filteredStars.length === 0) {
    return res.status(404).json({ error: 'No se encontraron estrellas con los filtros proporcionados' });
  }

  res.json(filteredStars);
}

export function createStar(req, res) {
  const {
    error
  } = validateStar(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }

  const newStar = req.body;
  stars.push(newStar);

  res.status(201).json(newStar);
}

export function getStarById(req, res) {
  const starId = parseInt(req.params.id);
  const star = stars.find((s) => s.id === starId);

  if (!star) {
    return res.status(404).json({
      error: 'Estrella no encontrada'
    });
  }

  res.json(star);
}

function validateStar(star) {
  const schema = Joi.object({
    id: Joi.number().integer().min(1).required(),
    name: Joi.string().required(),
    type: Joi.string().required(),
    distancia: Joi.string().required(),
    mass: Joi.string().required(),
    radius: Joi.string().required(),
    temperature: Joi.string().required(),
    luminosity: Joi.string().required(),
    age: Joi.string().required(),
    composition: Joi.object({
      hydrogen: Joi.string().required(),
      helium: Joi.string().required(),
      otros_elementos: Joi.string().required(),
    }).required(),
    stellar_history: Joi.string().required(),
  });

  return schema.validate(star);
}