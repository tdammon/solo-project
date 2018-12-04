//This reducer holds a users settings
const settingsReducer = (state = {}, action) => {
    switch (action.type) {
      case 'DISPLAY_SETTINGS':
      console.log('payload', action.payload)
      if(action.payload == undefined){
        return {}
      } else {
        return action.payload;
      }
      default:
        return state;
    }
  };


  export default settingsReducer;