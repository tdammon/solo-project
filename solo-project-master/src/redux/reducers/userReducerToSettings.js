//This reducer checks if the user logging in has settings stored
const userReducerToSettings = (state = {}, action) => {
    switch (action.type) {
      case 'SET_USER_TO_SETTINGS':
      console.log('hello')
        return action.payload;
      default:
        return state;
    }
  };
  

  export default userReducerToSettings;