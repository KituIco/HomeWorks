const jwt = require('jsonwebtoken');

cookieJwtAuth = (req, res, next) => {
    let {access_token, refresh_token} = req.cookies;
        
    jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET).then(
        (user) => {
            req.user = user;
            next();
        }
    ).catch((error) => {
        if (error.name === 'TokenExpiredError') {
            jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET).then(
                (user) => {
                    let token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '15m'
                    });
                    res.cookie('access_token', token, {
                        maxAge: 900000,
                        // httpOnly: true,
                        // secure: true
                        // domain: 'correct domain'
                    });
                    req.user = user;
                    next();
                }
            ).catch(
                (error) => {
                    res.clearCookie("access_token");
                    res.clearCookie("refresh_token");
                    res.status(403).json({
                        message: "Forbidden"
                    });
                }
            )
        } else {
            res.clearCookie("access_token");
            res.clearCookie("refresh_token");
            res.status(403).json({
                message: "Forbidden"
            });
        }
    });
}

module.exports = cookieJwtAuth;