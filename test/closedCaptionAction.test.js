import Activator from "../src/js/Activator";
import ActionModel from "../src/js/models/ActionModel";
import ClosedCaption from "../src/js/actions/ClosedCaption";


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
        </body>
        </html>
    `;

    let actionConfigModel = ActionModel.fromJson({
       name: 'cc',
       options: {'text': 'Hello there!', 'wrapperClass': 'fg-custom-closed-caption'}
    });

    let activator = new Activator();

    //Before activating, the cc element should not be in the dom yet.
    expect(document.querySelectorAll('.bottom')).toHaveLength(0);
    activator.activate(actionConfigModel);
    expect(document.querySelectorAll('.bottom')).toHaveLength(1);

    //And when it is activated, it has the 'bottom' class by default.
    let element = document.querySelector('.bottom');
    expect(element.tagName).toEqual('DIV');

    //When you mouse over it, it changes it's class to .top and vice versa, to move it's position.
    //Move to top
    element.dispatchEvent(new Event('mouseenter'));
    expect(document.querySelectorAll('.bottom')).toHaveLength(0);
    expect(document.querySelectorAll('.top')).toHaveLength(1);
    element.dispatchEvent(new Event('mouseleave'));

    //Move to bottom
    element.dispatchEvent(new Event('mouseenter'));
    expect(document.querySelectorAll('.top')).toHaveLength(0);
    expect(document.querySelectorAll('.bottom')).toHaveLength(1);
    element.dispatchEvent(new Event('mouseleave'));

    //Check the contents of the closed caption
    expect(document.querySelector('.bottom p').innerHTML).toEqual('Hello there!'); //innertText does not seem to work here. Limitation of jsdom.

    //Deactivating it does hide it
    expect(document.querySelectorAll('.bottom')).toHaveLength(1);
    expect(document.querySelector('.bottom').getAttribute('hidden')).toEqual(null);
    activator.deactivate(actionConfigModel);
    expect(document.querySelectorAll('.bottom')).toHaveLength(1);
    expect(document.querySelector('.bottom').getAttribute('hidden')).toEqual('');
});

test('Should log errors when the class does not get an object', () => {
    ClosedCaption.activate('');
    expect(global.console.error).toBeCalledWith('ClosedCaption: The options parameter was not an expected object.');
});

test('Should log errors when the class does not get an object with a property called text', () => {
    ClosedCaption.activate({});
    expect(global.console.error).toBeCalledWith('ClosedCaption: The options object does not have an string property called text');
});