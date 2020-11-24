function rootParams(req, res, next) {
    req.rootParams = req.params;
    next();
}

module.exports = rootParams;
