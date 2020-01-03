const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path')

//initialization
const app = express()
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
app.use(morgan('dev'));
app.use(express.urlencoded({extend:false}));
app.use(express.json());

//Goblal variables
app.use((req,res,next)=>{
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