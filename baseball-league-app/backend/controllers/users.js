const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../models/db');

exports.register = async (req, res) => {
  const { username, password, role, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      'INSERT INTO users (username, password, role, email) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, hashedPassword, role, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

  if (user.rows.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

  const validPassword = await bcrypt.compare(password, user.rows[0].password);
  if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.rows[0].id, role: user.rows[0].role }, process.env.JWT_SECRET);
  res.json({ token });
};
