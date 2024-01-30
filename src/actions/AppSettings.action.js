/**
 * Created by charnjeetelectrovese@gmail.com on 5/1/2020.
 */
import {serviceGetAppSettings, serviceUpdateGeoFence,serviceUpdatePolicies,} from "../services/AppSettings.service";
import EventEmitter from "../libs/Events.utils";

export const APP_SETTINGS_INIT = 'APP_SETTINGS_INIT';
export const APP_SETTINGS_DONE = 'APP_SETTINGS_DONE';
export const APP_SETTINGS_UPDATE_GEOFENCE = 'APP_SETTINGS_UPDATE_GEOFENCE';
export const APP_SETTINGS_CHANGE_THEME = 'APP_SETTINGS_CHANGE_THEME';
export const APP_SETTINGS_UPDATE_POLICIES = 'APP_SETTINGS_UPDATE_POLICIES';

export function actionGetAppSettings(data) {
    const req = serviceGetAppSettings({});
    return (dispatch) => {
        dispatch({ type: APP_SETTINGS_INIT, payload: {} });
        req.then((data) => {
            if (!data.error) {
                const tempData = data.data;
                dispatch({ type: APP_SETTINGS_DONE, payload: tempData });
            }
        });
    };
    // return ({type: AUTH_USER, payload: data});
}


export function actionUpdateGeoFence(data) {
    const request = serviceUpdateGeoFence({ polygon: data } )
    return (dispatch) => {
        dispatch({ type: APP_SETTINGS_UPDATE_GEOFENCE, payload: data })
    }
}

export function actionChangeTheme(theme) {
    return (dispatch) => {
        localStorage.setItem('theme', theme);
        dispatch({type: APP_SETTINGS_CHANGE_THEME, payload: theme});
    }
}

export function actionUpdatePolicies(name, value) {
    const request = serviceUpdatePolicies({ name, value } ).then((res) => {
        EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Saved Successfully', type: 'success'});
    });
    return (dispatch) => {
        dispatch({ type: APP_SETTINGS_UPDATE_POLICIES, payload: {name, value} })
    }
}
