//Models
import GuideModel from './models/GuideModel';
import ActionModel from './models/ActionModel';

//Other controllers
import Activator from './Activator'

/**
 * @class ActionProcessor
 *
 * The action processor receives a second from the tick method,
 * and scans the guide for cues that need to be activated or deactivated.
 * Then activates or deactivates cues which results in them triggering actions which
 * cause side effects in your browser. For example blink the border on an element.
 *
 * Activation and deactivation takes place by using the Activator class.
 */
export default class ActionProcessor {
    constructor() {
        this._guide = null;
        this._activeCueIds = [];     //Holds the ids of cues wherein the seconds from the tick methods falls in.
        this._cueIdsToActivate = [];   //Holds the ids of cues that needs to be activated
        this._cueIdsToDeactivate = []; //Holds the ids of cues that need to be deactivated
        this._activator = new Activator(); //Knows how to create actions
    }

    /**
     * Load a guide to play the actions for
     *
     * @param {GuideModel} guide
     */
    loadGuide(guide) {
        if(!guide instanceof GuideModel) {
            console.error('The actionprocessor only accepts an instance of the Guide class. Something else was given');
            return;
        }

        this._guide = guide;
    }

    /**
     * Deactivate all cues and their actions
     */
    deactivate()
    {
        self = this;
        this._cueIdsToActivate = [];
        this._cueIdsToDeactivate = [];
        this._activeCueIds.forEach(function(cueId) {
            self._cueIdsToDeactivate.push(cueId);
        });
        this._deactivateCues();
        this._activeCueIds = [];
        this._cueIdsToDeactivate = [];
    }

    /**
     * Check if one of the guides actions should be executed or stopped,
     * depending on what the guide says in combination with the given current
     * time in seconds.
     *
     * @param {number} seconds
     */
    tick(seconds) {
        if(!this._guide) return;
        let self = this;

        //Put cues that need to be activated in the _cuesToActivate array.
        //And the ones that need to be deactivated in the _cuesToDeactivate array
        this._guide.cues.forEach(
            /**
             * @param {CueModel} cue
             * @param {number} index
             */
            function (cue, index) {
                let activeCuesIdIndex = self._activeCueIds.indexOf(index);
                let cuesToActivateIdIndex = self._cueIdsToActivate.indexOf(index);
                let cuesToDeactivateIdIndex = self._cueIdsToDeactivate.indexOf(index);

                if(seconds >= cue.start && seconds <= cue.end ) {
                    if(activeCuesIdIndex !== -1 || cuesToActivateIdIndex !== -1 || cuesToDeactivateIdIndex !== -1) return; //Only mark to be activated when the cue was not active, to be activated or deactivated
                    self._cueIdsToActivate.push(index);
                } else if((seconds > cue.end || seconds < cue.start)) {
                    if(activeCuesIdIndex === -1 || cuesToDeactivateIdIndex !== -1) return; //Only mark the cue to be deactivated when it is active or is not marked as
                    //Cue is active and outside of the start and end time of the cue.
                    self._cueIdsToDeactivate.push(index);
                }
            }
        );

        this._deactivateCues();
        this._activateCues();
    }

    /**
     * Activates cues that need to be activated
     * @private
     */
    _activateCues() {
        let self = this;
        let cueId;
        while(typeof (cueId = this._cueIdsToActivate.pop()) === "number")
        {

            let cue = self._guide.cues[cueId];
            cue.actions.forEach(
                /**
                 * @param {ActionModel} action
                 */
                function (action) {
                    self._activateAction(action);
                }
            );

            //Add the cue to the _activeCueIds
            self._activeCueIds.push(cueId);
        }
    }

    /**
     * Deactivates cues that need to be deactivated
     * @private
     */
    _deactivateCues() {
        let self = this;
        let cueId;
        while(typeof (cueId = this._cueIdsToDeactivate.pop()) === "number")
        {

            let cue = self._guide.cues[cueId];
            cue.actions.forEach(
                /**
                 * @param {ActionModel} action
                 */
                function (action) {
                    self._deactivateAction(action);
                }
            );

            //Remove the cue id from the _activeCueIds
            self._activeCueIds.splice(self._activeCueIds.indexOf(cueId), 1);
        }
    }

    /**
     * @param {ActionModel} action
     * @private
     */
    _activateAction(action) {
        this._activator.activate(action);
    }

    /**
     * @param {ActionModel} action
     * @private
     */
    _deactivateAction(action) {
        this._activator.deactivate(action);
    }
}