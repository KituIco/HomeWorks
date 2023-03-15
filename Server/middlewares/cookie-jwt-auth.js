const jwt = require('jsonwebtoken');

cookieJwtAuth = (req, res, next) => {
    let {access_token, refresh_token} = req.cookies;
        
    jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err && err.type == 'TokenExpiredError') {
            jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    res.status(401).send('Unauthorized');
                } else {
                    let accessToken = jwt.sign(decoded, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
                    res.cookie('access_token', accessToken, {
                        maxAge: 60000
                        // httpOnly: true,
                        // secure: true
                        // domain: 'correct domain'
                    });
                    req.user = decoded;
                    next();
                }
            });
        }
        req.user = decoded;
        next();
    });
        
}

module.exports = cookieJwtAuth;