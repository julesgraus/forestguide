import CallbackMapper from './CallbackMapper'

/**
 * Knows how to play and work with audio.
 *
 * Note: Currently it is not possible to properly track the current play time correctly. Therefore we don't use the player for now.
 */
export default class AudioPlayer {
    constructor()
    {
        this._callbackMapper = new CallbackMapper();
        this._audio = null;
        this._requestedPlay = false;
        this._urlToLoad = null;
        this._urlLoaded = false;
    }

    /**
     * Attaches listeners to audio
     *
     * @private
     */
    _enableListeners(enable = true)
    {
        if(!this._audio) return null;

        this._audio.removeEventListener('loadstart', this._loadStartHandler.bind(this));
        this._audio.removeEventListener('durationchange', this._durationChangeHandler.bind(this));
        this._audio.removeEventListener('loadedmetadata', this._loadedMetadataHandler.bind(this));
        this._audio.removeEventListener('loadeddata', this._loadedDataHandler.bind(this));
        this._audio.removeEventListener('progress', this._progressHandler.bind(this));
        this._audio.removeEventListener('canplay', this._canPlayHandler.bind(this));
        this._audio.removeEventListener('canplayTrough', this._canPlayTroughHandler.bind(this));
        this._audio.removeEventListener('error', this._errorHandler.bind(this));
        this._audio.removeEventListener('pause', this._pauseHandler.bind(this));
        this._audio.removeEventListener('play', this._playHandler.bind(this));
        this._audio.removeEventListener('timeupdate', this._timeUpdateHandler.bind(this));
        this._audio.removeEventListener('ended', this._endedHandler.bind(this));

        if(enable) {
            this._audio.addEventListener('loadstart', this._loadStartHandler.bind(this));
            this._audio.addEventListener('durationchange', this._durationChangeHandler.bind(this));
            this._audio.addEventListener('loadedmetadata', this._loadedMetadataHandler.bind(this));
            this._audio.addEventListener('loadeddata', this._loadedDataHandler.bind(this));
            this._audio.addEventListener('progress', this._progressHandler.bind(this));
            this._audio.addEventListener('canplay', this._canPlayHandler.bind(this));
            this._audio.addEventListener('canplayTrough', this._canPlayTroughHandler.bind(this));
            this._audio.addEventListener('error', this._errorHandler.bind(this));
            this._audio.addEventListener('pause', this._pauseHandler.bind(this));
            this._audio.addEventListener('play', this._playHandler.bind(this));
            this._audio.addEventListener('timeupdate', this._timeUpdateHandler.bind(this));
            this._audio.addEventListener('ended', this._endedHandler.bind(this));
        }
    }

    /**
     * Event handler for when loading of the audio begins.
     *
     * @param {ProgressEvent} event
     * @private
     */
    _loadStartHandler(event) {
        if(!this._audio) return null;
        this._callbackMapper.trigger('loading');
    }

    /**
     * Event handler for when the metadata has loaded or changed, indicating a change in duration of the media.
     * This is sent, for example, when the media has loaded enough that the duration is known.
     *
     * @param {Event} event
     * @private
     */
    _durationChangeHandler(event) {
        if(!this._audio) return null;
    }

    /**
     * Event handler for when when the metadata has been loaded.
     *
     * @param {Event} event
     * @private
     */
    _loadedMetadataHandler(event) {
        if(!this._audio) return null;
    }

    /**
     * Event handler for when the first frame of the media has finished loading.
     * Note that this event will not fire in mobile/tablet devices if data-saver is on in browser settings.
     *
     * @param {Event} event
     * @private
     */
    _loadedDataHandler(event) {
        if(!this._audio) return null;
    }

    /**
     * Event handler for when event is fired to indicate that an operation is in progress.
     * Sent periodically to inform interested parties of progress downloading the media.
     * Information about the current amount of the media that has been downloaded is available in
     * the media element's (this._audio) buffered attribute.
     *
     * @param {ProgressEvent} event
     * @private
     */
    _progressHandler(event) {
        if(!this._audio) return null;
    }

    /**
     * Event handler for when enough data is available that the media can be played,
     * at least for a couple of frames. This corresponds to the HAVE_ENOUGH_DATA readyState
     *
     * @param {Event} event
     * @private
     */
    _canPlayHandler(event) {
        if(!this._audio) return null;
        if(this._requestedPlay === true) {
            this._requestedPlay = false;
            this._audio.play();
            this._callbackMapper.trigger('play');
        }
        this._callbackMapper.trigger('canPlay');
    }

    /**
     * Event handler for when the ready state changes to CAN_PLAY_THROUGH,
     * indicating that the entire media can be played without interruption,
     * assuming the download rate remains at least at the current level.
     * It will also be fired when playback is toggled between paused and playing.
     * Note: Manually setting the currentTime will eventually fire a canplaythrough event in firefox.
     * Other browsers might not fire this event.
     *
     * @param {Event} event
     * @private
     */
    _canPlayTroughHandler(event) {
        if(!this._audio) return null;
        this._urlLoaded = true;
    }

    /**
     * Event handler for when an error occurs.  The element's error attribute contains more information
     *
     * @param {Event} event
     * @private
     */
    _errorHandler(event) {
        if(!this._audio) return null;
        console.error('AudioPlayer:error An error occured: ', this._audio.error)
    }

    /**
     * Event handler for when the playback state is no longer paused,
     * as a result of the play method, or the autoplay attribute.
     *
     * @param {Event} event
     * @private
     */
    _playHandler(event) {
        if(!this._audio) return null;
        this._callbackMapper.trigger('play');
    }

    /**
     * Event handler for when the playback state is changed to paused (paused property is true).
     *
     * @param {Event} event
     * @private
     */
    _pauseHandler(event) {
        if(!this._audio) return null;
        this._callbackMapper.trigger('pause');
    }

    /**
     * When the time indicated by the currentTime attribute has been updated.
     *
     * @param event
     * @private
     */
    _timeUpdateHandler(event)
    {
        if(!this._audio) return null;
        this._callbackMapper.trigger('playProgress');
    }

    /**
     * Event handler for when the media has finished playing
     *
     * @param event
     * @private
     */
    _endedHandler(event)
    {
        if(!this._audio) return null;
        this._callbackMapper.trigger('finish');
    }

    /**
     * Triggered when loading has started
     *
     * @param callback
     * @param args
     * @return AudioPlayer
     */
    onLoading(callback, args = []) {
        this._callbackMapper.on('loading', callback, args);
        return this;
    }

    /**
     * Triggered when the audio has loaded enough to trigger playing
     *
     * @param callback
     * @param args
     * @return AudioPlayer
     */
    onCanPlay(callback, args = []) {
        this._callbackMapper.on('canPlay', callback, args);
        return this;
    }

    /**
     * Triggered when the audio has begun playing
     *
     * @param callback
     * @param args
     * @return AudioPlayer
     */
    onPlay(callback, args = []) {
        this._callbackMapper.on('play', callback, args);
        return this;
    }

    /**
     * Triggered when the audio has been paused
     *
     * @param callback
     * @param args
     * @return AudioPlayer
     */
    onPause(callback, args = []) {
        this._callbackMapper.on('pause', callback, args);
        return this;
    }

    /**
     * Triggered when the audio has been stopped
     *
     * @param callback
     * @param args
     * @return AudioPlayer
     */
    onStopped(callback, args = []) {
        this._callbackMapper.on('stop', callback, args);
        return this;
    }

    /**
     * Triggered when the audio has begun playing
     *
     * @param callback
     * @param args
     * @return AudioPlayer
     */
    onPlayProgress(callback, args = []) {
        this._callbackMapper.on('playProgress', callback, args);
        return this;
    }

    /**
     * Triggered when the audio has finished playing
     *
     * @param callback
     * @param args
     * @return AudioPlayer
     */
    onFinish(callback, args = []) {
        this._callbackMapper.on('finish', callback, args);
        return this;
    }

    /**
     * Clear system resources
     *
     * @private
     */
    _reset()
    {
        if(!this._audio) return null;
        this.stop();
        this._enableListeners(false);
        this._audio = null;
    }


    /**
     * Stops playback
     *
     * @return {null}
     */
    stop()
    {
        if(!this._audio) return null;
        this._audio.pause();
        this._audio.currentTime = 0;
        this._callbackMapper.trigger('stop')
    }

    /**
     * @param {string} soundUrl
     *
     * Returns a Promise that resolves with the player instance. Or rejects with an error message
     */
    load(soundUrl)
    {
        if(this._urlToLoad === soundUrl && this._urlLoaded === true) return; //We already loaded the url.
        this._urlToLoad = soundUrl;

        if(typeof soundUrl !== "string") {
            console.error('Player: Could not play the sound because the url wasn\'t a string.');
            return;
        }

        this._reset();
        this._audio = new Audio(soundUrl);
        this._enableListeners();
    }

    /**
     * Requests to play the sound as soon as it is loaded
     */
    play()
    {
        if(!this._audio) return null;
        this._requestedPlay = true;
    }

    /**
     * Pause the audio
     *
     * @return {null}
     */
    pause() {
        if(!this._audio) return null;
        this._audio.pause();
    }

    /**
     * Sets the current time in seconds from where to play from
     *
     * @param {number} time
     */
    setCurrentTime(time)
    {
        if(!this._audio) return null;
        if(typeof time !== "number") {
            console.error('AudioPlayer:setCurrentTime Did not receive a number. It must be the number of seconds you want to play from')
        }
    }

    /**
     * Gets the current time in seconds from where to play from
     *
     * @return {number}
     */
    getCurrentTime()
    {
        if(!this._audio) return 0;
        return this._audio.currentTime;
    }

    /**
     * Detect whether or not audio is playing or not
     *
     * @return {boolean}
     */
    isPlaying() {
        return !!(this._audio
            && this._audio.currentTime > 0
            && !this._audio.paused
            && !this._audio.ended
            && this._audio.readyState > 2);
    }
}