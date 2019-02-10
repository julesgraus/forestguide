/**
 * Defines Action data that belongs to a Cue.
 *
 * @see CueModel
 */
export default class ActionModel {
    constructor() {
        this._name = '';
        this._options = {};
        this._instance = null; //
    }

    /**
     * Create a new instance from a json object
     *
     * @param object
     */
    static fromJson(object) {
        let trueOrError = ActionModel.validate(object);
        if(trueOrError !== true) {
            console.error(trueOrError);
            return null;
        }

        let instance = new ActionModel();
        instance._name = object.name;
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
        if (!object.hasOwnProperty('name') || typeof object.name !== "string") return "Action: The action was not valid. It must contain a string property called name";
        if (!object.hasOwnProperty('options') || typeof object.options !== "object") return "Action: The action was not valid. It must contain an object property called options";

        return true;
    }

    /**
     * @return {string}
     */
    get name() {
        return this._name;
    }

    /**
     * @return {{}}
     */
    get options() {
        return this._options;
    }
}