import AddClass from "../src/js/actions/AddClass";
import ScrollToElement from "../src/js/actions/ScrollToElement";
import ActionProcessor from "../src/js/ActionProcessor";
import GuideModel from "../src/js/models/GuideModel";

//Mock the complete action modules
jest.mock('../src/js/actions/AddClass');
jest.mock('../src/js/actions/ScrollToElement');

//Mock the console.error method
const originalConsoleError = global.console.error;
beforeEach(() => {
    global.console.error = jest.fn();
    global.console.error.mockClear();
});

afterEach(() => {
    global.console.error = originalConsoleError;
});

test('Should not load an invalid guide', () => {
    let actionProcessor = new ActionProcessor();
    actionProcessor.loadGuide({});
    expect(global.console.error).toBeCalledWith('The actionprocessor only accepts an instance of the Guide class. Something else was given');
});

test('Should activate actions', () => {
    let guide = GuideModel.fromJson({
        soundFile: 'somefile.mp3',
        cues: [
            {
                "comment": "Test action",
                "start": 2,
                "end": 5,
                "actions": [
                    {
                        "name": "addClass",
                        "options": { "selector": "#news" }
                    }
                ]
            },
            {
                "comment": "Test action 2",
                "start": 5,
                "end": 6,
                "actions": [
                    {
                        "name": "scrollToElement",
                        "options": { "selector": "#someThing" }
                    }
                ]
            },
        ]
    });

    let actionProcessor = new ActionProcessor();
    actionProcessor.loadGuide(guide);

    expect(AddClass.activate).toBeCalledTimes(0);
    actionProcessor.tick(3);
    expect(AddClass.activate).toBeCalledTimes(1);

    expect(ScrollToElement.activate).toBeCalledTimes(0);
    expect(AddClass.deactivate).toBeCalledTimes(0);
    actionProcessor.tick(5.1);
    expect(AddClass.deactivate).toBeCalledTimes(1);
    expect(ScrollToElement.activate).toBeCalledTimes(1);

    expect(ScrollToElement.deactivate).toBeCalledTimes(0);
    actionProcessor.tick(7);
    expect(ScrollToElement.deactivate).toBeCalledTimes(1);

    actionProcessor.tick(6);
    expect(ScrollToElement.activate).toBeCalledTimes(2);

    actionProcessor.deactivate();
    expect(ScrollToElement.deactivate).toBeCalledTimes(2);
});
