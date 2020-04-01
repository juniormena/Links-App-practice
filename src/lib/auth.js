//este metodo es para proteger las rutas y que solo puedan acceder a ellas si estan logeados
module.exports = {
    isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        return res.redirect('/signin');
    },

    isNotloggedIn(req,res,next){
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/profile');
    }
};