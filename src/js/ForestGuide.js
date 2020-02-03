import AudioPlayer from './AudioPlayer';
import ConfigModel from './models/ConfigModel';
import DataRetriever from './DataRetriever';
import GuideModel from './models/GuideModel';
import ActionProcessor from './ActionProcessor';
import Cookies from './Cookies';

/**
 * ForestGuide. Guides users through your app.
 */
export default class ForestGuide {
    /**
     * The forest guide constructor
     *
     * @param {object} config
     */
    constructor(config) {

        //Initialize dependencies
        this._dataRetriever = new DataRetriever();
        this._config = new ConfigModel(config);
        this._audioPlayer = new AudioPlayer();
        this._actionProcessor = new ActionProcessor();
        this._cookies = new Cookies();
        
        //initialize scalar variables
        this._guideDataAttributeName = 'forest-guide'; //The data attribute name will hold the name of the guide that must be played when clicking the button
        this._camelCasedGuideDataAttributeName = 'forestGuide';
        this._presenceNotificationCookieName = 'presence_notification_closed';

        //Will hold al guide buttons. When you click these, the guide will start playing.
        this._guideButtons = null;

        //Force functions to be bound to this instance
        this._guideButtonClicked = this._guideButtonClicked.bind(this);
        this._startOrStopGuidance = this._startOrStopGuidance.bind(this);

        //Further initialize the class by delegating to other methods
        this._initializeGuideButtons();
        this._addListenersToPresenceNotifications();
        this._initializePresenceNotificationClasses();
    }

    /**
     * Scans the document for elements which match the guideButtonSelector.
     * And links them to this class so that when they are clicked the appropriate guide will
     * be loaded, by using the attributes value.
     *
     * @private
     */
    _initializeGuideButtons()
    {
        let selector = "[data-"+this._guideDataAttributeName+"]";
        this._guideButtons = document.querySelectorAll(selector);

        this._guideButtons.forEach(function(guideButton) {
            guideButton.addEventListener('click', this._guideButtonClicked);
        }.bind(this))
    }

    /**
     * Triggered when a guide button is clicked
     *
     * @param {MouseEvent} mouseEvent
     * @private
     */
    _guideButtonClicked(mouseEvent) {
        let button = mouseEvent.target;
        mouseEvent.preventDefault();
        if(!this._guideDataAttributeName in button.dataset) {
            console.error('Could process a click on a ForestGuide guide button since it did not contain the data attribute "data-'+this._guideDataAttributeName+'" anymore.')
        }

        let guideName = button.dataset[this._camelCasedGuideDataAttributeName];

        this._dataRetriever.get(this._config.rootUrl+guideName+'.json').then(function(response) {
            let json = {};
            try {
                json = JSON.parse(response);
            } catch (e) {
                console.error('ForestGuide: The json as denoted in the guide "'+guideName+'" was invalid. '+e.message);
                return;
            }

            let guideModel = GuideModel.fromJson(json);
            this._startOrStopGuidance(guideModel, button);
        }.bind(this)).catch(function(reason) {
            console.error('ForestGuide: Could not retrieve guide "'+guideName+'" because of an error: '+reason);
        })
    }

    /**
     * @param {GuideModel} guide
     * @param button The guide button that was clicked and eventually triggered this method
     * @private
     */
    _startOrStopGuidance(guide, button) {
        this._actionProcessor.loadGuide(guide);
        if(this._audioPlayer.isPlaying() === false) {
            this._audioPlayer.onLoading(function () {
                button.classList.add(this._config.loadingClass);
                button.classList.remove(this._config.playingClass);
            }.bind(this)).onPlay(function () {
                button.classList.remove(this._config.loadingClass);
                button.classList.add(this._config.playingClass);
            }.bind(this)).onPause(function () {
                button.classList.remove(this._config.loadingClass);
                button.classList.remove(this._config.playingClass);
                this._actionProcessor.deactivate();
            }.bind(this)).onPlayProgress(function () {
                this._actionProcessor.tick(this._audioPlayer.getCurrentTime());
            }.bind(this)).onFinish(function () {
                button.classList.remove(this._config.loadingClass);
                button.classList.remove(this._config.playingClass);
            }.bind(this)).onStopped(function () {
                button.classList.remove(this._config.loadingClass);
                button.classList.remove(this._config.playingClass);
                this._actionProcessor.deactivate();
            }.bind(this));
            this._audioPlayer.load(this._config.rootUrl + guide.soundFile);
            this._audioPlayer.play();
        } else {
            this._audioPlayer.stop();
            // this._audioPlayer.pause(); //Also a possibility to use.
        }
    }

    /**
     * Add listeners to close buttons in notifications that will either add a class to them to "close" them.
     * Or if the class isn't specified, will remove them.
     * 
     * @private
     */
    _addListenersToPresenceNotifications() {
        let notificationElements = document.querySelectorAll(this._config.presenceNotificationSelector);

        notificationElements.forEach(
            /** @param {HTMLElement} notification*/
            (notification) => {
                let closeButton = notification.querySelector(this._config.presenceNotificationCloseButtonSelector);
                if(!closeButton) return;

                closeButton.addEventListener('click', () => {
                    if(this._config.presenceNotificationCloseClassToAdd !== '') notification.classList.add(this._config.presenceNotificationCloseClassToAdd);

                    if(this._config.presenceNotificationCloseClassToRemove === '' && notification.parentElement) notification.parentElement.removeChild(notification);
                    else notification.classList.remove(this._config.presenceNotificationCloseClassToRemove);

                    this._cookies.set(this._presenceNotificationCookieName, 1, null);
                })
            }
        );
    }

    _initializePresenceNotificationClasses() {
        let notificationElements = document.querySelectorAll(this._config.presenceNotificationSelector);
        let presenceNotified = this._cookies.get(this._presenceNotificationCookieName);
        if(presenceNotified) {
            return;
        }

        notificationElements.forEach(
            /** @param {HTMLElement} notification*/
            (notification) => {
                if(this._config.presenceNotificationClassToAdd !== '') notification.classList.add(this._config.presenceNotificationClassToAdd);
                if(this._config.presenceNotificationClassToRemove !== '') notification.classList.remove(this._config.presenceNotificationClassToRemove);
            }
        );
    }
}

//Link forest guide to the window object (global namespace) so that other scripts can utilize it.
window.ForestGuide = ForestGuide;