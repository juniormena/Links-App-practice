const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

//metodo encargado del login

passport.use('local.signin', new LocalStrategy({
    usernameField:'username',
    passwordField:'password',
    passReqToCallback:true
},async (req,username,password, done)=>{
    const rows = await pool.query('SELECT * FROM users where username = ?', [username]);

    if(rows.length>0){
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.PASSWORD);

        if(validPassword){
            done(null, user, req.flash('success', 'Welcome ' + user.USERNAME));
        }else{
            done(null, false, req.flash('message','Incorrect Password'));
        }
    }else{
        return done(null, false, req.flash('message','The username does not exist'));
    }
}));


//metodo encargado de registar al usuario
passport.use('local.signup', new LocalStrategy({
    usernameField:'username',
    passwordField:'password',
    passReqToCallback:true
},async(req,username,password,done)=>{
    const {fullname} =req.body;
    const newUser = {
        username,
        password,
        fullname
    }
    newUser.password = await helpers.encryptPassword(password);

       const result = await pool.query('INSERT INTO users set ?', [newUser]);
       newUser.id = result.insertId;
       return done(null, newUser);//le devolvemos el newuser para que lo almacene en una session en el server
}));

passport.serializeUser((user,done)=>{
    //esto es para guardar el usuario dentro de la session
    done(null, user.ID);//guarda el user en la session con un serializado
});
//esto es para deserializar el usuario que tambien recibe un callback
passport.deserializeUser(async (id,done)=>{
    //obtenemos los datos del id del usuario serializado
   const rows = await pool.query('SELECT * FROM users where id=?',[id]);
   done(null, rows[0]);

});

