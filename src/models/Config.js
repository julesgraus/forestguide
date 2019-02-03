export default class Config {
    constructor(configObject) {
        if(typeof configObject === 'undefined') configObject = {};

        this._rootUrl = configObject.hasOwnProperty('rootUrl') ? configObject.rootUrl : 'forestguide';
    }

    /**
     * The url where all ForestGuide data can be retrieved from
     *
     * @returns {string}
     */
    getRootUrl() {
        return this._rootUrl;
    }
}