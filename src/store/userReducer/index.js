import { SET_USER } from '../actions/ActionType';

const initialState = {
  userInfo: ''
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {...state, userInfo: action.payload};
    default:
      return state;
      break;
  }
}


export default Reducer;
