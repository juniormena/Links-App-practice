const express  = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req,res)=>{
   res.render('links/add');
});

//get links
router.get('/',async (req,res)=>{
   const links = await pool.query('SELECT * FROM links');
   res.render('links/list', {
      links
   })
})
//add links
router.post('/add', (req,res)=>{
   console.log(req.body);
   const { title,url,description } = req.body;
   const newLink = {
      title,
      url,
      description
   };
   console.log(newLink);
   pool.query('INSERT INTO links set ?', [newLink])
       .then(()=>{
          res.redirect('/links/')
       }).catch((err)=>res.send(err))
});

router.get('/delete/:id',async(req,res)=>{
   console.log(req.params.id);
  await pool.query('DELETE FROM links where id=?', [req.params.id]);
   res.redirect('/links/');

});

router.get('/edit/:id',async(req,res)=>{
   const {id} = req.params;
   const links = await pool.query('SELECT * FROM links where ID= ?', [id]);
   res.render('links/edit',{link:links[0]})

});

router.post('/edit/:id', async(req,res)=> {
   const { id } = req.params;
   const { title,url,description } = req.body;
   const newLink = {
      title,
      url,
      description
   };
   await pool.query('update links set ? where ID= ? ', [newLink,id]);
   res.redirect('/links')
});

module.exports = router;