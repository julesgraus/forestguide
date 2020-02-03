import ConfigModel from "../src/js/models/ConfigModel";


let originalConsoleErrorFn = global.console.error;
let mockedConsoleErrorFn = jest.fn(originalConsoleErrorFn);

//Mock the console.error method
beforeEach(() => {
    global.console.error = mockedConsoleErrorFn;
});

afterEach(() => {
    global.console.error = originalConsoleErrorFn;
});

test('Should instantiate properly when instantiated with no configuration options', () => {
    let configModel = new ConfigModel();

    expect(configModel).toBeInstanceOf(ConfigModel);
    expect(configModel.presenceNotificationCloseClassToAdd).toEqual('');
    expect(configModel.presenceNotificationCloseClassToRemove).toEqual('');
    expect(configModel.presenceNotificationCloseButtonSelector).toEqual('.close');
    expect(configModel.loadingClass).toEqual('loading');
    expect(configModel.playingClass).toEqual('playing');
    expect(configModel.presenceNotificationClassToAdd).toEqual('');
    expect(configModel.presenceNotificationClassToRemove).toEqual('');
    expect(configModel.presenceNotificationSelector).toEqual('.fgPresenceNotification');
    expect(configModel.rootUrl).toEqual('/forestguide/');
});

test('Should instantiate properly when instantiated with configuration options', () => {
    let configModel = new ConfigModel({
        'rootUrl': '/demo',
        'loadingClass': 'load',
        'playingClass': 'play',
        'presenceNotificationSelector': '.presence',
        'presenceNotificationCloseButtonSelector': '.dismiss',
        'presenceNotificationClassToRemove': 'removeToMakeVisible',
        'presenceNotificationClassToAdd': 'addToMakeVisible',
        'presenceNotificationCloseClassToRemove': 'toRemoveOnClose',
        'presenceNotificationCloseClassToAdd': 'toAddOnClose',
    });

    expect(configModel).toBeInstanceOf(ConfigModel);
    expect(configModel.presenceNotificationCloseClassToAdd).toEqual('toAddOnClose');
    expect(configModel.presenceNotificationCloseClassToRemove).toEqual('toRemoveOnClose');
    expect(configModel.presenceNotificationCloseButtonSelector).toEqual('.dismiss');
    expect(configModel.loadingClass).toEqual('load');
    expect(configModel.playingClass).toEqual('play');
    expect(configModel.presenceNotificationClassToAdd).toEqual('addToMakeVisible');
    expect(configModel.presenceNotificationClassToRemove).toEqual('removeToMakeVisible');
    expect(configModel.presenceNotificationSelector).toEqual('.presence');
    expect(configModel.rootUrl).toEqual('/demo/'); //slash should be added automatically.
});