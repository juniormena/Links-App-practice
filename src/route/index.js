//aqui vamos a poner las rutas
const express = require('express');
const router = express.Router();

router.get('/', (req,res) =>{
    res.send('Hello World');
})

module.exports = router;