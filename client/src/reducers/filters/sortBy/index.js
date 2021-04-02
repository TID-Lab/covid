const initState = 'engagement';

export default function sortByReducer(state = initState, action) {
    switch (action.type) {
        case 'sortBy/set':
            return action.payload
        default:
            return state
    }
}