import jwt from 'jsonwebtoken';

const generateToken = () => {
  return jwt.sign({ id: 'admin' }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Hardcoded admin credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = generateToken();
      return res.json({ token });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};