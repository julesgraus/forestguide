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
        this._ignoreNextPause = false;
        this._ignoreNextStop = false;
        this._urlToLoad = null;
        this._urlLoaded = false;
        this._isPlaying = false;
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
        this._audio.removeEventListener('canplaytrough', this._canPlayTroughHandler.bind(this));
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
            this._audio.addEventListener('canplaytrough', this._canPlayTroughHandler.bind(this));
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
        if(!this._audio || this.isPlaying()) return null;
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
        this._callbackMapper.trigger('durationChanged');
    }

    /**
     * Event handler for when when the metadata has been loaded.
     *
     * @param {Event} event
     * @private
     */
    _loadedMetadataHandler(event) {
        if(!this._audio) return null;
        this._callbackMapper.trigger('loadedMetaData');
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
        this._callbackMapper.trigger('loadedData');
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
        this._callbackMapper.trigger('progress');
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
            this._audio.play().then(function() {
                this._urlLoaded = true;
                this._callbackMapper.trigger('play');
            }.bind(this)).catch(function (exceptionName) {
                console.error('Could not play because of an error: ');
                switch (exceptionName) {
                    case 'NotAllowedError':
                        console.error('The browser does not allow to play the sound. (NotAllowedError)');
                        break;
                    case 'NotSupportedError':
                        console.error('The sound file isn\'t supported (NotSupportedError)');
                        break;
                    default:
                        console.error(exceptionName);
                }
            })
        } else {
            this._urlLoaded = true;
            this._callbackMapper.trigger('canPlay');
        }
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
        this._callbackMapper.trigger('canPlayTrough');
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
        this._isPlaying = true;
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
        this._isPlaying = false;
        if(!this._audio) return null;
        if(this._ignoreNextPause) {
            this._ignoreNextPause = false;
            return;
        } //A stop was triggered. That's a pause followed by setDuration = 0. We ignore this pause in such situations
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
        if(!this._audio || !this.isPlaying()) return null;
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
        this._isPlaying = false;
        if(!this._audio) return null;
        this._callbackMapper.trigger('finish');
    }

    /**
     * Event handler for when when the metadata has been loaded.
     *
     * @param callback
     * @param args
     * @param {boolean} clearExistingRegistration
     * @return AudioPlayer
     */
    onLoadedMetaData(callback, args = [], clearExistingRegistration = false) {
        if(clearExistingRegistration) this._callbackMapper.clearCallbacksForAction('loadedMetaData');
        this._callbackMapper.on('loadedMetaData', callback, args);
        return this;
    }

    /**
     * Triggered when loading has started
     *
     * @param callback
     * @param args
     * @param {boolean} clearExistingRegistration
     * @return AudioPlayer
     */
    onLoading(callback, args = [], clearExistingRegistration= false) {
        if(clearExistingRegistration) this._callbackMapper.clearCallbacksForAction('loading');
        this._callbackMapper.on('loading', callback, args);
        return this;
    }

    /**
     * Triggered when the first frame of the media has finished loading.
     * Note that this event will not fire in mobile/tablet devices if data-saver is on in browser settings.
     *
     * @param callback
     * @param args
     * @param {boolean} clearExistingRegistration
     * @return AudioPlayer
     */
    onLoadedData(callback, args = [], clearExistingRegistration = false) {
        if(clearExistingRegistration) this._callbackMapper.clearCallbacksForAction('loadedData');
        this._callbackMapper.on('loadedData', callback, args);
        return this;
    }

    /**
     * Triggered when event is fired to indicate that an operation is in progress.
     * Sent periodically to inform interested parties of progress downloading the media.
     * Information about the current amount of the media that has been downloaded is available as a TimeRanges
     * object that you can retrieve when calling the buffered method
     *
     * @param callback
     * @param args
     * @param {boolean} clearExistingRegistration
     * @return AudioPlayer
     */
    onProgress(callback, args = [], clearExistingRegistration = false) {
        if(clearExistingRegistration) this._callbackMapper.clearCallbacksForAction('progress');
        this._callbackMapper.on('progress', callback, args);
        return this;
    }

    /**
     * Event handler for when the metadata has loaded or changed, indicating a change in duration of the media.
     * This is sent, for example, when the media has loaded enough that the duration is known.
     *
     * @param callback
     * @param args
     * @param {boolean} clearExistingRegistration
     * @return AudioPlayer
     */
    onDurationChanged(callback, args = [], clearExistingRegistration = false) {
        if(clearExistingRegistration) this._callbackMapper.clearCallbacksForAction('durationChanged');
        this._callbackMapper.on('durationChanged', callback, args);
        return this;
    }

    /**
     * Triggered when the audio has loaded enough to trigger playing
     *
     * @param callback
     * @param args
     * @param {boolean} clearExistingRegistration
     * @return AudioPlayer
     */
    onCanPlay(callback, args = [], clearExistingRegistration= false) {
        if(clearExistingRegistration) this._callbackMapper.clearCallbacksForAction('canPlay');
        this._callbackMapper.on('canPlay', callback, args);
        return this;
    }

    /**
     * Triggered when the user agent can play the media, and estimates that enough data has been loaded
     * to play the media up to its end without having to stop for further buffering of content.
     *
     * @param callback
     * @param args
     * @param {boolean} clearExistingRegistration
     * @return AudioPlayer
     */
    onCanPlayTrough(callback, args = [], clearExistingRegistration = false) {
        if(clearExistingRegistration) this._callbackMapper.clearCallbacksForAction('canPlayTrough');
        this._callbackMapper.on('canPlayTrough', callback, args);
        return this;
    }

    /**
     * Triggered when the audio has begun playing
     *
     * @param callback
     * @param args
     * @param {boolean} clearExistingRegistration
     * @return AudioPlayer
     */
    onPlay(callback, args = [], clearExistingRegistration = false) {
        if(clearExistingRegistration) this._callbackMapper.clearCallbacksForAction('play');
        this._callbackMapper.on('play', callback, args);
        return this;
    }

    /**
     * Triggered when the audio has been paused
     *
     * @param callback
     * @param args
     * @param {boolean} clearExistingRegistration
     * @return AudioPlayer
     */
    onPause(callback, args = [], clearExistingRegistration = false) {
        if(clearExistingRegistration) this._callbackMapper.clearCallbacksForAction('pause');
        this._callbackMapper.on('pause', callback, args);
        return this;
    }

    /**
     * Triggered when the audio has been stopped
     *
     * @param callback
     * @param args
     * @param {boolean} clearExistingRegistration
     * @return AudioPlayer
     */
    onStopped(callback, args = [], clearExistingRegistration = false) {
        if(clearExistingRegistration) this._callbackMapper.clearCallbacksForAction('stop');
        this._callbackMapper.on('stop', callback, args);
        return this;
    }

    /**
     * Triggered when the audio has progressed in play duration
     *
     * @param callback
     * @param args
     * @param {boolean} clearExistingRegistration
     * @return AudioPlayer
     */
    onPlayProgress(callback, args = [], clearExistingRegistration= false) {
        if(clearExistingRegistration) this._callbackMapper.clearCallbacksForAction('playProgress');
        this._callbackMapper.on('playProgress', callback, args);
        return this;
    }

    /**
     * Triggered when the audio has finished playing
     *
     * @param callback
     * @param args
     * @param {boolean} clearExistingRegistration
     * @return AudioPlayer
     */
    onFinish(callback, args = [], clearExistingRegistration = false) {
        if(clearExistingRegistration) this._callbackMapper.clearCallbacksForAction('finish');
        this._callbackMapper.on('finish', callback, args);
        return this;
    }

    /**
     * Clear all callback registrations
     */
    clearCallbacks() {
        this._callbackMapper.reset();
    }

    /**
     * Clear system resources
     *
     * @private
     */
    _reset()
    {
        if(!this._audio) return null;
        this._ignoreNextStop = true;
        this.stop();
        this._ignoreNextStop = false;
        this._enableListeners(false);
    }


    /**
     * Stops playback
     *
     * @return {null}
     */
    stop()
    {
        if(!this._audio || !this.isPlaying()) return null;
        this._ignoreNextPause = true; //Prevent pause event from being processed
        this._audio.pause();
        this._audio.currentTime = 0;
        if(!this._ignoreNextStop) this._callbackMapper.trigger('stop');
        this._ignoreNextPause = false;
    }

    /**
     * @param {string} soundUrl
     *
     * Returns a Promise that resolves with the player instance. Or rejects with an error message
     */
    load(soundUrl)
    {
        if(this._urlToLoad === soundUrl && this._urlLoaded === true) {
            // console.log('Warning: Already loaded '+soundUrl+'. Not loading again.');
            return;
        } //We already loaded the url.
        this._urlToLoad = soundUrl;

        if(typeof soundUrl !== "string") {
            console.error('AudioPlayer:load Could not play the sound because the url wasn\'t a string.');
            return;
        }

        this._reset();
        this._createNewAudioObject(soundUrl);
        this._enableListeners();
    }

    /**
     * Create a new audio object
     * @param soundUrl
     * @private
     */
    _createNewAudioObject(soundUrl) {
        this._audio = null;
        this._audio = new Audio(soundUrl);
    }

    /**
     * Requests to play the sound as soon as it is loaded
     */
    play(reference)
    {
        if(!this._audio) return null;
        this._ignoreNextStop = true;
        this.stop();
        this._ignoreNextStop = false;
        this._requestedPlay = true;
        if(this._urlLoaded) this._canPlayHandler(null); //Because the url is loaded it won't trigger the _canPlayHandler. So we do it manually. The handler will play the sound.
    }

    /**
     * Pause the audio
     *
     * @return {null}
     */
    pause() {
        if(!this._audio || !this.isPlaying()) return null;
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
            return;
        }
        this._audio.currentTime = time;
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
     * @return {TimeRanges|AudioPlayer.buffered|boolean}
     */
    buffered() {
        if(!this._audio) return new TimeRanges();
        return this._audio.buffered;
    }

    /**
     * Detect whether or not audio is playing or not
     *
     * @return {boolean}
     */
    isPlaying() {
        return this._isPlaying;
    }
}