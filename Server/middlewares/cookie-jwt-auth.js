const jwt = require('jsonwebtoken');

cookieJwtAuth = (req, res, next) => {
    try {
        let {access_token, refresh_token} = req.cookies;
        if (!access_token) {
            if (!refresh_token) {
                res.status(401).json({
                    message: "Unauthorized"
                });
            } else {
                let user = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
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
        }
        let user = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user;
        next();
    } catch (error) {
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        res.status(403).json({
            message: "Forbidden"
        });
    }
}

module.exports = cookieJwtAuth;