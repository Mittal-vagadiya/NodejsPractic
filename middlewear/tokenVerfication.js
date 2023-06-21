const jwt = require('jsonwebtoken');
const asyncHnadler = require('express-async-handler');
const verifyToken = asyncHnadler((req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token not found' });
  }

    // Verify and decode the token
     jwt.verify(token, process.env.TOKEN_KEY,(err,decoded) => {
        if(err){
            res.status(401)
            throw new Error("User is not Authorized")
        }
        req.user = decoded.user;
        next()
        console.log(decoded)

        if(!token){
            res.status(401)
            throw new Error("User is not Authenticated")
        }
     });
})

module.exports = verifyToken;
