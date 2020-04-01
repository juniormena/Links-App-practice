const express  = require('express');
const router = express.Router();
const passport = require('passport');
//metodo para solo accedan a estas rutas los que estan autenticados
const { isLoggedIn, isNotloggedIn } = require('../lib/auth');


router.get('/signup',isNotloggedIn, (req,res)=>{
    res.render('auth/signup');
});

router.post('/signup',passport.authenticate('local.signup',{
        successRedirect:'/profile',
        failureRedirect:'/signup',
        failureFlash:true
    })
);

router.get('/signin',isNotloggedIn, (req,res)=>{
    res.render('auth/signin');
});

router.post('/signin',(req,res,next)=>{
    passport.authenticate('local.signin',{
        successRedirect:'/profile',
        failureRedirect:'/signin',
        failureFlash:true
    })(req,res, next);
});

router.get('/profile', isLoggedIn, (req,res)=>{
    res.render('profile');
})

router.get('/signout',(req,res)=>{
    req.logout();
    res.redirect('/signin');
});

module.exports = router;