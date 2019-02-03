import DataRetriever from './DataRetriever';

/**
 * Knows how to play and work with audio
 */
class Player {
    constructor()
    {
        this._dataRetriever = new DataRetriever();

        this._audioContext = null; //represents the sound system of the computer and is the main object used for creating and managing audio.
        this._audioBuffer = null;  //An array buffer that is used for storing downloaded audio data.
        this._source = null;       //Creates a sound source that can be loaded with buffers, and connected to speakers
        this._init();
    }

    /**
     * Initialize
     *
     * @private
     */
    _init()
    {
        try {
            let _audioContext = window.AudioContext || window.webkitAudioContext; //Use the regular Audio context or the webkit one of the regular isn't there.
            this._audioContext = new _audioContext();
        } catch (e) {
            console.error('Player: Your browser does not support this audio player.');
            throw new Error('Player: Your browser does not support this audio player. '+e.message);
        }
    }

    /**
     * @param {string} soundUrl
     *
     * Returns a Promise that resolves with the player instance. Or rejects with an error message
     */
    load(soundUrl)
    {
        let self = this;
        if(typeof soundUrl !== "string") {
            console.error('Player: Could not play the sound because the url wasn\'t a string.');
            return;
        }

        return new Promise(function(resolve, reject) {
            this._dataRetriever.setResponseType('arraybuffer'); //Needed to retrieve the sound buffer.
            this._dataRetriever.get(soundUrl).then(function(response) {
                self._audioContext.decodeAudioData(request.response, function(buffer) {
                    self._audioBuffer = buffer;
                    resolve(self);
                }, function() {
                    reject('Player:load Could sound from url "'+soundUrl+'" because the audio could not be decoded')
                })
            }).catch(function(errorMessage) {
                reject('Player:load Could not load sound from url "'+soundUrl+'" because an error occurred: '+errorMessage);
            });
        });
    }

    /**
     * Plays the loaded sound from the beginning or the second specified.
     *
     * @param start
     */
    play(start = 0)
    {
        if(this._audioBuffer == null) {
            console.error('Player: could not play sound as it was not loaded. Please load it first using the load method');
            return null;
        }

        this._source = this._audioContext.createBufferSource(); //Create the sound source
        this._source.buffer = this._audioBuffer; //Tell the source which sound it must play. E.g. the loaded one in the buffer.
        this._source.connect(this._audioContext.destination); //Connect the source to the destination, which are usually the speakers of the computer.
        this._source.play(start);
    }
}