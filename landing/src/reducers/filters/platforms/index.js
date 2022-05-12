// The reducer for the platforms checklist

const initState = [
    'facebook',
    'instagram',
    'twitter'
];

export default function platformsReducer(state = [...initState], action) {
    switch (action.type) {
        case 'platforms/added':
            return [
                ...state,
                action.payload
            ]
        case 'platforms/removed':
            const index = state.indexOf(action.payload);
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ]
        default:
            return state
    }
}