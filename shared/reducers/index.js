import { combineReducers } from 'redux';

export default function (initialState) {
  function currentUser(currentUser=initialState.currentUser, action) {
    switch (action.type) {
      default:
        return currentUser;
    }
  }

  return combineReducers({
    currentUser
  });
}
