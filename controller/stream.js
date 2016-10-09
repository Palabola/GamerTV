var express = require('express');
var router = express.Router();
var twitch = require('../twitch_easy');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
router.get('/:user',  function(req, res) {
    
  result(function (callback){
     
      
  });
    
  console.log(req.params); 
  res.send('Birds home page');
  
});


module.exports = router;
