/**
 * Closed caption action.
 *
 * Shows a closed caption.
 */
let ccElement = false;
export default class ClosedCaption {
    /**
     * Activates the action
     *
     * @param {object} options
     * @return {boolean}
     */
    static activate(options)
    {
        let validatedOptions = ClosedCaption._validateOptions(options);
        if(!validatedOptions) return false;
        ClosedCaption._initialize(options.wrapperClass);

        ccElement.innerHTML = `<p>${options.text}</p>`;
        ccElement.hidden = false;
    }

    /**
     * De-activates that action
     *
     * @param options
     * @return {boolean}
     */
    static deactivate(options)
    {
        let validatedOptions = ClosedCaption._validateOptions(options);
        if(!validatedOptions) return false;
        ClosedCaption._initialize(options.wrapperClass);

        ccElement.hidden = true;
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
            console.error('ClosedCaption: The options parameter was not an expected object.');
            return false;
        }
        if(!options.hasOwnProperty('text') || typeof options.text !== 'string') {
            console.error('ClosedCaption: The options object does not have an string property called text');
            return false;
        }
        if(!options.hasOwnProperty('wrapperClass') || typeof options.wrapperClass !== 'string') options['wrapperClass'] = 'fg-closed-caption';

        return options
    }

    static _moveOutOfTheWay() {
        if(ccElement.classList.contains('bottom')) {
            ccElement.classList.add('top');
            ccElement.classList.remove('bottom');
        } else if(ccElement.classList.contains('top')) {
            ccElement.classList.add('bottom');
            ccElement.classList.remove('top');
        }
    }

    /**
     * Add the cc html to the page if needed.
     *
     * @param wrapperClass
     */
    static _initialize(wrapperClass) {
        if(ccElement) return;

        ccElement = document.createElement('div');
        ccElement.classList.add(wrapperClass, 'bottom');
        ccElement.hidden = true;
        ccElement.addEventListener('mouseenter', ClosedCaption._moveOutOfTheWay.bind(ClosedCaption));
        ccElement.addEventListener('click', ClosedCaption._moveOutOfTheWay.bind(ClosedCaption));
        document.body.appendChild(ccElement);
    }
}