// GET TWITCH API
var https = require('https');
var settings = require('../settings');
var async = require('async');

module.exports = {
    lang : settings.lang,
    client_id : settings.youtube_client_id,
    cache: [],
    
    
    create_url: function()
        { 
          return "https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&videoCategoryId=20&q=élő&maxResults=50&key="+this.client_id;
        },

     single_get_youtube: function(youtube_data, callback)
       {

       console.log(youtube_data.id.videoId);

        var url = "https://www.youtube.com/live_stats?v="+youtube_data.id.videoId;

        https.get(url, function(res){
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', function(){
                var api_response = body;

                youtube_data.snippet.viewers = body;

                callback(youtube_data);
               
                return api_response;

            });
        }).on('error', function(e){
              console.log("Got an error: ", e);
              return false;
        });
        
        return;
       },



    update_viewers: function(youtube_data,callback)
       {
           try{

               var result = [];
             
             async.each(youtube_data,
                    // 2nd param is the function that each item is passed to
                    function(item, callback){
                      // Call an asynchronous function, often a save() to DB
                      module.exports.single_get_youtube(item,function(data){
                            result.push(data);  
                            callback();
                          });
                    },
                    // 3rd param is the function to call when everything's done
                    function(err){
                      // All tasks are done now
                      callback(result);
                    });

            }
           catch(err)
           {
             console.log(err.message);  
           }
       },   


    api_get: function(callback)
       {

        var url = this.create_url();

        https.get(url, function(res){
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', function(){
                var api_response = JSON.parse(body);


                callback(api_response.items);
               
                return api_response.items;

            });
        }).on('error', function(e){
              console.log("Got an error: ", e);
              return false;
        });
       },
    
    
    
    
};




