const initState = 'all';

export default function location(state = initState, action) {
    const { payload } = action;
    switch (action.type) {
        case 'accounts/location/set':
            return payload
        default:
            return state
    }
}