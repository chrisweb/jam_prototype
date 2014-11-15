/**
 * 
 * homepage controller
 * 
 * @param {type} $
 * @param {type} _
 * @param {type} utilities
 * @param {type} Controller
 * @param {type} container
 * @param {type} eventsManager
 * @param {type} user
 * @param {type} modernizrTestsLoader
 * @param {type} Modernizr
 * 
 * @returns {unresolved}
 * 
 */
define([
    'jquery',
    'underscore',
    'chrisweb.utilities',
    'ribs.controller',
    'ribs.container',
    'ribs.eventsManager',
    'library.user',
    'modernizrTestsLoader',
    'Modernizr'
    
], function ($, _, utilities, Controller, container, eventsManager, user, modernizrTestsLoader, Modernizr) {
    
    'use strict';
    
    var HomepageController = Controller.extend({
        
        onInitialize: function(options, configuration, router) {
            
            utilities.log('[HOMEPAGE CONTROLLER] initializing ...', 'fontColor:blue');
            
            this.options = options;
            this.configuration = configuration;
            this.router = router;
            
        },
        
        indexAction: function indexActionFunction() {
        
            utilities.log('[CONTROLLER HOMEPAGE] action: index', 'fontColor:blue');
            
            modernizrTestsLoader([
                'test/audio',
                'test/webaudio',
                'test/video',
                'test/videoautoplay',
                //'test/canvas',
                //'test/history',
                //'test/websockets'
            ], function() {
                
                var testsResults = Modernizr.runTests(['audio', 'webaudio', 'video', 'videoautoplay', 'canvas', 'history', 'websockets']);
                
                console.log(testsResults);
                
            });
            
            /*var isLogged = user.getAttribute('isLogged');
            
            if (!isLogged) {
            
                var that = this;

                this.getOauthUrl(function getOauthUrlCallback(error, dataJson) {

                    if (!error) {

                        var oauthUrl = dataJson.url;

                        // get the login view
                        require(['views/components/login'], function(LoginView) {

                            var loginView = new LoginView({ oauthUrl: oauthUrl });

                            container.add('#core', loginView);

                            that.dispatch();

                        });

                    } else {

                        utilities.log('[CONTROLLER HOMEPAGE] getOauthUrl error', error, 'fontColor:red');

                    }

                });
                
            } else {
                
                // TODO: if user is already logged
                
            }*/

        },
        
        welcomeAction: function welcomeActionFunction() {
        
            utilities.log('[CONTROLLER HOMEPAGE] action: welcome', 'fontColor:blue');
            
            var that = this;
            
            // get the login view
            require(['views/components/welcome'], function(WelcomeView) {

                var welcomeView = new WelcomeView();

                container.add('#core', welcomeView);

                that.dispatch();

            });
            
        },
        
        getOauthUrl: function getOauthUrlFunction(callback) {
            
            var jqXHR = $.ajax({
                url: this.configuration.server.path + '/oauth/url',
                type: 'GET',
                dataType: 'json'
            });

            jqXHR.done(function(dataJson, textStatus, jqXHR) {

                utilities.log(dataJson);
                utilities.log(textStatus);
                utilities.log(jqXHR);
                
                callback(false, dataJson);

            });

            jqXHR.fail(function(jqXHR, textStatus, errorThrown) {

                utilities.log(jqXHR);
                utilities.log(textStatus);
                utilities.log(errorThrown);

                callback(errorThrown);

            });
            
        }
        
    });

    return HomepageController;
    
});