define([
    'jquery',
    'underscore',
    'utilities',
    'controller',
    'container',
    'eventsManager',
    'configuration',
    'tracksCache'
], function ($, _, utilities, controller, container, eventsManager, configurationModule, tracksCacheManager) {
    
    'use strict';

    var indexAction = function indexActionFunction() {
        
        utilities.log('[CONTROLLER HOMEPAGE] action: index', 'fontColor:blue');
        
        
        
    };

    return {
        index: indexAction
    };
    
});