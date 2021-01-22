module.exports = {
    notAuthenticated: function(req, res, next) {
        if(!req.isAuthenticated()) {
            return next();
        }

        res.redirect('/dashboard')
    }
}