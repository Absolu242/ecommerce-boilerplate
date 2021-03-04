import ACTIONS from "./Actions"

const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.NOTIFY:
      return {
        ...state,
        notify: action.paylod,
      }
    case ACTIONS.AUTH:
      return {
        ...state,
        auth: action.paylod,
      }

    default:
      return state
  }
}

export default reducers
