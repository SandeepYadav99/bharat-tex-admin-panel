/**
 * Created by charnjeetelectrovese@gmail.com on 4/30/2020.
 */
import {DASHBOARD_INIT, DASHBOARD_DONE, DASHBOARD_ADMIN_TILES_DONE, DASHBOARD_ADMIN_TILES_INIT} from "../actions/Dashboard.action";

const initialState = {
    error: false,
    is_calling: true,
    isTilesLoading: false,
    tiles: {
        employees: 0,
        locations: 0,
        totalInterviews: 0,
    }
};

export default function (state = JSON.parse(JSON.stringify(initialState)), action) {
    switch (action.type) {
        case DASHBOARD_INIT: {
            return {...state, is_calling: true };
        }
        case DASHBOARD_DONE: {
            return {
                ...state,
                ...action.payload,
                is_calling: false
            }
        }
        case DASHBOARD_ADMIN_TILES_INIT: {
            return {
                ...state,
                isTilesLoading: true,
            }
        }
        case DASHBOARD_ADMIN_TILES_DONE: {
            return {
                ...state,
                isTilesLoading: false,
                tiles: {
                    ...state.tiles,
                    ...action.payload,
                }
            }
        }
        default: {
            return state;
        }
    }
    return state;
}
