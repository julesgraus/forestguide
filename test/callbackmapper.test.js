import CallbackMapper from "../src/js/CallbackMapper";

test('Maps callback', () => {
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