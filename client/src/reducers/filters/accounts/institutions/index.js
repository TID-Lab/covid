const initState = 'all';

export default function institutions(state = initState, action) {
    const { payload } = action;
    switch (action.type) {
        case 'accounts/institutions/set':
            return payload
        default:
            return state
    }
}