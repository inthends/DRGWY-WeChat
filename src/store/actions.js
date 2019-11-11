import store from './store';

export function saveLogin(info) {
    return {type: 'LOGIN', info: info};
}

export function saveLogin2(info) {
    return {type: 'LOGIN2', info: info};
}

export function saveAppid(info) {
    return {type: 'APPID', info: info};
}

export function loseLogin() {
    return {type: 'LOSE', info: ''};
}

export function rooms(info) {
    return {type: 'ROOM', info: info};
}

export function getOpenid() {
    return store.getState().loggedUserReducer.openid;
}

export function getImgurl() {
    return store.getState().loggedUserReducer.imgurl;
}

export function getToken() {
    return store.getState().loggedUserReducer.token;
}

export function loggedUserReducer() {
    return store.getState().loggedUserReducer;
}

