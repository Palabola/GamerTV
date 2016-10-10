var settings = require('./settings');
var express = require('express');
var app = express();
var db = require('./controller/db_connect');
var logger = require('./controller/logger');
var twitch = require('./controller/twitch_easy');


// OPTIONS
app.locals.base_url = settings.base_url;
app.locals.base_title = settings.base_title;
app.locals.port = settings.port;
// OPTIONS

app.locals.generator = ({
    
   uc_first : function( str ) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}, 
    
});

app.set('view engine', 'ejs');

app.listen(app.locals.port, function () {
  console.log('GamerTV Listen on port: '+app.locals.port);
});


twitch.api_get(function (data){
console.log('Up&Run!');
twitch.cache = data;});

setInterval(function(){ 
        twitch.api_get(function (data){
        console.log('Update Twitch List!');
        twitch.cache = data;
        logger.insert_channel(data);
        }); 
}, 30000);


app.use('/static', express.static(__dirname + '/public'));

app.get('/', function (req, res) { 
  res.render('index', { title: 'GamerTV', data: twitch.cache});
});


app.get('/stream/:userId', function (req, res, next) {
    
    var loopdata = twitch.cache;
    
    console.log(req.url);
    
    if(req.params.userId!="")
    {    
                    for(var i=0;i < loopdata.length; i++)
                    {
                      if(loopdata[i].channel.name == req.params.userId)
                      {
                         console.log('looped!'); 
                         res.locals.data = loopdata[i];
                         next();  
                         return;
                      }
                    }
                    
                    twitch.single_get(req.params.userId, function (data){
                    console.log('looped fallback!');
                    res.locals.data = data; 
                    next();
                    return;
                    });
                    
         return;
    } 
},
function(req, res) {
   
   if(res.locals.data._id > 0)
   {
        res.render('stream', { title: 'GamerTV', data: res.locals.data }); 
   }
   else
   {
     res.render('404', { url: req.url });   
   }    
   
   }
);