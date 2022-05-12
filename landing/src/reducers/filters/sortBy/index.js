// The reducer for the "sort by" select dropdown

const initState = 'recent';

export default function sortByReducer(state = initState, action) {
    switch (action.type) {
        case 'sortBy/set':
            return action.payload
        default:
            return state
    }
}