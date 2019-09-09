const initialState = {
    openid: null,
};

const loggedUserReducer = (state = initialState, action) => {
    if (action.type === 'CLEAR') {
        return {
            openid: state.openid,
        };
    }
    return state;
};

export default loggedUserReducer;
