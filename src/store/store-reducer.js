const initialState = {
    openid: null,
    imgurl: null,
    id: null,
    mobile: "",
    name: null,
    nickName: "",
    scores: null,
    token: null
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
        return {
            ...state,
            openid: action.info.member.openId,
            imgurl: action.info.member.headImgUrl,
            id: action.info.member.id,
            mobile: action.info.member.mobile,
            name: action.info.member.name,
            nickName: action.info.member.nickName,
            scores: action.info.member.scores,
            token: action.info.token,
        };
    }
    return state;
};

export default loggedUserReducer;
