import AudioPlayer from "../src/js/AudioPlayer";

//Mock the console.error method
const originalConsoleError = global.console.error;
beforeEach(() => {
    global.console.error = jest.fn();
    // global.console.error = jest.fn((...err) => console.log('Mock console.error called with: ', ...err));
});

afterEach(() => {
    global.console.error = originalConsoleError;
});

test('Audio player test', () => {
    let audioPlayer = new AudioPlayer();

    //Create mock functions / callbacks
    let onDurationChanged = jest.fn();
    let onLoadingCallback = jest.fn();
    let onLoadedDataCallback = jest.fn();
    let onLoadedMetaData = jest.fn();
    let onPlayProgress = jest.fn();
    let onPlayCallback = jest.fn();
    let onPauseCallback = jest.fn();
    let onProgressCallback = jest.fn();
    let onCanPlayCallback = jest.fn();
    let onCanPlayTroughCallback = jest.fn();
    let onFinishCallback = jest.fn();
    let onStoppedCallback = jest.fn();
    let audioPlayerPlayFn = jest.fn(() => {
        return Promise.resolve();
    });
    let audioPlayerPauseFn = jest.fn();
    let audioPlayerAddEventListenerFn = null;
    let audioPlayerRemoveEventListenerFn = jest.fn();
    let audioPlayerDispatchEventListenerFn = jest.fn();

    //Mock some functions in the audio player
    audioPlayer._createNewAudioObject = jest.fn(function(soundUrl) {
        //Create a fake "audio object"
        let eventMap = {};
        this._audio = {
            soundUrl: soundUrl,
            eventMap: eventMap,
            play: audioPlayerPlayFn,
            pause: audioPlayerPauseFn,
            buffered: {},
            currentTime: 1,
            readyState: 4,
            addEventListener: audioPlayerAddEventListenerFn = jest.fn((event, callback) => {
                if(!eventMap.hasOwnProperty(event)) eventMap[event] = [];
                eventMap[event].push(callback);
            }),
            removeEventListener: audioPlayerRemoveEventListenerFn,
            dispatchEvent: audioPlayerDispatchEventListenerFn = jest.fn((event) => {
                // console.log('fake audio player received an event to dispatch: '+event.type);
                eventMap[event.type].forEach((callback) => {
                    callback(event);
                })
            })
        };
    }.bind(audioPlayer));

    audioPlayer.onLoading(onLoadingCallback)
        .onCanPlay(onCanPlayCallback)
        .onPlay(onPlayCallback)
        .onPause(onPauseCallback)
        .onFinish(onFinishCallback)
        .onStopped(onStoppedCallback)
        .onCanPlayTrough(onCanPlayTroughCallback)
        .onProgress(onProgressCallback)
        .onLoadedData(onLoadedDataCallback)
        .onDurationChanged(onDurationChanged)
        .onLoadedMetaData(onLoadedMetaData)
        .onPlayProgress(onPlayProgress);

    audioPlayer.load('some url');

    //Check that the audio player wanted to register event listeners and check that it wanted to create a new audio object.
    expect(audioPlayerAddEventListenerFn).toBeCalledTimes(12);
    expect(audioPlayerRemoveEventListenerFn).toBeCalledTimes(12);
    expect(audioPlayer._createNewAudioObject).toBeCalledWith('some url');

    //Fake that the audio player loaded the url and could play it.
    audioPlayer._audio.dispatchEvent(new Event('loadstart'));
    audioPlayer._audio.dispatchEvent(new Event('canplay'));
    expect(onCanPlayCallback).toBeCalledTimes(1);
    expect(onLoadingCallback).toBeCalledTimes(1);

    //Test play
    audioPlayer.play();
    audioPlayer._audio.dispatchEvent(new Event('play')); //fake the internal firing of a pause event.
    expect(audioPlayerPlayFn).toBeCalledTimes(1);
    expect(onPlayCallback).toBeCalledTimes(1);

    //Fake that the audio player got an error
    audioPlayer._audio.error = 'Flux Capacitor did not have enough energy';
    audioPlayer._audio.dispatchEvent(new Event('error'));
    expect(global.console.error).toBeCalledWith('AudioPlayer:error An error occured: ', "Flux Capacitor did not have enough energy");
    audioPlayer._audio.error = null;

    //Test pausing
    expect(onPauseCallback).toBeCalledTimes(0);
    audioPlayer.pause();
    audioPlayer._audio.dispatchEvent(new Event('pause')); //fake the internal firing of the event
    expect(onPauseCallback).toBeCalledTimes(1);

    //Test stopping
    audioPlayer.play();
    audioPlayer._audio.dispatchEvent(new Event('play')); //fake the internal firing of a pause event.
    expect(onPlayCallback).toBeCalledTimes(2);
    expect(onStoppedCallback).toBeCalledTimes(0);
    audioPlayer.stop();
    audioPlayer._audio.dispatchEvent(new Event('pause')); //fake the internal firing of a pause event.
    //In combination of an internal currentTime set to 0 action, you can see this as a "stop".
    //The audio object does not have a stop event.
    expect(onStoppedCallback).toBeCalledTimes(1);

    //Test internal reset
    audioPlayer.play();
    audioPlayer._audio.dispatchEvent(new Event('play')); //fake the internal firing of the event
    expect(audioPlayerPlayFn).toBeCalledTimes(3);
    expect(onPlayCallback).toBeCalledTimes(3);
    audioPlayer.load('some url'); //already loaded. Should not reset the audio player and thus not stopping it.
    expect(onStoppedCallback).toBeCalledTimes(1);
    audioPlayer.load('some other url'); //not already loaded. Should reset the audio player and thus stopping it.
    expect(onStoppedCallback).toBeCalledTimes(1);

    //Test loading of non string url
    audioPlayer.load({'url': 'myfile.mp3'}); //The argument isn't a string. It is an object, and that is not allowed
    expect(global.console.error).toBeCalledWith('AudioPlayer:load Could not play the sound because the url wasn\'t a string.');

    //Test setting of current time
    expect(audioPlayer.getCurrentTime()).toEqual(1);
    audioPlayer.setCurrentTime('9'); //Strings aren't valid. This should trigger an error.
    expect(global.console.error).toBeCalledWith('AudioPlayer:setCurrentTime Did not receive a number. It must be the number of seconds you want to play from');
    expect(audioPlayer.getCurrentTime()).toEqual(1);
    audioPlayer.setCurrentTime(9); //This should work
    expect(audioPlayer.getCurrentTime()).toEqual(9);

    //Expect buffered method to return a timeRanges object holding buffer information
    expect(audioPlayer.buffered()).toBeInstanceOf(Object); //Node cannot get access to a real timeRanges object

    //Test the other callbacks too
    audioPlayer.play();
    audioPlayer._audio.dispatchEvent(new Event('play')); //fake the internal firing of the event
    audioPlayer._audio.dispatchEvent(new Event('loadeddata'));
    audioPlayer._audio.dispatchEvent(new Event('loadedmetadata'));
    audioPlayer._audio.dispatchEvent(new Event('progress'));
    audioPlayer._audio.dispatchEvent(new Event('canplaytrough'));
    audioPlayer._audio.dispatchEvent(new Event('durationchange'));
    audioPlayer._audio.dispatchEvent(new Event('timeupdate'));
    audioPlayer._audio.dispatchEvent(new Event('ended'));
    expect(onLoadedDataCallback).toBeCalledTimes(1);
    expect(onProgressCallback).toBeCalledTimes(1);
    expect(onCanPlayTroughCallback).toBeCalledTimes(1);
    expect(onDurationChanged).toBeCalledTimes(1);
    expect(onPlayProgress).toBeCalledTimes(1);
    expect(onFinishCallback).toBeCalledTimes(1);


    //Test play failure
    let originalPlayFn = audioPlayer._audio.play;
    let errorFunction = function(err) {
        return function () {
            let promiseLike = {
                then: function (callback) {
                    return promiseLike
                },
                catch: function (callback) {
                    callback(err);
                    return promiseLike;
                }
            };
            return promiseLike;
        };
    };

    global.console.error.mockClear();
    audioPlayer._audio.play = errorFunction('NotAllowedError');
    audioPlayer.play();
    expect(global.console.error).toBeCalledTimes(2);
    expect(global.console.error).toBeCalledWith('Could not play because of an error: ');
    expect(global.console.error).toBeCalledWith('The browser does not allow to play the sound. (NotAllowedError)');

    global.console.error.mockClear();
    audioPlayer._audio.play = errorFunction('NotSupportedError');
    audioPlayer.play();
    expect(global.console.error).toBeCalledTimes(2);
    expect(global.console.error).toBeCalledWith('The sound file isn\'t supported (NotSupportedError)');

    global.console.error.mockClear();
    audioPlayer._audio.play = errorFunction('OtherError');
    audioPlayer.play();
    expect(global.console.error).toBeCalledTimes(2);
    expect(global.console.error).toBeCalledWith('OtherError');
});