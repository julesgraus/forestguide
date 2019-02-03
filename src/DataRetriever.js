/**
 * Does know how to retrieve data using get requests.
 *
 * It's like a rest client, but does not have all the features.
 */
export default class DataRetriever {
    constructor()
    {
        this._headers  = {};
        this._request = null;
        this._username = null;
        this._password = null;
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

        if(typeof url !== "string") {
            console.error('DataRetriever:_open The url must be a string');
            return;
        }

        this._request.open(method.toUpperCase(), url, true, self._username, self._password);
        for(let headerName in self._headers) {
            this._request.setRequestHeader(headerName, self._headers[headerName]);
        }
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
                 case XMLHttpRequest.UNSENT:
                     break;
                 case XMLHttpRequest.OPENED:
                     break;
                 case XMLHttpRequest.HEADERS_RECEIVED:
                     break;
                 case XMLHttpRequest.LOADING:
                     break;
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
     * @param headerName
     * @param headerValues
     * @return DataRetriever
     */
    setHeader(headerName, headerValues) {
        this._headers[headerName] = headerValues;
        return this;
    }

    /**
     * Sets the username for when performing a request
     *
     * @param value
     */
    setUsername(value) {
        if(typeof value !== "string") {
            console.error('DataRetriever:setUsername The username must be a string');
            return;
        }
        this._username = value;
    }

    /**
     * Sets a password for when performing a request
     *
     * @param value
     */
    setPassword(value) {
        if(typeof value !== "string") {
            console.error('DataRetriever:setPassword The password must be a string');
            return;
        }
        this._password = value;
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