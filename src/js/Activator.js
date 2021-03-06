import AddClass from './actions/AddClass'
import ScrollToElement from "./actions/ScrollToElement";
import ClosedCaption from "./actions/ClosedCaption";

/**
 * Activator. Knows how to activate and deactivate actions
 */
 export default class Activator {
    /**
     * Activates or deactivates an action
     *
     * @param {string} name
     * @param {object} options
     * @param {string} method either activate or deactivate.
     * @private
     */
    _do(name, options, method) {
        switch (name.toLowerCase()) {
            case 'addclass':
                if(!this._verifyAction(AddClass, 'AddClass')) break;
                AddClass[method](options);
                break;
            case 'scrolltoelement':
                if(!this._verifyAction(ScrollToElement, 'scrollToElement')) break;
                ScrollToElement[method](options);
                break;
            case 'cc':
            case 'closed_caption':
                if(!this._verifyAction(ClosedCaption, 'cc')) break;
                ClosedCaption[method](options);
                break;
        }
    }

    /**
     * @param {ActionModel} action
     */
    activate(action) {
        this._do(action.name, action.options, 'activate');
    }

    /**
     * @param {ActionModel} action
     */
    deactivate(action) {
        this._do(action.name, action.options, 'deactivate');
    }

    /**
     * Verifies that an so called action really is one.
     * If it is, it returns true. false otherwise.
     *
     * @param action
     * @param {string} name
     * @private
     */
    _verifyAction(action, name)
    {
        if( !action.hasOwnProperty('activate') ||
            !action.hasOwnProperty('deactivate') ||
            typeof action.activate !== 'function' ||
            typeof action.deactivate !== 'function'
        ) {
            console.error('ActionFactory: The action called "'+name+'" was not really an action because it did not have both the activate and deactivate methods.');
            return false;
        }
        return action;
    }
}