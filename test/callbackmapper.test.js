import CallbackMapper from "../src/js/CallbackMapper";

//Mock the console.error method
const originalConsoleError = global.console.error;
beforeEach(() => {
    global.console.error = jest.fn();
});

afterEach(() => {
    global.console.error = originalConsoleError;
});

test('Maps callback correctly', () => {
    //Setup
    let mapper = new CallbackMapper();

    //Mock a callback function
    let mockCallback = jest.fn(() => 'callback works!');

    //Map the callback to the fake "something" callback
    mapper.on('something', mockCallback);

    //Test
    expect(mockCallback.mock.calls.length).toBe(0);
    mapper.trigger('something');
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.results[0].value).toBe('callback works!');
    mapper.trigger('something');
    expect(mockCallback.mock.calls.length).toBe(2);
});

test('Logs error on invalid action value', () => {
    let mapper = new CallbackMapper();
    mapper.on(1, () => null); //The first argument must be a string.
    expect(global.console.error).toHaveBeenCalledWith('CallbackMapper: not registering callback since the action is not a string');
});

test('Logs error on invalid callback value', () => {
    let mapper = new CallbackMapper();
    mapper.on('something', 'callback'); //The second argument must be a function
    expect(global.console.error).toHaveBeenCalledWith('CallbackMapper: not registering callback since the callback is not a function');
});

test('Logs error on invalid callback args value', () => {
    let mapper = new CallbackMapper();
    mapper.on('something', () => null, {}); //The third argument must be an array.
    expect(global.console.error).toHaveBeenCalledWith('CallbackMapper: not registering callback since the args parameter is not an array');
});

test('Should not trigger a callback when the name isn\'t a string', () => {
    let mapper = new CallbackMapper();
    mapper.on('something', () => null);
    mapper.trigger([]); //The argument must be a string
    expect(global.console.error).toHaveBeenCalledWith('CallbackMapper: not triggering callback since the action is not a string');
});

test('Should not trigger a callback that does not exist', () => {
    let mapper = new CallbackMapper();
    mapper.on('something', () => null);
    mapper.trigger('someting'); //Because of the typo, the callback mapper will log an error
    expect(global.console.error).toHaveBeenCalledWith('CallbackMapper: There is no callback registered with an action name of: someting');
});