const initState = {
    to: '',
    from: '',
}

export default function datesReducer(state = initState, action) {
    switch (action.type) {
        case 'dates/fromSet':
            return {
                ...state,
                from: action.payload
            }
        case 'dates/toSet':
            return {
                ...state,
                to: action.payload
            }
        default:
            return state
    }
}