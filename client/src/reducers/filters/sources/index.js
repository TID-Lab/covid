const initState = [];

export default function sourcesReducer(state = initState, action) {
    switch (action.type) {
        case 'sources/added':
            return [
                ...state,
                action.payload
            ]
        case 'sources/removed':
            const index = state.indexOf(action.payload);
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ]
        default:
            return state
    }
}