/**
 * twitter harvester wrapper
 * 
 * MIT Licensed, see License.txt
 * 
 */

var async = require('async');

// utilities module
var utilities = require('./bower_components/chrisweb-utilities/utilities');

// NODE_ENV can be "development", "staging" or "production"
if (typeof(process.env.NODE_ENV) === 'undefined') {

    //process.env.NODE_ENV = 'production';
    process.env.NODE_ENV = 'development';
    
    utilities.log('PROCESS ENV NOT FOUND, setting it by default to "' + process.env.NODE_ENV.toUpperCase() + '"', 'fontColor:red', 'backgroundColor:white');

}

// get the environment variable
var environment = process.env.NODE_ENV;

// get configuration
var configurationModule = require('./server/configuration/configuration.js');
var configuration = configurationModule.get();

// mongo module
var mongoModule = require('./library/mongo');

var mongoClient;

// mongodb connection
mongoModule.getClient(function mongooseConnectCallback(error, mongooseConnection) {
    
    if (error) {
        
        utilities.log('[MONGODB]' + error, 'fontColor:red');
        
    } else {
        
        utilities.log('[MONGODB] connected', 'fontColor:green');
        
        mongoClient = mongooseConnection;
        
    }
    
});

// get the tweets mongoose model
var TweetModel = require('./server/models/tweet');

var tweetModel = new TweetModel();

// load jamendo from twitter
// try/catch because it is a github module and might be missing
try {

    var JamendoFromTwitter = require('./node_modules/jamendo-from-twitter/index');
    
} catch(exception) {

    utilities.log('loading jamendo-from-twitter failed: ', 'fontColor:red');

    utilities.log(exception);
    
}

/**
 * 
 * save a tweet
 * 
 * @param {type} trackId
 * @returns {undefined}
 */
var saveTweet = function(trackId) {
    
    utilities.log('harvester saveTweet.. ', 'fontColor:blue');
    
    var message = this.message;
    
    //console.log(message);

    var twitterData = {
        jamendo_unit_id: trackId,
        jamendo_unit: 'track',
        twitter_user_id: message.user.id_str,
        twitter_user_name: message.user.screen_name,
        twitter_user_image: message.profile_image_url,
        twitter_tweet_date: message.raw.created_at,
        twitter_tweet_id: message.id_str,
        twitter_tweet_original_text: message.fulltext
    };

    tweetModel.saveOne(twitterData, function(error) {
        
        console.log('error: ' + error, 'fontColor:red');
        
    });
    
};

// get an harvester
var harvester = new JamendoFromTwitter(configuration);

// on twitter message listener ("jamendo from twitter" event)
harvester.on('message', function(message) {

    utilities.log('harvester incoming message: ', 'fontColor:green');
    
    utilities.log(message.extracted);

    if (message.extracted.nothing === false) {
        
        if (typeof(message.extracted.track_ids) !== 'undefined') {
            
            this.message = message;

            async.each(message.extracted.track_ids, saveTweet.bind(this), function(error){
                
                console.log('async error response: ', 'fontColor:red');
                
                console.log(error);
                
            });
            
        }
 
    }

});

harvester.on('error', function(error) {

    console.log('harvester on error');

    console.log(error.message);
    
});

var streamOptions = {};
var searchOptions = {};

//streamOptions.track = 'jamendo OR jamen.do OR jamendomusic';
streamOptions.track = 'jamendo OR jamen.do';
searchOptions.track = 'jamendo OR jamen.do';

try {
    
    harvester.executeSearch(searchOptions);
    
} catch(exception) {

    console.log('twitter harvester error: ' + exception, 'fontColor:red');

}

// start harvesting
try {
    
    //harvester.startStream(streamOptions);
    
} catch(exception) {

    console.log('twitter harvester error: ' + exception);

}

// close db connections on shutdown
process.on('SIGINT', function() {

    mongoModule.disconnect(mongoClient, function (error) {
        
        if (error) {
            
            utilities.log('mongodb disconnect: ' + error, 'fontColor:red');
            
        }

        utilities.log('[TWITTER HARVESTER] process is shutting down...');

        process.exit(0);

    });

});