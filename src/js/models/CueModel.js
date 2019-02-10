import ActionModel from "./ActionModel"
import GuideModel from "./GuideModel";

/**
 * Defines Cue data that belongs to a Guide
 *
 * @see GuideModel
 */
export default class CueModel {
    constructor() {
        this._start = 0;
        this._end = 0;
        this._actions = [];
    }

    /**
     * Create a new instance from a json object
     *
     * @param object
     */
    static fromJson(object) {
        let trueOrError = CueModel.validate(object);
        if(trueOrError !== true) {
            console.error(trueOrError);
            return null;
        }

        let instance = new CueModel();
        instance._start = object.start;
        instance._end = object.end;
        instance._actions = object.actions;
        return instance;
    }

    /**
     * Returns true if the object has valid cue data. And a string containing errors if not valid.
     *
     * @param object
     */
    static validate(object) {
        if(typeof object === "undefined") return "Cue: The cue is not valid because it was undefined";
        if (!object.hasOwnProperty('start') || typeof object.start !== "number") return "Cue: The cue was not valid. It must contain a number property called start";
        if (!object.hasOwnProperty('end') || typeof object.end !== "number") return "Cue: The cue was not valid. It must contain a number property called end";

        if (!object.hasOwnProperty('actions') || !Array.isArray(object.actions)) return "Cue: The cue was not valid. It must contain an array property called actions";

        let actionCount = object.actions.length;
        for(let index = 0; index < actionCount; index++) {
            let action = object.actions[index];
            let trueOrError = ActionModel.validate(action);
            if(trueOrError !== true) return trueOrError;
        }

        return true;
    }

    /**
     * @return {number}
     */
    get start() {
        return this._start;
    }

    /**
     * @return {number}
     */
    get end() {
        return this._end;
    }

    /**
     * @return {string}
     */
    get selector() {
        return this._selector;
    }

    /**
     * @return {ActionModel[]}
     */
    get actions() {
        return this._actions;
    }
}