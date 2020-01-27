import DataRetriever from "../src/js/DataRetriever";
let originalConsoleErrorFn = global.console.error;
let mockedConsoleErrorFn = jest.fn();

beforeEach(() => {
        mockedConsoleErrorFn.mockClear();
        global.console.error = mockedConsoleErrorFn;
});

afterEach(() => {
        global.console.error = originalConsoleErrorFn;
});

test('Should return a resolving promise when being used correctly without authentication.', () => {
        let mockRequestInit = jest.fn();
        let mockRequestOpen = jest.fn();
        let mockRequestSend = jest.fn();

        let dataRetriever = new DataRetriever();

        dataRetriever._init = mockRequestInit;

        //Fake a XMLHttpRequest so we can test what the data retrieve does with it.
        dataRetriever._request = {
                open: mockRequestOpen,
                send: mockRequestSend,
                readyState: XMLHttpRequest.DONE,
                response: 'Sample result response',
                status: 200,
        };
        let resultPromise = dataRetriever.get('test.json'); //The interaction with dataRetriever starts here.

        resultPromise.then(response => expect(response).toEqual('Sample result response'));

        dataRetriever._request.onreadystatechange();

        expect(mockRequestInit).toHaveBeenCalledTimes(1);
        expect(mockRequestOpen).toHaveBeenCalledWith('GET', 'test.json', true, null, null);
        expect(mockRequestSend).toBeCalledTimes(1);
});

test('Should return a resolving promise when being used correctly with authentication.', () => {
        let mockRequestInit = jest.fn();
        let mockRequestOpen = jest.fn();
        let mockRequestSend = jest.fn();

        let dataRetriever = new DataRetriever();
        dataRetriever.username = 'johndoe';
        dataRetriever.password = 'pwd123';

        dataRetriever._init = mockRequestInit;

        //Fake a XMLHttpRequest so we can test what the data retrieve does with it.
        dataRetriever._request = {
                open: mockRequestOpen,
                send: mockRequestSend,
                readyState: XMLHttpRequest.DONE,
                response: 'Sample result response',
                status: 200,
        };
        let resultPromise = dataRetriever.get('test.json'); //The interaction with dataRetriever starts here.

        expect(mockRequestOpen).toHaveBeenCalledWith('GET', 'test.json', true, 'johndoe', 'pwd123');
});

test('Should return a rejecting promise when the server had an error.', () => {
        let mockRequestInit = jest.fn();
        let mockRequestOpen = jest.fn();
        let mockRequestSend = jest.fn();

        let dataRetriever = new DataRetriever();

        dataRetriever._init = mockRequestInit;

        //Fake a XMLHttpRequest so we can test what the data retrieve does with it.
        dataRetriever._request = {
                open: mockRequestOpen,
                // send: dataRetriever._request.send
                send: mockRequestSend,
                readyState: XMLHttpRequest.DONE,
                statusText: 'An error occured',
                status: 500,
        };
        let resultPromise = dataRetriever.get('fake.json'); //The interaction with dataRetriever starts here.

        resultPromise.catch(response => expect(response).toEqual('An error occured'));

        dataRetriever._request.onreadystatechange();
});

test('Should return a rejecting promise passing an invalid url.', () => {
        let dataRetriever = new DataRetriever();
        let resultPromise = dataRetriever.get({'a': 'do not do this'}); //The interaction with dataRetriever starts here.
        resultPromise.catch(error => expect(error).toContain('DataRetriever:get The url must be a string'));
        expect(mockedConsoleErrorFn).toHaveBeenCalledWith('DataRetriever:get The url must be a string');
});

test('Should not set the username to something other then a string.', () => {
        let dataRetriever = new DataRetriever();
        expect(dataRetriever.username).toEqual(null);
        dataRetriever.username = {};
        expect(dataRetriever.username).toEqual(null);
        expect(mockedConsoleErrorFn).toHaveBeenCalledWith('DataRetriever:username The username must be a string');
        dataRetriever.username = 'test';
        expect(dataRetriever.username).toEqual('test');
});

test('Should not set the password to something other then a string.', () => {
        let dataRetriever = new DataRetriever();
        expect(dataRetriever.password).toEqual(null);
        dataRetriever.password = {};
        expect(dataRetriever.password).toEqual(null);
        expect(mockedConsoleErrorFn).toHaveBeenCalledWith('DataRetriever:password The password must be a string');
        dataRetriever.password = 'test';
        expect(dataRetriever.password).toEqual('test');
});

test('Should not set the response type to something other then a supported string value.', () => {
        let dataRetriever = new DataRetriever();
        dataRetriever._request = {
        };

        expect(dataRetriever.responseType).toEqual('text'); //Text is the default one
        dataRetriever.responseType =  'verbal'; //Response type does not exist xD
        expect(dataRetriever.responseType).toEqual('text');
        expect(mockedConsoleErrorFn).toHaveBeenCalledWith('Dataretriever:setResponseType: The type was not valid. It must be one of these: text, arraybuffer, blob, document');
        dataRetriever.responseType = 'arraybuffer';
        expect(dataRetriever.responseType).toEqual('arraybuffer');
});

test('Should not be able to set a request header to something other then a string.', () => {
        let mockSetRequestHeader = jest.fn();

        let dataRetriever = new DataRetriever();
        dataRetriever._request = {
                setRequestHeader: mockSetRequestHeader,
        };

        dataRetriever.setHeader({}, null); //Bad parameter values
        expect(mockedConsoleErrorFn).toHaveBeenCalledWith('Dataretriever:setHeader: The name of a header must be string');
        dataRetriever.setHeader('x-test', null); //Bad parameter values
        expect(mockedConsoleErrorFn).toHaveBeenCalledWith('Dataretriever:setHeader: The value(s) of a header must be string');

        dataRetriever.setHeader('x-test', 'someval');
        expect(dataRetriever.getHeader('x-test')).toEqual('someval');
        expect(dataRetriever.getHeader('x-non-existing-header')).toEqual(null);
});