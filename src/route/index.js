//aqui vamos a poner las rutas
const express = require('express');
const router = express.Router();

router.get('/', (req,res) =>{
    res.redirect('/links')
})

module.exports = router;