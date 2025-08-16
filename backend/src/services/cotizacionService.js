const db = require('../data/db');

// Crear una nueva cotización
const createCotizacion = async (data) => {
  const { propietario_id, nombre_cliente, cultivo, estado, superficie_asegurada, monto_asegurado, vigencia_inicio, vigencia_fin, latitud, longitud } = data;
  const query = 'INSERT INTO cotizaciones (propietario_id, nombre_cliente, cultivo, estado, superficie_asegurada, monto_asegurado, vigencia_inicio, vigencia_fin, latitud, longitud) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
  const values = [propietario_id, nombre_cliente, cultivo, estado, superficie_asegurada, monto_asegurado, vigencia_inicio, vigencia_fin, latitud, longitud];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Obtener todas las cotizaciones
const getAllCotizaciones = async () => {
  const query = 'SELECT * FROM cotizaciones ORDER BY created_at DESC';
  const result = await db.query(query);
  return result.rows;
};

// Obtener una cotización por ID
const getCotizacionById = async (id) => {
  const query = 'SELECT * FROM cotizaciones WHERE cotizacion_id = $1';
  const result = await db.query(query, [id]);
  return result.rows[0];
};

// Actualizar una cotización por ID
const updateCotizacion = async (id, data) => {
  const { nombre_cliente, cultivo, estado, superficie_asegurada, monto_asegurado, vigencia_inicio, vigencia_fin, latitud, longitud } = data;
  const query = 'UPDATE cotizaciones SET nombre_cliente = $1, cultivo = $2, estado = $3, superficie_asegurada = $4, monto_asegurado = $5, vigencia_inicio = $6, vigencia_fin = $7, latitud = $8, longitud = $9 WHERE cotizacion_id = $10 RETURNING *';
  const values = [nombre_cliente, cultivo, estado, superficie_asegurada, monto_asegurado, vigencia_inicio, vigencia_fin, latitud, longitud, id];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Eliminar una cotización por ID
const deleteCotizacion = async (id) => {
  const query = 'DELETE FROM cotizaciones WHERE cotizacion_id = $1';
  await db.query(query, [id]);
  return { message: 'Cotización eliminada exitosamente' };
};

module.exports = {
  createCotizacion,
  getAllCotizaciones,
  getCotizacionById,
  updateCotizacion,
  deleteCotizacion,
};