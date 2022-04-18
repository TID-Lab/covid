// The reducer for the popup component on the screen right now.

const initState = false;

export default function postingMenuReducer(state = initState, action) {
    switch (action.type) {
        case 'postingMenu/set':
            return action.payload;
        default:
            return state;
    }
}