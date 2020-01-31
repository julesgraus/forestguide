import ForestGuide from "../src/js/ForestGuide";

let originalConsoleErrorFn = global.console.error;
let mockedConsoleErrorFn = jest.fn();

//Mock the console.error method
beforeEach(() => {
    global.console.error = mockedConsoleErrorFn;
});

afterEach(() => {
    global.console.error = originalConsoleErrorFn;
});

let initializeDocument = () => {
    document.body.innerHTML = `
        <!doctype html>
        <html lang="en">
        <head>
            <title>Test document</title>
        </head>
        <body>
            <h1 data-forest-guide="test">Just a heading</h1>
            <p>An element to don't add the class to</p>
            <p class="toSelect">Element to add class to</p>
        </body>
        </html>
    `;
};

test('should add click handler to an element to be able to start a guide.', () => {
    initializeDocument();

    let button = document.querySelector('[data-forest-guide]');
    expect(button).toBeInstanceOf(HTMLHeadingElement);

    let addEventListenerFn = jest.fn();
    button.addEventListener = addEventListenerFn;

    expect(addEventListenerFn).toBeCalledTimes(0);
    let forestGuide = new ForestGuide({});
    expect(addEventListenerFn).toBeCalledTimes(1);
    expect(addEventListenerFn).toBeCalledWith('click', forestGuide._guideButtonClicked);
});