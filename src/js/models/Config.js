/**
 * The config object holds configuration data for ForestGuide itself.
 * It does not contain guidance data.
 */
export default class Config {
    constructor(configObject) {
        if(typeof configObject === 'undefined') configObject = {};

        this._rootUrl = configObject.hasOwnProperty('rootUrl') && typeof configObject.rootUrl === "string" ? configObject.rootUrl : 'forestguide/';
        if(this._rootUrl.substr(this.rootUrl.length -1) !== '/') this._rootUrl += '/';
        this._loadingClass = configObject.hasOwnProperty('loadingClass') && typeof configObject.loadingClass === "string" ? configObject.loadingClass : 'loading';
        this._playingClass = configObject.hasOwnProperty('playingClass') && typeof configObject.playingClass === "string" ? configObject.playingClass : 'playing';
    }

    /**
     * The url where all ForestGuide data can be retrieved from
     *
     * @returns {string}
     */
    get rootUrl() {
        return this._rootUrl;
    }

    /**
     * The class to add to buttons when data is loading
     *
     * @return {string|*}
     */
    get loadingClass() {
        return this._loadingClass;
    }

    /**
     * The class to add to buttons when they are playing
     *
     * @return {string|*}
     */
    get playingClass() {
        return this._playingClass;
    }
}