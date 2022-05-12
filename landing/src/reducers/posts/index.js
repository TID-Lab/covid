// The reducer for the social media posts that are on the dashboard right now.

const initState = [];

export default function postsReducer(state = initState, action) {
    switch (action.type) {
        case 'posts/set':
            return [
                ...action.payload,
            ];
        default:
            return state;
    }
}