const db = require('../data/db');

// Crear un nuevo propietario
const createPropietario = async (data) => {
  const { nombre, email } = data;
  const query = 'INSERT INTO propietarios (nombre, email) VALUES ($1, $2) RETURNING *';
  const values = [nombre, email];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Obtener todos los propietarios
const getAllPropietarios = async () => {
  const query = 'SELECT * FROM propietarios ORDER BY nombre ASC';
  const result = await db.query(query);
  return result.rows;
};

// Obtener un propietario por ID
const getPropietarioById = async (id) => {
  const query = 'SELECT * FROM propietarios WHERE propietario_id = $1';
  const result = await db.query(query, [id]);
  return result.rows[0];
};

// Actualizar un propietario
const updatePropietario = async (id, data) => {
  const { nombre, email } = data;
  const query = 'UPDATE propietarios SET nombre = $1, email = $2 WHERE propietario_id = $3 RETURNING *';
  const values = [nombre, email, id];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Eliminar un propietario
const deletePropietario = async (id) => {
  const query = 'DELETE FROM propietarios WHERE propietario_id = $1';
  await db.query(query, [id]);
  return { message: 'Propietario eliminado exitosamente.' };
};

module.exports = {
  createPropietario,
  getAllPropietarios,
  getPropietarioById,
  updatePropietario,
  deletePropietario,
};