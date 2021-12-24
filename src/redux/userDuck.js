//constants
let initialData = {
    loggedIn: false
}
let LOGIN = "LOGIN";

//reducer
export default function reducer(state = initialData, action) {
    switch(action.type) {
        case LOGIN:
            return {}
        default:
            return state;
    }
}

// action (action creator)