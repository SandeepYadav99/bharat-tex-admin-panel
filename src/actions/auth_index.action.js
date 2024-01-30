/* eslint-disable indent,linebreak-style,max-len */
/**
 * Created by charnjeetelectrovese@gmail.com on 9/20/2017.
 */
import { browserHistory } from 'react-router';
import { setAuthorizationToken } from '../libs/set_auth_token.utils';
import history from '../libs/history.utils';
import {serviceGetProfile} from "../services/index.services";
import RouteName from "../routes/Route.name";


export const AUTH_USER = 'AUTH_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_PROFILE = 'SET_PROFILE';
export const GET_PROFILE_INIT = 'GET_PROFILE_INIT';


export function actionLoginUser(data, isKeepLogin = null) {
    return (dispatch) => {
        if (data) {
            // const token = data.tokens.access.token;
            localStorage.setItem('jwt_token',  data.token);
            localStorage.setItem('user', JSON.stringify(data));
            // if (isKeepLogin !== null) {
            //     localStorage.setItem('keep_login', JSON.stringify(isKeepLogin));
            //     sessionStorage.setItem('keep_login', true);
            // }
            setAuthorizationToken(data.token);
            dispatch({ type: AUTH_USER, payload: { ...data, token: data.token,  } });
            // dispatch(actionGetProfile());
            if (data?.should_reset_password) {
                history.push(`/`);
                // history.push(RouteName.RESET_PASSWORD_FIRST);
            } else {
                history.push(`/`);
            }
        }
    };
    // return ({type: AUTH_USER, payload: data});
}

export function actionLogoutUser() {
    return (dispatch) => {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user');
        setAuthorizationToken(false);
        dispatch({ type: LOGOUT_USER });
        history.push(`/login`);
        // browserHistory.push(`${process.env.PUBLIC_URL}/login`);
    };
}


export function actionGetProfile() {
    const request = serviceGetProfile();
    return (dispatch) => {
        dispatch({ type: GET_PROFILE_INIT, payload: null });
        request.then((data) => {
            console.log(data)
            if (!data.error) {
                dispatch({ type: SET_PROFILE, payload: data.data })
            }
        })
    }
}
