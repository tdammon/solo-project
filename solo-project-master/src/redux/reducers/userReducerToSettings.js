const userReducerToSettings = (state = {}, action) => {
    switch (action.type) {
      case 'SET_USER_TO_SETTINGS':
      console.log('hello')
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default userReducerToSettings;