const express  = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const pool = require('../database');

router.get('/add', (req,res)=>{
   res.render('links/add');
});

//get links
router.get('/', isLoggedIn, async (req,res)=>{
   const links = await pool.query('SELECT * FROM links where USER_ID=?',[req.user.ID]);
   res.render('links/list', {
      links
   })
})
//add links
router.post('/add', isLoggedIn, (req,res)=>{
   console.log(req.body);
   const { title,url,description } = req.body;
   const newLink = {
      title,
      url,
      description,
      user_id: req.user.ID
   };
   pool.query('INSERT INTO links set ?', [newLink])
       .then(()=>{
          req.flash('success','Link created successfully');
          res.redirect('/links/')
       }).catch((err)=>res.send(err))
});

router.get('/delete/:id',isLoggedIn, async(req,res)=>{
   console.log(req.params.id);
  await pool.query('DELETE FROM links where id=?', [req.params.id]);
  req.flash('success','Link deleted successfully');
   res.redirect('/links/');

});

router.get('/edit/:id',isLoggedIn, async(req,res)=>{
   const {id} = req.params;
   const links = await pool.query('SELECT * FROM links where ID= ?', [id]);
   res.render('links/edit',{link:links[0]})

});

router.post('/edit/:id', isLoggedIn, async(req,res)=> {
   const { id } = req.params;
   const { title,url,description } = req.body;
   const updateLink = {
      title,
      url,
      description
   };
   await pool.query('update links set ? where ID= ? ', [updateLink,id]);
   req.flash('success','Link updated successfully');
   res.redirect('/links')
});

module.exports = router;