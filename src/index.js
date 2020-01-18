const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const mysqlStore = require('express-mysql-session');
const {database} = require('./keys');
const passport = require('passport');
//initialization
const app = express();
require('./lib/passport');
//settings
app.set('port',process.env.PORT || 4000);
app.set('views',path.join(__dirname,'views'));//decir donde esta la caperta views
app.engine('.hbs',exphbs({
    defaultlayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialDir:path.join(app.get('views'),'partials'),
    extname:'.hbs',
    helpers:require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

//Middleware
//guardar session en el servidor
app.use(session({
    secret:'session de mi servidor',
    resave:false,
    saveUninitialized:false,
    store: new mysqlStore(database)
}))
app.use(morgan('dev'));
app.use(express.urlencoded({extend:false}));
app.use(express.json());
app.use(flash());//para enviar mensajes
app.use(passport.initialize());
app.use(passport.session());

//Goblal variables
app.use((req,res,next)=>{
    app.locals.success = req.flash('success');
    next();
});

//Routes
app.use(require('./route'));
app.use(require('./route/authentication'));
app.use('/links',require('./route/links'));

//Public
app.use(express.static(path.join(__dirname,'public')));

//Start Server
app.listen(app.get('port'),()=>{
    console.log(`Server running on port ${app.get('port')}`)
});