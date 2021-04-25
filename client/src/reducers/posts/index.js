const initState = [];

export default function postsReducer(state = initState, action) {
    switch (action.type) {
        case 'posts/set':
            return action.payload
        default:
            return state
    }
}