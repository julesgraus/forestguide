/**
 * AddClass action.
 *
 * Adds a class to an element.
 */
export default class AddClass {
    /**
     * Activates the action
     *
     * @param {object} options
     * @return {boolean}
     */
    static activate(options)
    {
        let validatedOptions = AddClass._validateOptions(options);
        if(!validatedOptions) return false;

        let elements = document.querySelectorAll(validatedOptions.selector);
        elements.forEach(
            /**
             * @param {Element} element
             */
            function(element) {
                if(element.classList.contains(validatedOptions.class)) return;
                element.classList.add(validatedOptions.class);
            }
        )
    }

    /**
     * De-activates that action
     *
     * @param options
     * @return {boolean}
     */
    static deactivate(options)
    {
        let validatedOptions = AddClass._validateOptions(options);
        if(!validatedOptions) return false;

        let elements = document.querySelectorAll(validatedOptions.selector);
        elements.forEach(
            /**
             * @param {Element} element
             */
            function(element) {
                element.classList.remove(validatedOptions.class);
            }
        )
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
            console.error('AddClass: The options parameter was not an expected object.');
            return false;
        }
        if(!options.hasOwnProperty('selector') || typeof options.selector !== 'string') {
            console.error('AddClass: The options object does not have an string property called selector');
            return false;
        }
        if(!options.hasOwnProperty('class') || typeof options.selector !== 'string') options['class'] = 'fg-blink-border';

        return options
    }
}