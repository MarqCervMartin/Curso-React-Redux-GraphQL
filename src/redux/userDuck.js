import {loginWithGoogle, signOutGoogle} from '../firebase';
import {retreiveFavs} from './charDuck';

//constants
let initialData = {
    loggedIn: false,
    fetching: false,
}
let LOGIN = "LOGIN";
let LOGIN_SUCCESS = "LOGIN_SUCCESS";
let LOGIN_ERROR = "LOGIN_ERROR";

let LOG_OUT = "LOG_OUT";

//reducer
export default function reducer(state = initialData, action) {
    switch(action.type) {
        case LOG_OUT:
            return {...initialData}
        case LOGIN_SUCCESS:
            return {...state, ...action.payload, fetching: false, loggedIn: true}
        case LOGIN_ERROR:
            return {...state, error: action.payload, fetching: false}
        case LOGIN:
            return {...state, fetching: true}
        default:
            return state;
    }
};

//aux
function saveStorage(storage){
    localStorage.storage = JSON.stringify(storage);
};

// action (action creator)

export let logAuthAction = () => (dispatch, getState) => {
    signOutGoogle();
    dispatch({
        type: LOG_OUT,
    });
    localStorage.removeItem('storage');
};

export let restoreSessionAction = () => dispatch => {
    let storage = localStorage.getItem('storage');
    storage = JSON.parse(storage);
    if(storage && storage.user){
        dispatch({
            type: LOGIN_SUCCESS,
            payload: storage.user
        })
    }
};

export let doGoogleLoginAction = () => (dispatch, getSate) => {
    dispatch({
        type: LOGIN
    });

    return loginWithGoogle()
        .then(user => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {...user}
            });
            saveStorage(getSate());
            retreiveFavs()(dispatch, getSate);
         })
        .catch( e => {
            console.log(e);
            dispatch({
                type: LOGIN_ERROR,
                payload: e.message
            })
        })
};