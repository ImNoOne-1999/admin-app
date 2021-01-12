const initialState = {
    authError: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            //console.log('Login failed')
            return {
                ...state,
                authError: 'Login failed'
            }
        case 'LOGIN_SUCCESS':
            //console.log('login success')
            return {
                ...state,
                authError: null
            }
        case 'LOGOUT_SUCCESS':
            //console.log('logout success')
            return state;
        default:
            return state;
    }
}

export default authReducer;