const express = require('express');
const morgan = require('morgan');
//initialization
const app = express()
//settings
app.set('port',process.env.PORT || 4000);

//Middleware
app.use(morgan('dev'));

//Goblal variables

//Routes

//Public

//Start Server
app.listen(app.get('port'),()=>{
    console.log(`Server running on port ${app.get('port')}`)
});