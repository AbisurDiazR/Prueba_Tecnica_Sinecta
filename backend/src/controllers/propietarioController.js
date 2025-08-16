const propietarioService = require('../services/propietarioService');

const createPropietario = async (req, res) => {
  try {
    const newPropietario = await propietarioService.createPropietario(req.body);
    res.status(201).json(newPropietario);
  } catch (error) {
    res.status(500).send('Error al crear el propietario.');
  }
};

const getAllPropietarios = async (req, res) => {
  try {
    const propietarios = await propietarioService.getAllPropietarios();
    res.json(propietarios);
  } catch (error) {
    res.status(500).send('Error al obtener los propietarios.');
  }
};

const getPropietarioById = async (req, res) => {
  try {
    const propietario = await propietarioService.getPropietarioById(req.params.id);
    if (!propietario) {
      return res.status(404).send('Propietario no encontrado.');
    }
    res.json(propietario);
  } catch (error) {
    res.status(500).send('Error al obtener el propietario.');
  }
};

const updatePropietario = async (req, res) => {
  try {
    const updatedPropietario = await propietarioService.updatePropietario(req.params.id, req.body);
    if (!updatedPropietario) {
      return res.status(404).send('Propietario no encontrado para actualizar.');
    }
    res.json(updatedPropietario);
  } catch (error) {
    res.status(500).send('Error al actualizar el propietario.');
  }
};

const deletePropietario = async (req, res) => {
  try {
    const result = await propietarioService.deletePropietario(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send('Error al eliminar el propietario.');
  }
};

module.exports = {
  createPropietario,
  getAllPropietarios,
  getPropietarioById,
  updatePropietario,
  deletePropietario,
};