/**
 * The config object holds configuration data for ForestGuide itself.
 * It does not contain guidance data.
 */
export default class ConfigModel {
    constructor(configObject) {
        if(typeof configObject === 'undefined') configObject = {};

        this._rootUrl = configObject.hasOwnProperty('rootUrl') && typeof configObject.rootUrl === "string" ? configObject.rootUrl : 'forestguide/';
        if(this._rootUrl.substr(this.rootUrl.length -1) !== '/') this._rootUrl += '/';
        this._loadingClass = configObject.hasOwnProperty('loadingClass') && typeof configObject.loadingClass === "string" ? configObject.loadingClass : 'loading';
        this._playingClass = configObject.hasOwnProperty('playingClass') && typeof configObject.playingClass === "string" ? configObject.playingClass : 'playing';
        this._presence_notification_selector = configObject.hasOwnProperty('presenceNotificationSelector') && typeof configObject.presenceNotificationSelector === "string" ? configObject.presenceNotificationSelector : '.fgPresenceNotification';
        this._presence_notification_close_button_selector = configObject.hasOwnProperty('presenceNotificationCloseButtonSelector') && typeof configObject.presenceNotificationCloseButtonSelector === "string" ? configObject.presenceNotificationCloseButtonSelector : '.close';
        this._presence_notification_class_to_remove = configObject.hasOwnProperty('presenceNotificationClassToRemove') && typeof configObject.presenceNotificationClassToRemove === "string" ? configObject.presenceNotificationClassToRemove : '';
        this._presence_notification_class_to_add = configObject.hasOwnProperty('presenceNotificationClassToAdd') && typeof configObject.presenceNotificationClassToAdd === "string" ? configObject.presenceNotificationClassToAdd : '';
        this._presence_notification_close_class_to_remove = configObject.hasOwnProperty('presenceNotificationCloseClassToRemove') && typeof configObject.presenceNotificationCloseClassToRemove === "string" ? configObject.presenceNotificationCloseClassToRemove : '';
        this._presence_notification_close_class_to_add = configObject.hasOwnProperty('presenceNotificationCloseClassToAdd') && typeof configObject.presenceNotificationCloseClassToAdd === "string" ? configObject.presenceNotificationCloseClassToAdd : '';
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

    /**
     * The class to select notification HTMLElements that
     * hold a notification to hint the user of the presence of forest guide.
     * The notification must tell the user how he can get started with forest guide.
     *
     * @return {string|*}
     */
    get presenceNotificationSelector() {
        return this._presence_notification_selector;
    }

    /**
     * The selector to select close buttons in presence notification HTMLElements.
     *
     * @return {string|*}
     */
    get presenceNotificationCloseButtonSelector() {
        return this._presence_notification_close_button_selector;
    }

    /**
     * The class to remove from the presence notification HTMLElements when they are closed.
     *
     * @return {string|*}
     */
    get presenceNotificationCloseClassToRemove() {
        return this._presence_notification_close_class_to_remove;
    }

    /**
     * The class to add to the presence notification HTMLElements when they are closed.
     * If you don't specify the class, the notification will be removed from the dom.
     *
     * @return {string|*}
     */
    get presenceNotificationCloseClassToAdd() {
        return this._presence_notification_close_class_to_add;
    }

    /**
     * The class to remove from presence notification HTMLElements when they need to be visible
     *
     * @return {string|string}
     */
    get presenceNotificationClassToRemove() {
        return this._presence_notification_class_to_remove;
    }

    /**
     * The class to add from presence notification HTMLElements when they need to be visible
     *
     * @return {string|string}
     */
    get presenceNotificationClassToAdd() {
        return this._presence_notification_class_to_add;
    }
}