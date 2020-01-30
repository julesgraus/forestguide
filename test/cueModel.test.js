import CueModel from "../src/js/models/CueModel";


let originalConsoleErrorFn = global.console.error;
let mockedConsoleErrorFn = jest.fn(originalConsoleErrorFn);

//Mock the console.error method
beforeEach(() => {
    global.console.error = mockedConsoleErrorFn;
});

afterEach(() => {
    global.console.error = originalConsoleErrorFn;
});

test('Should instantiate properly', () => {
    let cueModel = new CueModel();
    expect(cueModel.start).toEqual(0);
    expect(cueModel.end).toEqual(0);
    expect(cueModel.actions).toHaveLength(0);
});

test('Should not be instantiated from invalid json', () => {
   CueModel.fromJson();
   expect(global.console.error).toBeCalledWith('CueModel: The cue is not valid because it was undefined');
});

test('Should not be instantiated if json misses start property', () => {
    CueModel.fromJson({'end': 0, 'actions': []});
    expect(global.console.error).toBeCalledWith('CueModel: The cue was not valid. It must contain a number property called start');
});

test('Should not be instantiated if json misses end property', () => {
    CueModel.fromJson({'start': 0, 'actions': []});
    expect(global.console.error).toBeCalledWith('CueModel: The cue was not valid. It must contain a number property called start');
});

test('Should be instantiated correctly from json', () => {
    let instance = CueModel.fromJson({'start': 0, 'end': 0, 'actions': []});
    expect(instance).toBeInstanceOf(CueModel);
});