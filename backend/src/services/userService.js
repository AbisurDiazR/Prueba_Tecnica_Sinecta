const db = require('../data/db');

const createUser = async (username, email, password) => {
    try {
        const query = 'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *';
        const values = [username, email, password];
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error al crear el usuario.');
    }
};

const findUserByEmail = async (email) => {
    try {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await db.query(query, [email]);
        return result.rows[0];
    } catch (error) {
        console.error('Error en findUserByEmail:', error);
        throw new Error('Error al buscar el usuario.');
    }
};

module.exports = {
    createUser,
    findUserByEmail,
};