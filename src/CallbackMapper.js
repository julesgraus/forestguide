/**
 * Registers actions and can map those to callbacks.
 *
 * It provides methods to trigger actions that trigger callbacks.
 * It also provides methods to register those callbacks
 */
export default class CalbackMapper {
    /**
     * CallbackMapper constructor
     */
    constructor() {
        this._callbackMap = {};
        this._argumentsMap = {};
    }

    /**
     * Registers a callback to an action that you can trigger with the trigger method.
     * You can also pass in
     *
     * @param  {string} action
     * @param {function} callback
     * @param {array} arguments
     */
    on(action, callback, arguments = []) {
        if(typeof action !== "string") {
            console.error('CallbackMapper: not registering callback since the action is not a string');
            return;
        }
        if(typeof callback !== "function") {
            console.error('CallbackMapper: not registering callback since the callback is not a function');
            return;
        }
        if(!Array.isArray(arguments)) {
            console.error('CallbackMapper: not registering callback since the arguments parameter is not an array');
            return;
        }

        if(!this._callbackMap.hasOwnProperty(action)) this._callbackMap[action] = [];
        if(!this._argumentsMap.hasOwnProperty(action)) this._argumentsMap[action] = [];

        this._callbackMap[action][this._callbackMap.length] = callback;
        this._argumentsMap[action][this._argumentsMap.length] = arguments;
    }

    /**
     * @param {string} action
     */
    trigger(action) {
        if(typeof action !== "string") {
            console.error('CallbackMapper: not triggering callback since the action is not a string');
            return;
        }

        if(!this._callbackMap.hasOwnProperty(action) || this._argumentsMap.hasOwnProperty(action)) {
            return;
        }

        this._callbackMap[action].apply(this, this._argumentsMap[action]);
    }
}