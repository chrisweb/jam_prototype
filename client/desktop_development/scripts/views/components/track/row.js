/**
 * 
 * track row component view
 * 
 * @param {type} view
 * @param {type} JST
 * @param {type} utilities
 * @param {type} EventsManager
 * 
 * @returns {unresolved}
 */
define([
    'ribs.view',
    'templates',
    'chrisweb.utilities',
    'library.eventsManager'
    
], function (view, JST, utilities, EventsManager) {
    
    'use strict';
    
    var trackId;
    
    var TrackRowView = view.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[TRACK ROW COMPONENT VIEW] (' + this.cid + ') initializing ...', 'fontColor:blue');
            
            trackId = this.model.get('jamendo_id');
            
            // tell the tracks cache manager that he must increment the
            // usage of this track by one
            EventsManager.trigger(EventsManager.constants.TRACKS_MANAGER_USAGE, { trackId: trackId, action: 'increment' });
            
        },
        
        template: JST['templates/components/track/row'],
        
        // view events
        events: {
            'mousedown .js-trackPreview': 'trackPreviewStart',
            'mouseup .js-trackPreview': 'trackPreviewStop',
            'click .js-playTrack': 'playTrackClick',
            'click .js-pauseTrack': 'pauseTrackClick',
            'click .js-shareOnTwitterTrack': 'shareOnTwitterTrackClick',
            'click .js-shareOnFacebookTrack': 'shareOnFacebookClick',
            'click .js-shareOnGooglePlusTrack': 'shareOnGooglePlusClick'
        },
        
        trackPreviewStart: function trackPreviewStartFunction(event) {

            EventsManager.trigger(EventsManager.constants.TRACK_PLAY, { trackId: trackId });
            
            this.$el.find('.trackPreview').addClass('fa-spin');
            
        },
        
        trackPreviewStop: function trackPreviewStopFunction() {
            
            EventsManager.trigger(EventsManager.constants.TRACK_STOP, { trackId: trackId });
            
            this.$el.find('.trackPreview').removeClass('fa-spin');
            
        },
        
        playTrackClick: function playTrackClickFunction(event) {
            
            EventsManager.trigger(EventsManager.constants.TRACK_PLAY, { trackId: trackId, playlistId: this.options.templateVariables.playlistId });
            
            $(event.currentTarget)
                .removeClass('fa-play')
                .addClass('fa-pause')
                .removeClass('js-playTrack')
                .addClass('js-pauseTrack');
            
        },
        
        pauseTrackClick: function pauseTrackClickFunction(event) {
            
            EventsManager.trigger(EventsManager.constants.TRACK_PAUSE);
            
            $(event.currentTarget)
                .removeClass('fa-pause')
                .addClass('fa-play')
                .removeClass('js-pauseTrack')
                .addClass('js-playTrack');
            
        },
        
        shareOnTwitterTrackClick: function shareOnTwitterTrackClickFunction() {
            
            EventsManager.trigger(EventsManager.constants.TRACK_SHARE, { trackId: trackId, network: 'twitter' });
            
        },
        
        shareOnGooglePlusClick: function retweetTrackClickFunction() {
            
            EventsManager.trigger(EventsManager.constants.TRACK_SHARE, { trackId: trackId, network: 'facebook' });
            
        },
        
        shareOnFacebookClick: function retweetTrackClickFunction() {
            
            EventsManager.trigger(EventsManager.constants.TRACK_SHARE, { trackId: trackId, network: 'googleplus' });
            
        },
        
        onCloseStart: function() {
            
            // tell the tracks cache manager that he must decrement the
            // usage of this track by one
            EventsManager.trigger(EventsManager.constants.TRACKS_MANAGER_USAGE, { trackId: trackId, action: 'decrement' });
            
        }
        
    });

    return TrackRowView;
    
});