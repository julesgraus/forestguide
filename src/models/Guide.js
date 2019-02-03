import Cue from "./Cue"

/**
 * Defines Guide data.
 */
export default class Guide {
    constructor() {
        this._soundFile = '';
        this._cues = [];
    }

    /**
     * Create a new instance from a json object
     *
     * @param object
     * @return {null|Guide}
     */
    static fromJson(object) {
        let trueOrError = Guide.validate(object);
        if(trueOrError !== true) {
            console.error(trueOrError);
            return null;
        }

        let instance = new Guide();
        instance._soundFile = object.soundFile;
        instance._cues = object.cues;
        return instance;
    }

    /**
     * Returns true if the given object is a valid Guide. Or a string containing errors if not valid
     *
     * @param object
     * @return {boolean|string}
     */
     static validate(object) {
        if(!object.hasOwnProperty("soundFile") || typeof object.soundFile !== "string") return "Guide: The guide is not valid. It must have a string property called soundFile.";
        if(!object.hasOwnProperty("cues") || !Array.isArray(object.cues)) return "Guide: The guide is not valid. It must have an array property called 'cues'";

        let cueCount = object.cues.length;
        for(let index = 0; index < cueCount; index++) {
            let cue = object.cues[index];
            let trueOrError = Cue.validate(cue);
            if(trueOrError !== true) return trueOrError;
        }

        return true;
    }

    /**
     * @return {string}
     */
    get soundFile() {
        return this._soundFile;
    }

    /**
     * @return {Cue[]}
     */
    get cues() {
        return this._cues;
    }
}