// The reducer for the curated vs. all-posts toggle

const initState = true;

export default function curatedOnlyReducer(state = initState, action) {
    switch (action.type) {
        case 'accounts/curatedOnly/set':
            return action.payload
        default:
            return state
    }
}