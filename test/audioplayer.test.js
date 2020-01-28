import AudioPlayer from "../src/js/AudioPlayer";

const originalConsoleError = global.console.error;
beforeEach(() => {
    global.console.error = jest.fn();
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
    let audioPlayerPlayFn = jest.fn();
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
    expect(onPlayCallback).toBeCalledTimes(2);

    //Fake that the audio player got an error
    audioPlayer._audio.error = 'Flux Capacitor did not have enough energy';
    audioPlayer._audio.dispatchEvent(new Event('error'));
    expect(global.console.error).toBeCalledWith('AudioPlayer:error An error occured: ', "Flux Capacitor did not have enough energy");
    audioPlayer._audio.error = null;

    //Test pausing
    expect(onPauseCallback).toBeCalledTimes(0);
    audioPlayer.pause();
    audioPlayer._audio.dispatchEvent(new Event('pause')); //fake the internal firing of a pause event
    expect(onPauseCallback).toBeCalledTimes(1);

    //Test stopping
    expect(onStoppedCallback).toBeCalledTimes(0);
    audioPlayer.stop();
    audioPlayer._audio.dispatchEvent(new Event('pause')); //fake the internal firing of a pause event.
    //In combination of an internal currentTime set to 0 action, you can see this as a "stop".
    //The audio object does not have a stop event.
    expect(onStoppedCallback).toBeCalledTimes(1);

    //Test internal reset
    audioPlayer.play();
    expect(audioPlayerPlayFn).toBeCalledTimes(2);
    expect(onPlayCallback).toBeCalledTimes(3);
    audioPlayer.load('some url'); //already loaded. Should not reset the audio player and thus not stopping it.
    expect(onStoppedCallback).toBeCalledTimes(1);
    audioPlayer.load('some other url'); //not already loaded. Should reset the audio player and thus stopping it.
    expect(onStoppedCallback).toBeCalledTimes(2);

    //Test setting of current time
    expect(audioPlayer.getCurrentTime()).toEqual(1);
    audioPlayer.setCurrentTime('9'); //Strings aren't valid. This should trigger an error.
    expect(global.console.error).toBeCalledWith('AudioPlayer:setCurrentTime Did not receive a number. It must be the number of seconds you want to play from');
    expect(audioPlayer.getCurrentTime()).toEqual(1);
    audioPlayer.setCurrentTime(9); //This should work
    expect(audioPlayer.getCurrentTime()).toEqual(9);

    //Test the other callbacks too
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
});