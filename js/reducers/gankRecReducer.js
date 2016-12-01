import {SWITCH_TAB} from '../actions/types';

export default function switchTab(state = {}, action = {}) {

    switch (action.type) {
        // focus action is dispatched when a new screen comes into focus
        case SWITCH_TAB:
            console.log("46689");
            return {
                ...state,
                curTab: action.payload,
            };

        default:
            return state;
    }
}