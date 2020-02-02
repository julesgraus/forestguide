import Activator from "../src/js/Activator";
import ActionModel from "../src/js/models/ActionModel";


let originalConsoleErrorFn = global.console.error;
let mockedConsoleErrorFn = jest.fn();

//Mock the console.error method
beforeEach(() => {
    global.console.error = mockedConsoleErrorFn;
});

afterEach(() => {
    global.console.error = originalConsoleErrorFn;
});

test('should log an error when action options argument is something other then an object', () => {
    ActionModel.fromJson('wrong argument');
    expect(global.console.error).toBeCalledWith('Action: The action was not valid. The options parameter must be an object');
});

test('should log an error when action options object does not have a name property', () => {
    ActionModel.fromJson({});
    expect(global.console.error).toBeCalledWith('Action: The action was not valid. It must contain a string property called name');
});

test('should log an error when action options object does not have a options property', () => {
    ActionModel.fromJson({name: 'something'});
    expect(global.console.error).toBeCalledWith('Action: The action was not valid. It must contain an object property called options');
});

test('should return an Action model instance when being correct', () => {
    let actionModel = ActionModel.fromJson({name: 'something', 'options': {}});
    expect(actionModel).toBeInstanceOf(ActionModel);
});