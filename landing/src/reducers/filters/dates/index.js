// The reducer for the start & end date filters

function format(date) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const monthDate = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${monthDate}`;
}

const today = new Date();
const weekAgo = new Date();
weekAgo.setDate(today.getDate() - 7);

const initState = {
    to: format(today),
    from: format(weekAgo),
}

export default function datesReducer(state = {...initState}, action) {
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