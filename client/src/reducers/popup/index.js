// The reducer for the popup component on the screen right now.

const initState = null;

export default function popupReducer(state = initState, action) {
    switch (action.type) {
        case 'popup/set':
            return action.payload;
        default:
            return state;
    }
}