import { SET_USER } from '../actions/ActionType'

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});
