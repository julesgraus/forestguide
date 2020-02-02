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
        this._tick = 0; //Holds the current tick (seconds into a guide).

        this.tick = this.tick.bind(this);
        this._activateCues = this._activateCues.bind(this);
        this._deactivateCues = this._deactivateCues.bind(this);
        this._activateAction = this._activateAction.bind(this);
        this._deactivateAction = this._deactivateAction.bind(this);
        this.deactivate = this.deactivate.bind(this);
        this._markCuesToActivateAndDeactivate = this._markCuesToActivateAndDeactivate.bind(this);
    }

    /**
     * Load a guide to play the actions for
     *
     * @param {GuideModel} guide
     */
    loadGuide(guide) {
        if(!(guide instanceof GuideModel)) {
            console.error('The actionprocessor only accepts an instance of the Guide class. Something else was given');
            return;
        }

        this._guide = guide;
        this._tick = 0;
    }

    /**
     * Deactivate all cues and their actions
     */
    deactivate()
    {
        this._cueIdsToActivate = [];
        this._cueIdsToDeactivate = [];
        this._activeCueIds.forEach(function(cue) {
            this._cueIdsToDeactivate.push(cue)
        }.bind(this));
        this._deactivateCues();
        this._activeCueIds = [];
        this._cueIdsToDeactivate = [];
    }

    /**
     * Check if one of the guides actions should be executed or stopped,
     * depending on how the guide is configured in combination with the given current
     * time in seconds.
     *
     * @param {number} seconds
     */
    tick(seconds) {
        if(!this._guide) return;
        this._tick = seconds;
        
        this._guide.cues.forEach(this._markCuesToActivateAndDeactivate);

        this._deactivateCues();
        this._activateCues();
    }
    
    /**
     * Puts cues that need to be activated in the _cuesToActivate array.
     * And the ones that need to be deactivated in the _cuesToDeactivate array
     * 
     * @param {CueModel} cue
     * @param {number} index
     */
    _markCuesToActivateAndDeactivate(cue, index) {
        let activeCuesIdIndex = this._activeCueIds.indexOf(index);
        let cuesToActivateIdIndex = this._cueIdsToActivate.indexOf(index);
        let cuesToDeactivateIdIndex = this._cueIdsToDeactivate.indexOf(index);

        if(this._tick >= cue.start && this._tick <= cue.end ) {
            if(activeCuesIdIndex !== -1 || cuesToActivateIdIndex !== -1 || cuesToDeactivateIdIndex !== -1) return; //Only mark to be activated when the cue was not active, to be activated or deactivated
            this._cueIdsToActivate.push(index);
        } else if((this._tick > cue.end || this._tick < cue.start)) {
            if (activeCuesIdIndex === -1 || cuesToDeactivateIdIndex !== -1) return; //Only mark the cue to be deactivated when it is active or is not marked as
            //Cue is active and outside of the start and end time of the cue.
            this._cueIdsToDeactivate.push(index);
        }
    }

    /**
     * Activates cues that need to be activated
     * @private
     */
    _activateCues() {
        let cueId;
        while(typeof (cueId = this._cueIdsToActivate.pop()) === "number")
        {
            let cue = this._guide.cues[cueId];
            cue.actions.forEach(this._activateAction);

            //Add the cue to the _activeCueIds
            this._activeCueIds.push(cueId);
        }
    }

    /**
     * Deactivates cues that need to be deactivated
     * @private
     */
    _deactivateCues() {
        let cueId;
        while(typeof (cueId = this._cueIdsToDeactivate.pop()) === "number")
        {
            let cue = this._guide.cues[cueId];
            cue.actions.forEach(this._deactivateAction);

            //Remove the cue id from the _activeCueIds
            this._activeCueIds.splice(this._activeCueIds.indexOf(cueId), 1);
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