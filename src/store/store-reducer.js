const initialState = {
    jwt: null,
};

const loggedUserReducer = (state = initialState, action) => {
    if (action.type === 'CLEAR') {
        return {
            jwt: state.jwt,
        };
    }
    return state;
};

export default loggedUserReducer;
