const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).send('El correo electrónico ya está en uso.');
    }

    const newUser = await userService.createUser(username, email, password);

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ 
      message: 'Usuario registrado exitosamente',
      user: { id: newUser.id, username: newUser.username },
      token 
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error en el servidor al registrar el usuario.');
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findUserByEmail(email);

    if (!user) {
      return res.status(401).send('Credenciales incorrectas');
    }

    const isMatch = (password === user.password); // Recuerda usar bcrypt en producción

    if (!isMatch) {
      return res.status(401).send('Credenciales incorrectas');
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ accessToken });
  } catch (error) {
    res.status(500).send('Error en el servidor.');
  }
};

const getProtectedData = (req, res) => {
  res.json({
    message: 'Acceso concedido a la ruta protegida.',
    user: req.user
  });
};

module.exports = {
  register,
  login,
  getProtectedData,
};