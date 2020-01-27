import Cookies from "../src/js/Cookies";

let originalConsoleErrorFn = global.console.error;
let mockedConsoleErrorFn = jest.fn();

beforeEach(() => {
        mockedConsoleErrorFn.mockClear();
        global.console.error = mockedConsoleErrorFn;
});

afterEach(() => {
        global.console.error = originalConsoleErrorFn;
});

test('Should return null when a cookie isn\'t set', () => {
        let cookies = new Cookies();
        expect(cookies.get('doesnotexisthopefully')).toEqual(null);
});

test('Should be able to set a cookie', () => {
        let cookies = new Cookies();

        cookies.set('doesnotexisthopefully', 'test123');
        expect(cookies.get('doesnotexisthopefully')).toEqual('test123');
});

test('Should be able to delete a cookie', () => {
        let cookies = new Cookies();

        cookies.set('cookietodelete', 'deleteme');
        expect(cookies.get('cookietodelete')).toEqual('deleteme');
        cookies.delete('cookietodelete');
        expect(cookies.get('cookietodelete')).toEqual(null);
});