import jwt from 'jsonwebtoken';
import { pool } from '../config/init_db.js';
import bcrypt from 'bcrypt'

export const login = async (req, res) => {
  const { email, password, role = 'student' } = req.body;

  const generateToken = (email) => {
    return jwt.sign({ email, role }, process.env.JWT_SECRET, { expiresIn: '24h' });
  };

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(409).json({
        statusCode: 409,
        message: "Email doesn't exist",
      });
    }

    // const user = rows[0];
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(409).json({
    //     statusCode: 409,
    //     message: "Invalid Password",
    //   });
    // }

    const token = generateToken(email);
    const [updateResult] = await pool.query(
      `UPDATE users SET token = ?, created_at = NOW() WHERE email = ?`,
      [token, email]
    );

    if (updateResult.affectedRows === 0) {
      return res.status(500).json({
        statusCode: 500,
        message: 'Database error on updating token',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Token created and saved successfully',
      token, // include token if needed in response
    });
  } catch (err) {
    console.error('Error:', err.message);
    return res.status(500).json({
      statusCode: 500,
      message: 'There was an error with the query or database connection',
      error: err.message,
    });
  }
}

export const logout = async (req, res) => {
  try {
    const { token, decoded } = req;
    const [result] = await pool.query(
      'UPDATE users SET token = NULL WHERE token = ? AND email = ?',
      [token, decoded.email]
    );

    if (result.affectedRows === 0) {
      return res.status(401).json({
        statusCode: '401',
        message: 'Token not found or already logged out',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Logged out successfully',
    });
  } catch (err) {
    console.error('Logout error:', err.message);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
};

export const createUser = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Email, password & role are required' });
  }

  // const user = rows[0];
  // if (user.admin !== 1) {
  //   return res.status(409).json({
  //     statusCode: 409,
  //     message: "Email doesn't have access",
  //   });
  // }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = { email, hashedPassword, role };

    const [result] = await pool.query(
      'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
      [email, hashedPassword, role]
    );
    console.log('User registered with ID:', result.insertId);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error('Error creating user:', err);

    // Handle duplicate email error (MySQL error code: ER_DUP_ENTRY)
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Email already exists' });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const { role } = req.query;
    let query = 'SELECT id, name, email, role, created_at FROM users';
    let params = [];

    if (role) {
      query += ' WHERE role = ?';
      params.push(role);
    }
    const [rows] = await pool.query(query, params);

    res.status(200).json({
      message: 'Users fetched successfully',
      users: rows,
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};