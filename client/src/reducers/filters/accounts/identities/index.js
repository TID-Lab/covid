// The reducer for the account identity radio buttons

const initState = 'all';

export default function identitiesReducer(state = initState, action) {
  switch (action.type) {
        case 'accounts/identities/set':
            return action.payload
      default:
          return state
  }
}