// LOGGER API
var db = require('./db_connect');


var cache_data = [];


function insert_channel(data){
 
        for(var i=0; i < data.length; i++)
               {
                 var skip = 0;  

               if(typeof(cache_data)!=='undefined') 
               {
                        for(var k=0; k < cache_data.length; k++)   
                        {
                          if(cache_data[i]._id === data[i]._id)
                              {
                                 console.log('skip');
                                 skip = 1;
                                 break;
                              }
                        }
                }
                
                 if(skip === 0)
                  {
                       var post  = {name:data[i].channel.name, data: JSON.stringify(data[i])};
                       db.query('INSERT INTO channel_meta SET ?', post, function(err, result) {
                          if (err) throw err;
                        });
                   } 

                }
                
        cache_data = data;
        
        return;
    
};



module.exports.insert_channel = insert_channel;


