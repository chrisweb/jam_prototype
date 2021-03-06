'use strict';

// utilities module
var utilities = require('chrisweb-utilities');

// underscore vendor module
var _ = require('underscore');

// jamendo vendor module
var Jamendo = require('jamendo');

// configuration module
var configurationModule = require('../configuration/configuration');

var configuration = configurationModule.get(process.env.NODE_ENV);

/**
 * 
 * get a jamendo api instance
 * 
 * @returns {undefined}
 */
var jamendoAPI = function initializeJamendoAPIFunction() {

    this.jamendoForNodejs = new Jamendo({
        client_id : configuration.jamendoApi.clientId,
        protocol  : configuration.jamendoApi.protocol,
        version   : configuration.jamendoApi.version,
        debug     : false,
        rejectUnauthorized: false
    });

};

jamendoAPI.prototype.getTracksByQuery = function getTracksByQueryFunction(query, callback) {
    
    // by default return both album tracks and also singles
    if (!_.has(query, 'type')) {
        
        query.type = ['single', 'albumtrack'];
        
    }
    
    this.jamendoForNodejs.tracks(query, function(error, data) {

        //utilities.log('*******');
        //utilities.log(error);
        //utilities.log(data);
        //utilities.log('*******');
        
        if (!_.isObject(data) && _.isNull(error)) {
            
            callback('invalid jamendo api server response');
            
        } else if (_.has(data, 'headers') && data.headers.error_message !== '') {
            
            callback(data.headers.error_message);
            
        } else if (_.has(data, 'headers') && data.headers.warnings !== '') {
            
            callback(data.headers.warnings);
            
        } else if (error) {
            
            callback(error);
            
        } else {
            
            var newData = {};
            
            newData.results = [];
            
            _.each(data.results, function(value) {
                
                // string to integer for ids
                if (value.album_id !== '') {
                    value.album_id = parseInt(value.album_id);
                }
                
                value.id = parseInt(value.id);
                value.artist_id = parseInt(value.artist_id);
                
                newData.results.push(value);
                
            });
            
            callback(null, newData);
            
        }
        
    });
    
};

jamendoAPI.prototype.getPlaylistsByQuery = function getPlaylistsByQueryFunction(query, callback) {
    
    this.jamendoForNodejs.playlists(query, function(error, data) {
        
        //utilities.log('*******');
        //utilities.log(error);
        //utilities.log(data);
        //utilities.log('*******');
        
        var response = {
            message: '',
            code: 0
        };
        
        if (!_.isObject(data) && _.isNull(error)) {
            
            response.message = 'invalid jamendo api server response';

            callback(response);
            
        } else if (_.has(data, 'headers') && data.headers.error_message !== '') {
            
            response.message = data.headers.error_message;
            response.code = parseInt(data.headers.code);

            callback(response);
            
        } else if (_.has(data, 'headers') && data.headers.warnings !== '') {
            
            // handle warnings as errors for now, as most warnings will result in a
            // response that is not what we expected and might leed to bugs further
            // in the process
            // TODO: need to reconsider this?
            response.message = data.headers.warnings;

            callback(response);
            
        } else if (error) {
            
            if (typeof error === 'string') {
                response.message = error;
            } else {
                response.message = 'unknown error in jamendo api server response';
            }

            callback(error);
            
        } else {
            
            var newData = {};
            
            newData.results = [];
            
            _.each(data.results, function(value) {
                
                // string to integer for ids
                value.id = parseInt(value.id);
                value.user_id = parseInt(value.user_id);
                
                newData.results.push(value);
                
            });
            
            callback(null, newData);
            
        }
        
    });
    
};

jamendoAPI.prototype.getPlaylistTracksByQuery = function getPlaylistTracksByQueryFunction(query, callback) {
    
    this.jamendoForNodejs.playlists(query, function(error, data) {
        
        //utilities.log('*******');
        //utilities.log(error);
        //utilities.log(data);
        //utilities.log('*******');
        
        if (!_.isObject(data) && _.isNull(error)) {
            
            callback('invalid jamendo api server response');
            
        } else if (_.has(data, 'headers') && data.headers.error_message !== '') {
            
            callback(data.headers.error_message);
            
        } else if (_.has(data, 'headers') && data.headers.warnings !== '') {
            
            callback(data.headers.warnings);
            
        } else if (error) {
            
            callback(error);
            
        } else {
            
            var newData = {};
            
            newData.results = [];
            
            _.each(data.results, function(value) {
                
                // string to integer for ids
                value.id = parseInt(value.id);
                value.user_id = parseInt(value.user_id);
                
                newData.results.push(value);
                
            });
            
            callback(null, newData);
            
        }
        
    });
    
};

module.exports = jamendoAPI;