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
        this._argsMap = {};
    }

    /**
     * Registers a callback to an action that you can trigger with the trigger method.
     * You can also pass in arguments to pass into the callback when it is being triggered.
     *
     * @param  {string} action
     * @param {function} callback
     * @param {array} args
     */
    on(action, callback, args = []) {
        if(typeof action !== "string") {
            console.error('CallbackMapper: not registering callback since the action is not a string');
            return;
        }
        if(typeof callback !== "function") {
            console.error('CallbackMapper: not registering callback since the callback is not a function');
            return;
        }
        if(!Array.isArray(args)) {
            console.error('CallbackMapper: not registering callback since the args parameter is not an array');
            return;
        }
        if(!this._callbackMap.hasOwnProperty(action)) this._callbackMap[action] = [];
        if(!this._argsMap.hasOwnProperty(action)) this._argsMap[action] = [];

        this._callbackMap[action].push(callback);
        this._argsMap[action].push(args);
    }

    /**
     * @param {string} action
     */
    trigger(action) {
        if(typeof action !== "string") {
            console.error('CallbackMapper: not triggering callback since the action is not a string');
            return;
        }

        if(!this._callbackMap.hasOwnProperty(action) && !this._argsMap.hasOwnProperty(action)) {
            return;
        }

        let callbacksCount = this._callbackMap[action].length;
        for(let index = 0; index < callbacksCount; index++) {
            this._callbackMap[action][index].apply(this, this._argsMap[action][index]);
        }
    }
}