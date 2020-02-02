import Activator from "../src/js/Activator";
import AddClass from "../src/js/actions/AddClass";
import ScrollToElement from "../src/js/actions/ScrollToElement";
import ActionModel from "../src/js/models/ActionModel";

//Mock the complete action modules
jest.mock('../src/js/actions/AddClass');
jest.mock('../src/js/actions/ScrollToElement');

//Mock the console.error method
const originalConsoleError = global.console.error;
beforeEach(() => {
    global.console.error = jest.fn();
});

afterEach(() => {
    global.console.error = originalConsoleError;
});

test('Should verify actions', () => {
    let activator = new Activator();
    let fakeAction = {};
    let realAction = AddClass;

    //Verify action returns false when the action isn't one or it is invalid
    expect(activator._verifyAction(fakeAction, 'fake action')).toEqual(false);
    expect(global.console.error).toBeCalledWith("ActionFactory: The action called \"fake action\" was not really an action because it did not have both the activate and deactivate methods.");

    //Verify that a real action will be verified correctly
    expect(activator._verifyAction(realAction, 'AddClass')).toEqual(realAction);
});

test('Should activate and deactivate the addClass action', () => {
    let actionConfigModel = ActionModel.fromJson({
       name: 'addclass',
       options: {'selector': '.toSelect'}
    });

    let activator = new Activator();

    expect(AddClass.activate).toBeCalledTimes(0);
    activator.activate(actionConfigModel);
    expect(AddClass.activate).toBeCalledTimes(1);
    activator.deactivate(actionConfigModel);
    expect(AddClass.deactivate).toBeCalledTimes(1);
});

test('Should activate and deactivate the scrollToElement action', () => {
    let actionConfigModel = ActionModel.fromJson({
        name: 'scrolltoelement',
        options: {'selector': '#scrollToMe'}
    });

    let activator = new Activator();

    expect(ScrollToElement.activate).toBeCalledTimes(0);
    activator.activate(actionConfigModel);
    expect(ScrollToElement.activate).toBeCalledTimes(1);
    activator.deactivate(actionConfigModel);
    expect(ScrollToElement.deactivate).toBeCalledTimes(1);
});