// The reducer for the image to be posted in popup menu on the screen right now.

const initState = false;

export default function postingImageReducer(state = initState, action) {
    switch (action.type) {
        case 'postingImage/set':
            return action.payload;
        default:
            return state;
    }
}