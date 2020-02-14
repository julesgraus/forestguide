!function(e){var t={};function i(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";function n(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}i.r(t);var a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.reset()}var t,i,a;return t=e,(i=[{key:"reset",value:function(){this._callbackMap={},this._argsMap={}}},{key:"on",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];"string"==typeof e?"function"==typeof t?Array.isArray(i)?(this._callbackMap.hasOwnProperty(e)||(this._callbackMap[e]=[]),this._argsMap.hasOwnProperty(e)||(this._argsMap[e]=[]),this._callbackMap[e].push(t),this._argsMap[e].push(i)):console.error("CallbackMapper: not registering callback since the args parameter is not an array"):console.error("CallbackMapper: not registering callback since the callback is not a function"):console.error("CallbackMapper: not registering callback since the action is not a string")}},{key:"trigger",value:function(e){if("string"==typeof e){if(this._callbackMap.hasOwnProperty(e)||this._argsMap.hasOwnProperty(e))for(var t=this._callbackMap[e].length,i=0;i<t;i++)this._callbackMap[e][i].apply(this,this._argsMap[e][i].slice())}else console.error("CallbackMapper: not triggering callback since the action is not a string")}},{key:"clearCallbacksForAction",value:function(e){this._callbackMap.hasOwnProperty(e)&&delete this._callbackMap[e]}}])&&n(t.prototype,i),a&&n(t,a),e}();function o(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var r=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._callbackMapper=new a,this._audio=null,this._requestedPlay=!1,this._ignoreNextPause=!1,this._ignoreNextStop=!1,this._urlToLoad=null,this._urlLoaded=!1,this._isPlaying=!1}var t,i,n;return t=e,(i=[{key:"_enableListeners",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];if(!this._audio)return null;this._audio.removeEventListener("loadstart",this._loadStartHandler.bind(this)),this._audio.removeEventListener("durationchange",this._durationChangeHandler.bind(this)),this._audio.removeEventListener("loadedmetadata",this._loadedMetadataHandler.bind(this)),this._audio.removeEventListener("loadeddata",this._loadedDataHandler.bind(this)),this._audio.removeEventListener("progress",this._progressHandler.bind(this)),this._audio.removeEventListener("canplay",this._canPlayHandler.bind(this)),this._audio.removeEventListener("canplaytrough",this._canPlayTroughHandler.bind(this)),this._audio.removeEventListener("error",this._errorHandler.bind(this)),this._audio.removeEventListener("pause",this._pauseHandler.bind(this)),this._audio.removeEventListener("play",this._playHandler.bind(this)),this._audio.removeEventListener("timeupdate",this._timeUpdateHandler.bind(this)),this._audio.removeEventListener("ended",this._endedHandler.bind(this)),e&&(this._audio.addEventListener("loadstart",this._loadStartHandler.bind(this)),this._audio.addEventListener("durationchange",this._durationChangeHandler.bind(this)),this._audio.addEventListener("loadedmetadata",this._loadedMetadataHandler.bind(this)),this._audio.addEventListener("loadeddata",this._loadedDataHandler.bind(this)),this._audio.addEventListener("progress",this._progressHandler.bind(this)),this._audio.addEventListener("canplay",this._canPlayHandler.bind(this)),this._audio.addEventListener("canplaytrough",this._canPlayTroughHandler.bind(this)),this._audio.addEventListener("error",this._errorHandler.bind(this)),this._audio.addEventListener("pause",this._pauseHandler.bind(this)),this._audio.addEventListener("play",this._playHandler.bind(this)),this._audio.addEventListener("timeupdate",this._timeUpdateHandler.bind(this)),this._audio.addEventListener("ended",this._endedHandler.bind(this)))}},{key:"_loadStartHandler",value:function(e){if(!this._audio||this.isPlaying())return null;this._callbackMapper.trigger("loading")}},{key:"_durationChangeHandler",value:function(e){if(!this._audio)return null;this._callbackMapper.trigger("durationChanged")}},{key:"_loadedMetadataHandler",value:function(e){if(!this._audio)return null;this._callbackMapper.trigger("loadedMetaData")}},{key:"_loadedDataHandler",value:function(e){if(!this._audio)return null;this._callbackMapper.trigger("loadedData")}},{key:"_progressHandler",value:function(e){if(!this._audio)return null;this._callbackMapper.trigger("progress")}},{key:"_canPlayHandler",value:function(e){if(!this._audio)return null;!0===this._requestedPlay?(this._requestedPlay=!1,this._audio.play().then(function(){this._urlLoaded=!0,this._callbackMapper.trigger("play")}.bind(this)).catch((function(e){switch(console.error("Could not play because of an error: "),e){case"NotAllowedError":console.error("The browser does not allow to play the sound. (NotAllowedError)");break;case"NotSupportedError":console.error("The sound file isn't supported (NotSupportedError)");break;default:console.error(e)}}))):(this._urlLoaded=!0,this._callbackMapper.trigger("canPlay"))}},{key:"_canPlayTroughHandler",value:function(e){if(!this._audio)return null;this._callbackMapper.trigger("canPlayTrough")}},{key:"_errorHandler",value:function(e){if(!this._audio)return null;console.error("AudioPlayer:error An error occured: ",this._audio.error)}},{key:"_playHandler",value:function(e){if(this._isPlaying=!0,!this._audio)return null;this._callbackMapper.trigger("play")}},{key:"_pauseHandler",value:function(e){if(this._isPlaying=!1,!this._audio)return null;this._ignoreNextPause?this._ignoreNextPause=!1:this._callbackMapper.trigger("pause")}},{key:"_timeUpdateHandler",value:function(e){if(!this._audio||!this.isPlaying())return null;this._callbackMapper.trigger("playProgress")}},{key:"_endedHandler",value:function(e){if(this._isPlaying=!1,!this._audio)return null;this._callbackMapper.trigger("finish")}},{key:"onLoadedMetaData",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return i&&this._callbackMapper.clearCallbacksForAction("loadedMetaData"),this._callbackMapper.on("loadedMetaData",e,t),this}},{key:"onLoading",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return i&&this._callbackMapper.clearCallbacksForAction("loading"),this._callbackMapper.on("loading",e,t),this}},{key:"onLoadedData",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return i&&this._callbackMapper.clearCallbacksForAction("loadedData"),this._callbackMapper.on("loadedData",e,t),this}},{key:"onProgress",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return i&&this._callbackMapper.clearCallbacksForAction("progress"),this._callbackMapper.on("progress",e,t),this}},{key:"onDurationChanged",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return i&&this._callbackMapper.clearCallbacksForAction("durationChanged"),this._callbackMapper.on("durationChanged",e,t),this}},{key:"onCanPlay",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return i&&this._callbackMapper.clearCallbacksForAction("canPlay"),this._callbackMapper.on("canPlay",e,t),this}},{key:"onCanPlayTrough",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return i&&this._callbackMapper.clearCallbacksForAction("canPlayTrough"),this._callbackMapper.on("canPlayTrough",e,t),this}},{key:"onPlay",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return i&&this._callbackMapper.clearCallbacksForAction("play"),this._callbackMapper.on("play",e,t),this}},{key:"onPause",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return i&&this._callbackMapper.clearCallbacksForAction("pause"),this._callbackMapper.on("pause",e,t),this}},{key:"onStopped",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return i&&this._callbackMapper.clearCallbacksForAction("stop"),this._callbackMapper.on("stop",e,t),this}},{key:"onPlayProgress",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return i&&this._callbackMapper.clearCallbacksForAction("playProgress"),this._callbackMapper.on("playProgress",e,t),this}},{key:"onFinish",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return i&&this._callbackMapper.clearCallbacksForAction("finish"),this._callbackMapper.on("finish",e,t),this}},{key:"clearCallbacks",value:function(){this._callbackMapper.reset()}},{key:"_reset",value:function(){if(!this._audio)return null;this._ignoreNextStop=!0,this.stop(),this._ignoreNextStop=!1,this._enableListeners(!1)}},{key:"stop",value:function(){if(!this._audio||!this.isPlaying())return null;this._ignoreNextPause=!0,this._audio.pause(),this._audio.currentTime=0,this._ignoreNextStop||this._callbackMapper.trigger("stop"),this._ignoreNextPause=!1}},{key:"load",value:function(e){this._urlToLoad===e&&!0===this._urlLoaded||(this._urlToLoad=e,"string"==typeof e?(this._reset(),this._createNewAudioObject(e),this._enableListeners()):console.error("AudioPlayer:load Could not play the sound because the url wasn't a string."))}},{key:"_createNewAudioObject",value:function(e){this._audio=null,this._audio=new Audio(e)}},{key:"play",value:function(e){if(!this._audio)return null;this._ignoreNextStop=!0,this.stop(),this._ignoreNextStop=!1,this._requestedPlay=!0,this._urlLoaded&&this._canPlayHandler(null)}},{key:"pause",value:function(){if(!this._audio||!this.isPlaying())return null;this._audio.pause()}},{key:"setCurrentTime",value:function(e){if(!this._audio)return null;"number"==typeof e?this._audio.currentTime=e:console.error("AudioPlayer:setCurrentTime Did not receive a number. It must be the number of seconds you want to play from")}},{key:"getCurrentTime",value:function(){return this._audio?this._audio.currentTime:0}},{key:"buffered",value:function(){return this._audio?this._audio.buffered:new TimeRanges}},{key:"isPlaying",value:function(){return this._isPlaying}}])&&o(t.prototype,i),n&&o(t,n),e}();function s(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var l=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),void 0===t&&(t={}),this._rootUrl=t.hasOwnProperty("rootUrl")&&"string"==typeof t.rootUrl?t.rootUrl:"/forestguide/","/"!==this._rootUrl.substr(this.rootUrl.length-1)&&(this._rootUrl+="/"),this._loadingClass=t.hasOwnProperty("loadingClass")&&"string"==typeof t.loadingClass?t.loadingClass:"loading",this._playingClass=t.hasOwnProperty("playingClass")&&"string"==typeof t.playingClass?t.playingClass:"playing",this._presence_notification_selector=t.hasOwnProperty("presenceNotificationSelector")&&"string"==typeof t.presenceNotificationSelector?t.presenceNotificationSelector:".fgPresenceNotification",this._presence_notification_close_button_selector=t.hasOwnProperty("presenceNotificationCloseButtonSelector")&&"string"==typeof t.presenceNotificationCloseButtonSelector?t.presenceNotificationCloseButtonSelector:".close",this._presence_notification_class_to_remove=t.hasOwnProperty("presenceNotificationClassToRemove")&&"string"==typeof t.presenceNotificationClassToRemove?t.presenceNotificationClassToRemove:"",this._presence_notification_class_to_add=t.hasOwnProperty("presenceNotificationClassToAdd")&&"string"==typeof t.presenceNotificationClassToAdd?t.presenceNotificationClassToAdd:"",this._presence_notification_close_class_to_remove=t.hasOwnProperty("presenceNotificationCloseClassToRemove")&&"string"==typeof t.presenceNotificationCloseClassToRemove?t.presenceNotificationCloseClassToRemove:"",this._presence_notification_close_class_to_add=t.hasOwnProperty("presenceNotificationCloseClassToAdd")&&"string"==typeof t.presenceNotificationCloseClassToAdd?t.presenceNotificationCloseClassToAdd:""}var t,i,n;return t=e,(i=[{key:"rootUrl",get:function(){return this._rootUrl}},{key:"loadingClass",get:function(){return this._loadingClass}},{key:"playingClass",get:function(){return this._playingClass}},{key:"presenceNotificationSelector",get:function(){return this._presence_notification_selector}},{key:"presenceNotificationCloseButtonSelector",get:function(){return this._presence_notification_close_button_selector}},{key:"presenceNotificationCloseClassToRemove",get:function(){return this._presence_notification_close_class_to_remove}},{key:"presenceNotificationCloseClassToAdd",get:function(){return this._presence_notification_close_class_to_add}},{key:"presenceNotificationClassToRemove",get:function(){return this._presence_notification_class_to_remove}},{key:"presenceNotificationClassToAdd",get:function(){return this._presence_notification_class_to_add}}])&&s(t.prototype,i),n&&s(t,n),e}();function c(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var u=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._headers={},this._request=null,this._username=null,this._password=null,this._responseType="text",this._open=this._open.bind(this)}var t,i,n;return t=e,(i=[{key:"_init",value:function(){return this._request=new XMLHttpRequest,this}},{key:"_open",value:function(e,t){if("string"==typeof e){for(var i in this._request.open(e.toUpperCase(),t,!0,this._username,this._password),this._headers)this._headers.hasOwnProperty(i)&&this._request.setRequestHeader(i,this._headers[i]);this._request.responseType=this._responseType}else console.error("DataRetriever:_open The method must be a string")}},{key:"_send",value:function(e,t){var i=this;this._request.onreadystatechange=function(){switch(i._request.readyState){case XMLHttpRequest.DONE:switch(i._request.status){case 200:e.call(i,i._request.response);break;default:t.call(i,i._request.statusText)}}},this._request.send()}},{key:"clearHeaders",value:function(){this._headers={}}},{key:"setHeader",value:function(e,t){return"string"!=typeof e?(console.error("Dataretriever:setHeader: The name of a header must be string"),this):"string"!=typeof t?(console.error("Dataretriever:setHeader: The value(s) of a header must be string"),this):(this._headers[e]=t,this)}},{key:"getHeader",value:function(e){return this._headers.hasOwnProperty(e)?this._headers[e]:null}},{key:"get",value:function(e){var t=this;return"string"!=typeof e?(console.error("DataRetriever:get The url must be a string"),Promise.reject("DataRetriever:get The url must be a string")):new Promise((function(i,n){t._init(),t._open("GET",e),t._send(i,n)}))}},{key:"responseType",set:function(e){var t=["text","arraybuffer","blob","document"];if("string"!=typeof e||-1===t.indexOf(e))return console.error("Dataretriever:setResponseType: The type was not valid. It must be one of these: "+t.join(", ")),this;this._responseType=e},get:function(){return this._responseType}},{key:"username",set:function(e){"string"==typeof e?this._username=e:console.error("DataRetriever:username The username must be a string")},get:function(){return this._username}},{key:"password",set:function(e){"string"==typeof e?this._password=e:console.error("DataRetriever:password The password must be a string")},get:function(){return this._password}}])&&c(t.prototype,i),n&&c(t,n),e}();function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function h(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var f=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name="",this._options={},this._instance=null}var t,i,n;return t=e,n=[{key:"fromJson",value:function(t){var i=e.validate(t);if(!0!==i)return console.error(i),null;var n=new e;return n._name=t.name,n._options=t.options,n}},{key:"validate",value:function(e){return"object"!==d(e)||void 0===e?"Action: The action was not valid. The options parameter must be an object":e.hasOwnProperty("name")&&"string"==typeof e.name?!(!e.hasOwnProperty("options")||"object"!==d(e.options))||"Action: The action was not valid. It must contain an object property called options":"Action: The action was not valid. It must contain a string property called name"}}],(i=[{key:"name",get:function(){return this._name}},{key:"options",get:function(){return this._options}}])&&h(t.prototype,i),n&&h(t,n),e}();function p(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var _=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._start=0,this._end=0,this._actions=[]}var t,i,n;return t=e,n=[{key:"fromJson",value:function(t){var i=e.validate(t);if(!0!==i)return console.error(i),null;var n=new e;return n._start=t.start,n._end=t.end,n._actions=t.actions,n}},{key:"validate",value:function(e){if(void 0===e)return"CueModel: The cue is not valid because it was undefined";if(!e.hasOwnProperty("start")||"number"!=typeof e.start)return"CueModel: The cue was not valid. It must contain a number property called start";if(!e.hasOwnProperty("end")||"number"!=typeof e.end)return"CueModel: The cue was not valid. It must contain a number property called end";if(!e.hasOwnProperty("actions")||!Array.isArray(e.actions))return"CueModel: The cue was not valid. It must contain an array property called actions";for(var t=e.actions.length,i=0;i<t;i++){var n=e.actions[i],a=f.validate(n);if(!0!==a)return a}return!0}}],(i=[{key:"start",get:function(){return this._start}},{key:"end",get:function(){return this._end}},{key:"actions",get:function(){return this._actions}}])&&p(t.prototype,i),n&&p(t,n),e}();function v(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var y=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._soundFile="",this._cues=[]}var t,i,n;return t=e,n=[{key:"fromJson",value:function(t){var i=e.validate(t);if(!0!==i)return console.error(i),null;var n=new e;return n._soundFile=t.soundFile,n._cues=t.cues,n}},{key:"validate",value:function(e){if(void 0===e)return"Guide: The guide is not valid because it was undefined";if(!e.hasOwnProperty("soundFile")||"string"!=typeof e.soundFile)return"Guide: The guide is not valid. It must have a string property called soundFile.";if(!e.hasOwnProperty("cues")||!Array.isArray(e.cues))return"Guide: The guide is not valid. It must have an array property called 'cues'";for(var t=e.cues.length,i=0;i<t;i++){var n=e.cues[i],a=_.validate(n);if(!0!==a)return a}return!0}}],(i=[{key:"soundFile",get:function(){return this._soundFile}},{key:"cues",get:function(){return this._cues}}])&&v(t.prototype,i),n&&v(t,n),e}();function g(e){return(g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function b(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var m=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,i,n;return t=e,n=[{key:"activate",value:function(t){var i=e._validateOptions(t);if(!i)return!1;document.querySelectorAll(i.selector).forEach((function(e){e.classList.contains(i.class)||e.classList.add(i.class)}))}},{key:"deactivate",value:function(t){var i=e._validateOptions(t);if(!i)return!1;document.querySelectorAll(i.selector).forEach((function(e){e.classList.remove(i.class)}))}},{key:"_validateOptions",value:function(e){return"object"!==g(e)?(console.error("AddClass: The options parameter was not an expected object."),!1):e.hasOwnProperty("selector")&&"string"==typeof e.selector?(e.hasOwnProperty("class")&&"string"==typeof e.class||(e.class="fg-blink-border"),e):(console.error("AddClass: The options object does not have an string property called selector"),!1)}}],(i=null)&&b(t.prototype,i),n&&b(t,n),e}();function k(e){return(k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function C(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var w=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,i,n;return t=e,n=[{key:"activate",value:function(t){var i=e._validateOptions(t);if(!i)return!1;var n=document.querySelector(i.selector);if(!n)return!1;n.scrollIntoView({behavior:t.behaviour,block:t.vertical_alignment,inline:t.horizontal_alignment})}},{key:"deactivate",value:function(e){}},{key:"_validateOptions",value:function(e){return"object"!==k(e)?(console.error("ScrollToElement: The options parameter was not an expected object."),!1):e.hasOwnProperty("selector")&&"string"==typeof e.selector?(e.hasOwnProperty("behavior")&&"string"==typeof e.behavior||(e.behaviour="smooth"),-1===["smooth","auto"].indexOf(e.behavior)&&(e.behaviour="smooth"),e.hasOwnProperty("horizontal_alignment")&&"string"==typeof e.horizontal_alignment||(e.horizontal_alignment="nearest"),-1===["start","center","end","nearest"].indexOf(e.horizontal_alignment)&&(e.horizontal_alignment="nearest"),e.hasOwnProperty("vertical_alignment")&&"string"==typeof e.vertical_alignment||(e.vertical_alignment="center"),-1===["start","center","end","nearest"].indexOf(e.vertical_alignment)&&(e.horizontal_alignment="center"),e):(console.error("ScrollToElement: The options object does not have an string property called selector"),!1)}}],(i=null)&&C(t.prototype,i),n&&C(t,n),e}();function T(e){return(T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function P(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var O=!1,A=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,i,n;return t=e,n=[{key:"activate",value:function(t){if(!e._validateOptions(t))return!1;e._initialize(t.wrapperClass),O.innerHTML="<p>".concat(t.text,"</p>"),O.hidden=!1}},{key:"deactivate",value:function(t){if(!e._validateOptions(t))return!1;e._initialize(t.wrapperClass),O.hidden=!0}},{key:"_validateOptions",value:function(e){return"object"!==T(e)?(console.error("ClosedCaption: The options parameter was not an expected object."),!1):e.hasOwnProperty("text")&&"string"==typeof e.text?(e.hasOwnProperty("wrapperClass")&&"string"==typeof e.wrapperClass||(e.wrapperClass="fg-closed-caption"),e):(console.error("ClosedCaption: The options object does not have an string property called text"),!1)}},{key:"_moveOutOfTheWay",value:function(){O.classList.contains("bottom")?(O.classList.add("top"),O.classList.remove("bottom")):O.classList.contains("top")&&(O.classList.add("bottom"),O.classList.remove("top"))}},{key:"_initialize",value:function(t){O||((O=document.createElement("div")).classList.add(t,"bottom"),O.hidden=!0,O.addEventListener("mouseenter",e._moveOutOfTheWay.bind(e)),O.addEventListener("click",e._moveOutOfTheWay.bind(e)),document.body.appendChild(O))}}],(i=null)&&P(t.prototype,i),n&&P(t,n),e}();function M(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var L=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,i,n;return t=e,(i=[{key:"_do",value:function(e,t,i){switch(e.toLowerCase()){case"addclass":if(!this._verifyAction(m,"AddClass"))break;m[i](t);break;case"scrolltoelement":if(!this._verifyAction(w,"scrollToElement"))break;w[i](t);break;case"cc":case"closed_caption":if(!this._verifyAction(A,"cc"))break;A[i](t)}}},{key:"activate",value:function(e){this._do(e.name,e.options,"activate")}},{key:"deactivate",value:function(e){this._do(e.name,e.options,"deactivate")}},{key:"_verifyAction",value:function(e,t){return e.hasOwnProperty("activate")&&e.hasOwnProperty("deactivate")&&"function"==typeof e.activate&&"function"==typeof e.deactivate?e:(console.error('ActionFactory: The action called "'+t+'" was not really an action because it did not have both the activate and deactivate methods.'),!1)}}])&&M(t.prototype,i),n&&M(t,n),e}();function N(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var S=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._guide=null,this._activeCueIds=[],this._cueIdsToActivate=[],this._cueIdsToDeactivate=[],this._activator=new L,this._tick=0,this.tick=this.tick.bind(this),this._activateCues=this._activateCues.bind(this),this._deactivateCues=this._deactivateCues.bind(this),this._activateAction=this._activateAction.bind(this),this._deactivateAction=this._deactivateAction.bind(this),this.deactivate=this.deactivate.bind(this),this._markCuesToActivateAndDeactivate=this._markCuesToActivateAndDeactivate.bind(this)}var t,i,n;return t=e,(i=[{key:"loadGuide",value:function(e){e instanceof y?(this.deactivate(),this._guide=e,this._tick=0):console.error("The actionprocessor only accepts an instance of the Guide class. Something else was given")}},{key:"deactivate",value:function(){this._cueIdsToActivate=[],this._cueIdsToDeactivate=[],this._activeCueIds.forEach(function(e){this._cueIdsToDeactivate.push(e)}.bind(this)),this._deactivateCues(),this._activeCueIds=[],this._cueIdsToDeactivate=[]}},{key:"tick",value:function(e){this._guide&&(this._tick=e,this._guide.cues.forEach(this._markCuesToActivateAndDeactivate),this._deactivateCues(),this._activateCues())}},{key:"_markCuesToActivateAndDeactivate",value:function(e,t){var i=this._activeCueIds.indexOf(t),n=this._cueIdsToActivate.indexOf(t),a=this._cueIdsToDeactivate.indexOf(t);if(this._tick>=e.start&&this._tick<=e.end){if(-1!==i||-1!==n||-1!==a)return;this._cueIdsToActivate.push(t)}else if(this._tick>e.end||this._tick<e.start){if(-1===i||-1!==a)return;this._cueIdsToDeactivate.push(t)}}},{key:"_activateCues",value:function(){for(var e;"number"==typeof(e=this._cueIdsToActivate.pop());)this._guide.cues[e].actions.forEach(this._activateAction),this._activeCueIds.push(e)}},{key:"_deactivateCues",value:function(){for(var e;"number"==typeof(e=this._cueIdsToDeactivate.pop());)this._guide.cues[e].actions.forEach(this._deactivateAction),this._activeCueIds.splice(this._activeCueIds.indexOf(e),1)}},{key:"_activateAction",value:function(e){this._activator.activate(e)}},{key:"_deactivateAction",value:function(e){this._activator.deactivate(e)}}])&&N(t.prototype,i),n&&N(t,n),e}();function E(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var H=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,i,n;return t=e,(i=[{key:"get",value:function(e){var t=document.cookie.match("(^|;) ?"+e+"=([^;]*)(;|$)");return t?t[2]:null}},{key:"set",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=new Date;i?n.setTime(n.getTime()+864e5*i):n=new Date(864e13),document.cookie=e+"="+t+";path=/;expires="+n.toGMTString()}},{key:"delete",value:function(e){this.set(e,"",-1)}}])&&E(t.prototype,i),n&&E(t,n),e}();function D(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}i.d(t,"default",(function(){return j}));var j=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._dataRetriever=new u,this._config=new l(t),this._audioPlayer=new r,this._actionProcessor=new S,this._cookies=new H,this._guideDataAttributeName="forest-guide",this._camelCasedGuideDataAttributeName="forestGuide",this._presenceNotificationCookieName="presence_notification_closed",this._guideButtons=null,this._guideButtonClicked=this._guideButtonClicked.bind(this),this._startOrStopGuidance=this._startOrStopGuidance.bind(this),this._initializeGuideButtons(),this._addListenersToPresenceNotifications(),this._initializePresenceNotificationClasses()}var t,i,n;return t=e,(i=[{key:"_initializeGuideButtons",value:function(){var e="[data-"+this._guideDataAttributeName+"]";this._guideButtons=document.querySelectorAll(e),this._guideButtons.forEach(function(e){e.addEventListener("click",this._guideButtonClicked)}.bind(this))}},{key:"_guideButtonClicked",value:function(e){var t=e.target;e.preventDefault(),!this._guideDataAttributeName in t.dataset&&console.error('Could process a click on a ForestGuide guide button since it did not contain the data attribute "data-'+this._guideDataAttributeName+'" anymore.');var i=t.dataset[this._camelCasedGuideDataAttributeName];this._dataRetriever.get(this._config.rootUrl+i+".json").then(function(e){var n={};try{n=JSON.parse(e)}catch(e){return void console.error('ForestGuide: The json as denoted in the guide "'+i+'" was invalid. '+e.message)}var a=y.fromJson(n);this._startOrStopGuidance(a,t)}.bind(this)).catch((function(e){console.error('ForestGuide: Could not retrieve guide "'+i+'" because of an error: '+e)}))}},{key:"_startOrStopGuidance",value:function(e,t){this._actionProcessor.loadGuide(e),!1===this._audioPlayer.isPlaying()?(this._audioPlayer.onLoading(function(e){e.classList.add(this._config.loadingClass),e.classList.remove(this._config.playingClass)}.bind(this),[t]).onPlay(function(e){e.classList.remove(this._config.loadingClass),e.classList.add(this._config.playingClass)}.bind(this),[t]).onPause(function(e){e.classList.remove(this._config.loadingClass),e.classList.remove(this._config.playingClass),this._actionProcessor.deactivate()}.bind(this),[t]).onPlayProgress(function(){this._actionProcessor.tick(this._audioPlayer.getCurrentTime())}.bind(this),[t]).onFinish(function(e){e.classList.remove(this._config.loadingClass),e.classList.remove(this._config.playingClass),this._actionProcessor.deactivate(),this._audioPlayer.clearCallbacks()}.bind(this),[t]).onStopped(function(e){e.classList.remove(this._config.loadingClass),e.classList.remove(this._config.playingClass)}.bind(this),[t]),this._audioPlayer.load(this._config.rootUrl+e.soundFile),this._audioPlayer.play()):(this._audioPlayer.stop(),this._actionProcessor.deactivate(),this._audioPlayer.clearCallbacks())}},{key:"_addListenersToPresenceNotifications",value:function(){var e=this;document.querySelectorAll(this._config.presenceNotificationSelector).forEach((function(t){var i=t.querySelector(e._config.presenceNotificationCloseButtonSelector);i&&i.addEventListener("click",(function(){""!==e._config.presenceNotificationCloseClassToAdd&&t.classList.add(e._config.presenceNotificationCloseClassToAdd),""===e._config.presenceNotificationCloseClassToRemove&&t.parentElement?t.parentElement.removeChild(t):t.classList.remove(e._config.presenceNotificationCloseClassToRemove),e._cookies.set(e._presenceNotificationCookieName,1,null)}))}))}},{key:"_initializePresenceNotificationClasses",value:function(){var e=this,t=document.querySelectorAll(this._config.presenceNotificationSelector);this._cookies.get(this._presenceNotificationCookieName)||t.forEach((function(t){""!==e._config.presenceNotificationClassToAdd&&t.classList.add(e._config.presenceNotificationClassToAdd),""!==e._config.presenceNotificationClassToRemove&&t.classList.remove(e._config.presenceNotificationClassToRemove)}))}}])&&D(t.prototype,i),n&&D(t,n),e}();window.ForestGuide=j}]);