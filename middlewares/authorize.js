const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyToken = (req, res, next) => {
  console.log("i am here")
  const token = req.cookies.token;
  console.log("toke is",token)

  if (token) {
    console.log("Token is:", token);
    jwt.verify(token, "shivamdubey", (err, decodedToken) => {
      if (err) {
        console.log("Token not verified", decodedToken);
        res.status(401).json({ error: 'Unauthorized' });
      } else {
        req.user = decodedToken;
        console.log("Decoded token is:", decodedToken);
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = verifyToken;
