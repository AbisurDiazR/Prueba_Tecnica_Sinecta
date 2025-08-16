const cotizacionService = require('../services/cotizacionService');

const createCotizacion = async (req, res) => {
  try {
    const newCotizacion = await cotizacionService.createCotizacion(req.body);
    res.status(201).json(newCotizacion);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear la cotización.');
  }
};

const getAllCotizaciones = async (req, res) => {
  try {
    const cotizaciones = await cotizacionService.getAllCotizaciones();
    res.json(cotizaciones);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener las cotizaciones.');
  }
};

const getCotizacionById = async (req, res) => {
  try {
    const cotizacion = await cotizacionService.getCotizacionById(req.params.id);
    if (!cotizacion) {
      return res.status(404).send('Cotización no encontrada.');
    }
    res.json(cotizacion);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener la cotización.');
  }
};

const updateCotizacion = async (req, res) => {
  try {
    const updatedCotizacion = await cotizacionService.updateCotizacion(req.params.id, req.body);
    if (!updatedCotizacion) {
      return res.status(404).send('Cotización no encontrada para actualizar.');
    }
    res.json(updatedCotizacion);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar la cotización.');
  }
};

const deleteCotizacion = async (req, res) => {
  try {
    const result = await cotizacionService.deleteCotizacion(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar la cotización.');
  }
};

module.exports = {
  createCotizacion,
  getAllCotizaciones,
  getCotizacionById,
  updateCotizacion,
  deleteCotizacion,
};