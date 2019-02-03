/**
 * Defines Action data that belongs to a Cue
 *
 * @see Cue
 */
export default class Action {
    constructor() {
        this._type = '';
        this._options = {};
    }

    /**
     * Create a new instance from a json object
     *
     * @param object
     */
    static fromJson(object) {
        let trueOrError = Action.validate(object);
        if(trueOrError !== true) {
            console.error(trueOrError);
            return null;
        }

        let instance = new Action();
        instance._type = object.type;
        instance._options = object.options;
        return instance;
    }

    /**
     * Returns true if the object has valid action data. And a string containing errors if not valid.
     *
     * @param object
     */
    static validate(object) {
        if(typeof object === "undefined") return "Action: The action is not valid because it was undefined";
        if (!object.hasOwnProperty('type') || typeof object.type !== "string") return "Action: The action was not valid. It must contain a string property called type";
        if (!object.hasOwnProperty('options') || typeof object.options !== "object") return "Action: The action was not valid. It must contain an object property called options";

        return true;
    }

    /**
     * @return {string}
     */
    get type() {
        return this._type;
    }

    /**
     * @return {{}}
     */
    get options() {
        return this._options;
    }
}