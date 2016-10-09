// GET TWITCH API
var https = require('https');

module.exports = {
    lang : "en",
    limit : 25,
    client_id : '',
    cache: [],
    
    
    create_url: function()
        {
          return "https://api.twitch.tv/kraken/streams?language="+this.lang+"&limit="+this.limit+"&client_id="+this.client_id;
        },

     single_get: function(name, callback)
       {

        var url = "https://api.twitch.tv/kraken/streams?channel="+name+"&client_id="+this.client_id;

        https.get(url, function(res){
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', function(){
                var api_response = JSON.parse(body);

               // Itt futatnjuk le a Paraméterként megadott függvényt!
                callback(api_response.streams);
               
                return api_response.streams;

            });
        }).on('error', function(e){
              console.log("Got an error: ", e);
              return false;
        });
       },


        // függvényt adunk meg paraméternek!
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

               // Itt futatnjuk le a Paraméterként megadott függvényt!
                callback(api_response.streams);
               
                return api_response.streams;

            });
        }).on('error', function(e){
              console.log("Got an error: ", e);
              return false;
        });
       },
    
    
    
    
};




