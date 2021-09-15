const jwt = require('jsonwebtoken');


// Authentification middleware : Use token in req.headers.authorization and decode it to get userId.
// Compare with req.body.userId
module.exports = (req, res, next) => {
  console.log(req.body);
  console.log(req.headers);
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    console.log(decodedToken);
    const userId = decodedToken.userId;
    console.log(typeof userId);
    console.log(typeof req.body.userId)
    if (req.body.userId && req.body.userId != userId) {
      throw 'Invalid user ID';
    } else {
      // next();
      res.status(200).json({ message: "ok" });
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};