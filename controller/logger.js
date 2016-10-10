// LOGGER API
var db = require('./db_connect');


function insert_channel(data){
 
 for(var i=0; i < data.length; i++)
        {  
          var post  = {name:data[i].channel.name, data: JSON.stringify(data[i])};
          db.query('INSERT INTO channel_meta SET ?', post, function(err, result) {
             if (err) throw err;
           }); 
       }  
};


module.exports.insert_channel = insert_channel;


