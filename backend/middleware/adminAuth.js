import jwt from 'jsonwebtoken';

export const adminProtect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Accept token only if the payload contains id: 'admin'
      if (decoded.id === 'admin') {
        req.admin = { id: 'admin' };
        return next();
      }
      return res.status(401).json({ error: 'Not authorized' });
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
};