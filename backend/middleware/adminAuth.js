import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized. Please login again.',
    });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = token_decode.id;  
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
    });
  }
};

export default authUser;
