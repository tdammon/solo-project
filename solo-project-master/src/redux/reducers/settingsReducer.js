const settingsReducer = (state = {}, action) => {
    switch (action.type) {
      case 'DISPLAY_SETTINGS':
      console.log('payload', action.payload)
        return action.payload;
      default:
        return state;
    }
  };


  export default settingsReducer;