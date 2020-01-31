import GuideModel from "../src/js/models/GuideModel";


let originalConsoleErrorFn = global.console.error;
let mockedConsoleErrorFn = jest.fn();

//Mock the console.error method
beforeEach(() => {
    global.console.error = mockedConsoleErrorFn;
});

afterEach(() => {
    global.console.error = originalConsoleErrorFn;
});

test('Should instantiate properly', () => {
    let guideModel = GuideModel.fromJson({
        'soundFile': 'test.mp3',
        'cues': []
    });
    expect(guideModel.soundFile).toEqual('test.mp3');
    expect(guideModel.cues).toHaveLength(0);
});

test('Should log error when undefined is passed', () => {
    GuideModel.fromJson();
    expect(global.console.error).toHaveBeenCalledWith('Guide: The guide is not valid because it was undefined');
});

test('Should log error when the guide model json does not have the soundFile property', () => {
    GuideModel.fromJson({});
    expect(global.console.error).toHaveBeenCalledWith('Guide: The guide is not valid. It must have a string property called soundFile.');
});

test('Should log error when the guide model json does not have the cues property', () => {
    GuideModel.fromJson({'soundFile': 'test.mp3'});
    expect(global.console.error).toHaveBeenCalledWith('Guide: The guide is not valid. It must have an array property called \'cues\'');
});