const express  = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req,res)=>{
   res.render('links/add')
});

router.post('/add', (req,res)=>{
   console.log(req.body);
   const { title,url,description } = req.body;
   const newLink = {
      title,
      url,
      description
   };
   pool.query('INSERT INTO links set ?', [newLink])
       .then(()=>{
          res.send('Links was Registered')
       }).catch((err)=>res.send(err))
})

module.exports = router;