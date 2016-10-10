// LOGGER API
var db = require('./db_connect');


var cache_data = [];


function insert_channel(data){
    
    try{
        if(typeof(data)==='undefined')
        { 
            console.log('wft');
            return;
        }
        for(var i=0; i < data.length; i++)
               {
                 var skip = 0;  

               if(typeof(cache_data)!=='undefined') 
               {
                        for(var k=0; k < cache_data.length; k++)   
                        {
                          if(cache_data[k]._id === data[i]._id)
                              {
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
    }
    catch(err) {
    console.log(err.message);
    }   
    
};



module.exports.insert_channel = insert_channel;


