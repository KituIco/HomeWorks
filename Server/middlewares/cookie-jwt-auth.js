const jwt = require('jsonwebtoken');

cookieJwtAuth = (req, res, next) => {
    try {
        let {token} = req.cookies;
        if (!token) {
            res.status(401).json({
                message: "Unauthorized"
            });
        }
        let user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user;
        next();
    } catch (error) {
        res.clearCookie("token");
        res.status(403).json({
            message: "Forbidden"
        });
    }
}

module.exports = cookieJwtAuth;