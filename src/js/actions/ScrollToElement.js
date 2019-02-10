/**
 * ScrollToElement action.
 *
 * Scrolls to an element that matches a certain selector
 */
export default class ScrollToElement {
    /**
     * Activates the action
     *
     * @param {object} options
     * @return {boolean}
     */
    static activate(options)
    {
        let validatedOptions = ScrollToElement._validateOptions(options);
        if(!validatedOptions) return false;

        let element = document.querySelector(validatedOptions.selector);
        if(!element) return false;

        element.scrollIntoView({behavior: options.behaviour, block: options.vertical_alignment, inline: options.horizontal_alignment});
    }

    /**
     * De-activates that action
     *
     * @param options
     * @return {boolean}
     */
    static deactivate(options)
    {
        //Not implemented. Method must be present for the framework
    }

    /**
     * Validates given options object. And if needed, set defaults on that object.
     *
     * @param {object} options
     * @return {boolean|object} Boolean false if not valid. options object when valid
     * @private
     */
    static _validateOptions(options)
    {
        if(typeof options !== 'object') {
            console.error('ScrollToElement: The options parameter was not an expected object.');
            return false;
        }
        if(!options.hasOwnProperty('selector') || typeof options.selector !== 'string') {
            console.error('ScrollToElement: The options object does not have an string property called selector');
            return false;
        }
        if(!options.hasOwnProperty('behavior') || typeof options.behavior !== 'string') options['behaviour'] = "smooth";
        if(['smooth', 'auto'].indexOf(options.behavior) === -1) options['behaviour'] = 'smooth';

        if(!options.hasOwnProperty('horizontal_alignment') || typeof options.horizontal_alignment !== 'string') options['horizontal_alignment'] = "nearest";
        if(["start", "center", "end", "nearest"].indexOf(options.horizontal_alignment) === -1) options['horizontal_alignment'] = "nearest";

        if(!options.hasOwnProperty('vertical_alignment') || typeof options.vertical_alignment !== 'string') options['vertical_alignment'] = "center";
        if(["start", "center", "end", "nearest"].indexOf(options.vertical_alignment) === -1) options['horizontal_alignment'] = "center";

        return options
    }
}