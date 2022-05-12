// The reducer for the text to be posted in the popup on the screen right now.

const initState = false;

export default function postingTextReducer(state = initState, action) {
    switch (action.type) {
        case 'postingText/set':
            return action.payload;
        default:
            return state;
    }
}