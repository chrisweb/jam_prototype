/**
 * 
 * chat bar component view
 * 
 * @param {type} $
 * @param {type} _
 * @param {type} JST
 * @param {type} utilities
 * @param {type} View
 * @param {type} EventsManager
 * 
 * @returns {unresolved}
 */
define([
    'jquery',
    'underscore',
    'templates',
    'chrisweb.utilities',
    'ribs.view',
    'library.eventsManager'
    
], function ($, _, JST, utilities, View, EventsManager) {
    
    'use strict';

    var SearchBarView = View.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[CHAT BAR COMPONENT VIEW] initializing ...', 'fontColor:blue');
            
        },

        template: JST['templates/components/chat/bar'],
        
        // view events
        events: {
            
        }
        
    });
    
    return SearchBarView;
    
});