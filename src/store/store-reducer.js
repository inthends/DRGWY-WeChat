const initialState = {
    openid: null,
    imgurl: null,
    id: null,
    mobile: "",
    name: null,
    nickName: "",
    scores: null,
    token: null,
    rooms: null,
    customerId: null,
    defaultUnitId: null,
    defaultUnitName: null,
};

const loggedUserReducer = (state = initialState, action) => {
    if (action.type === 'LOGIN') {
        return {
            ...state,
            openid: action.info.openid,
            imgurl: action.info.imgurl
        };
    }
    if (action.type === 'LOGIN2') {
        console.log(action.info)
        return {
            ...state,
            openid: action.info.member.openId,
            imgurl: action.info.member.headImgUrl,
            id: action.info.member.id,
            mobile: action.info.member.mobile,
            name: action.info.member.name,
            nickName: action.info.member.nickName,
            scores: action.info.member.scores,
            customerId: action.info.member.customerId,
            defaultUnitId: action.info.member.defaultUnitId,
            token: action.info.token,
            defaultUnitName: action.info.defaultUnitName,
        };
    }
    if (action.type === 'LOSE') {
        return {
            ...state,
            openid: '',
            imgurl: '',
            id: '',
            mobile: '',
            name: '',
            nickName: '',
            scores: '',
            customerId: '',
            defaultUnitId: '',
            token: '',
            defaultUnitName: ''
        };
    }

    if (action.type === 'ROOM') {
        return {
            ...state,
            rooms: action.info,
        };
    }
    return state;
};

export default loggedUserReducer;
