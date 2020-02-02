/**
 * Does know how to retrieve data using get requests.
 *
 * It's like a rest client, but does not have all the features.
 */
export default class DataRetriever {
    constructor()
    {
        //Initialize vars
        this._headers  = {};
        this._request = null;
        this._username = null;
        this._password = null;
        this._responseType = 'text';

        this._open = this._open.bind(this);
    }

    /**
     * Intializes a connection
     *
     * @private
     * @return DataRetriever
     */
    _init() {
        this._request = new XMLHttpRequest();
        return this;
    }

    /**
     * Opens the connection and sets the request headers.
     *
     * @param method
     * @param url
     * @private
     *
     * @see setHeader
     */
    _open(method, url) {
        if(typeof method !== "string") {
            console.error('DataRetriever:_open The method must be a string');
            return;
        }

        this._request.open(method.toUpperCase(), url, true, this._username, this._password);
        for(let headerName in this._headers) {
            if(!this._headers.hasOwnProperty(headerName)) continue;
            this._request.setRequestHeader(headerName, this._headers[headerName]);
        }

        this._request.responseType = this._responseType;
    }

    /**
     * Send the request to the server
     *
     * @private
     */
    _send(successCallback, failureCallback) {
        let self = this;

        this._request.onreadystatechange = function() {
             switch (self._request.readyState) {
                 // case XMLHttpRequest.UNSENT:
                 //     break;
                 // case XMLHttpRequest.OPENED:
                 //     break;
                 // case XMLHttpRequest.HEADERS_RECEIVED:
                 //     break;
                 // case XMLHttpRequest.LOADING:
                 //     break;
                 case XMLHttpRequest.DONE:
                     switch (self._request.status) {
                         case 200:
                             successCallback.call(self, self._request.response);
                             break;
                         default:
                             failureCallback.call(self, self._request.statusText);
                             break;
                     }
                     break;
             }
        };
        this._request.send();
    }

    /**
     * Set the expected response type
     *
     * @param {string} type
     */
    set responseType(type) {
        let supportedTypes = ['text', 'arraybuffer', 'blob', 'document'];

        if(typeof type !== "string" || supportedTypes.indexOf(type) === -1) {
            console.error('Dataretriever:setResponseType: The type was not valid. It must be one of these: '+supportedTypes.join(', '));
            return this;
        }
        this._responseType = type;
    }

    /**
     * Get the response type
     */
    get responseType() {
        return this._responseType;
    }

    /**
     * Removes all headers you've set with setHeader
     *
     * @return DataRetriever
     */
    clearHeaders() {
        this._headers = {};
    }

    /**
     * Sets / overrides a header for the next request
     *
     * @param {string} headerName
     * @param {string} headerValues
     * @return DataRetriever
     */
    setHeader(headerName, headerValues) {
        if(typeof headerName !== "string") {
            console.error('Dataretriever:setHeader: The name of a header must be string');
            return this;
        }

        if(typeof headerValues !== "string") {
            console.error('Dataretriever:setHeader: The value(s) of a header must be string');
            return this;
        }

        this._headers[headerName] = headerValues;
        return this;
    }

    /**
     *
     * @param headerName
     * @return {null|string}
     */
    getHeader(headerName) {
        if (this._headers.hasOwnProperty(headerName)) return this._headers[headerName];
        return null;
    }


    /**
     * Sets the username for when performing a request
     *
     * @param value
     */
    set username(value) {
        if(typeof value !== "string") {
            console.error('DataRetriever:username The username must be a string');
            return;
        }
        this._username = value;
    }

    /**
     * Returns the username for the requests
     * @return {null}
     */
    get username() {
        return this._username;
    }


    /**
     * Sets a password for when performing a request
     *
     * @param value
     */
    set password(value) {
        if(typeof value !== "string") {
            console.error('DataRetriever:password The password must be a string');
            return;
        }
        this._password = value;
    }

    /**
     * Returns the password used for requests.
     *
     * @return {null}
     */
    get password() {
        return this._password;
    }

    /**
     * Perform a HTTP Get request.
     * Returns a promise that either resolves to a response. Or rejects with a status text
     *
     * @param {string} url
     * @return {Promise}
     */
    get(url) {
        let self = this;

        if(typeof url !== "string") {
            console.error('DataRetriever:get The url must be a string');
            return Promise.reject('DataRetriever:get The url must be a string'); //Return a rejected promise
        }

        return new Promise(function(resolve, reject) {
            self._init();
            self._open("GET", url);
            self._send(resolve, reject);
        });
    }
}