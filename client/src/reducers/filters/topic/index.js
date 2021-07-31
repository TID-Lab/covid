// The reducer for the COVID-19 topics radio buttons

const initState = 'all';

export default function topicReducer(state = initState, action) {
    switch (action.type) {
        case 'topic/set':
            return action.payload
        default:
            return state
    }
}