import Config from './models/Config';
import DataRetriever from './DataRetriever';
import Guide from './models/Guide';

/**
 * @class ForestGuide. Guides users through your app.
 */
export default class ForestGuide {
    /**
     * The forest guide constructor
     *
     * @param {object} config
     */
    constructor(config)
    {
        //Initialize dependencies
        this._dataRetriever = new DataRetriever();
        this._config = new Config(config);

        //initialize scalar variables
        this._guideDataAttributeName = 'forest-guide';
        this._camelCasedGuideDataAttributeName = 'forestGuide';

        //Initialize html elements
        this._guideButtons = null;

        //Further initialize the class by delegating to other methods
        this._initializeGuideButtons();
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
        let self = this;
        let selector = "[data-"+this._guideDataAttributeName+"]";
        this._guideButtons = document.querySelectorAll(selector);

        this._guideButtons.forEach(function(guideButton) {
            guideButton.addEventListener('click', self._guideButtonClicked.bind(self));
        })
    }

    /**
     * Triggered when a guide button is clicked
     *
     * @param {MouseEvent} mouseEvent
     * @private
     */
    _guideButtonClicked(mouseEvent) {
        let self = this;
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

            let guideModel = Guide.fromJson(json);
            self._startOrStopGuidance(guideModel);
        }).catch(function(reason) {
            console.error('ForestGuide: Could not retrieve guide "'+guideName+'" because of an error: '+reason);
        })
    }

    /**
     * @param {Guide} guide
     * @private
     */
    _startOrStopGuidance(guide) {
        console.log(guide);
    }
}

//Link forest guide to the window object (global namespace) so that other scripts can utilize it.
window.ForestGuide = ForestGuide;