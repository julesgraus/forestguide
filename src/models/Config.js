/**
 * The config object holds configuration data for ForestGuide itself.
 * It does not contain guidance data.
 */
export default class Config {
    constructor(configObject) {
        if(typeof configObject === 'undefined') configObject = {};

        this._rootUrl = configObject.hasOwnProperty('rootUrl') || typeof configObject.rootUrl !== "string" ? configObject.rootUrl : 'forestguide';
    }

    /**
     * The url where all ForestGuide data can be retrieved from
     *
     * @returns {string}
     */
    get rootUrl() {
        return this._rootUrl;
    }
}