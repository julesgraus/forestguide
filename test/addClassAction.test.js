import Activator from "../src/js/Activator";
import ActionModel from "../src/js/models/ActionModel";
import AddClass from "../src/js/actions/AddClass";


let originalConsoleErrorFn = global.console.error;
let mockedConsoleErrorFn = jest.fn();

//Mock the console.error method
beforeEach(() => {
    global.console.error = mockedConsoleErrorFn;
});

afterEach(() => {
    global.console.error = originalConsoleErrorFn;
});

test('Should activate and deactivate the addClass action and cause dom manipulation', () => {
    document.body.innerHTML = `
        <!doctype html>
        <html lang="en">
        <head>
            <title>Test document</title>
        </head>
        <body>
            <h1>Just a heading</h1>
            <p>An element to don't add the class to</p>
            <p class="toSelect">Element to add class to</p>
        </body>
        </html>
    `;

    let regularElement = document.querySelector('p');
    let elementToAddClassTo = document.querySelector('p.toSelect');

    let actionConfigModel = ActionModel.fromJson({
       name: 'addclass',
       options: {'selector': '.toSelect'}
    });

    let activator = new Activator();

    expect(regularElement.classList.contains('toSelect')).toBeFalsy();
    expect(elementToAddClassTo.classList.contains('toSelect')).toBeTruthy();

    expect(elementToAddClassTo.classList.contains('fg-blink-border')).toBeFalsy();
    activator.activate(actionConfigModel);
    expect(elementToAddClassTo.classList.contains('fg-blink-border')).toBeTruthy();
    activator.deactivate(actionConfigModel);
    expect(elementToAddClassTo.classList.contains('fg-blink-border')).toBeFalsy();
});

test('Should log errors when the class does not get an object', () => {
    AddClass.activate('');
    expect(global.console.error).toBeCalledWith('AddClass: The options parameter was not an expected object.');
});

test('Should log errors when the class does not get an object with a property called selector', () => {
    AddClass.activate({});
    expect(global.console.error).toBeCalledWith('AddClass: The options object does not have an string property called selector');
});