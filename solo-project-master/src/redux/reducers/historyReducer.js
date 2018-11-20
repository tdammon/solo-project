const flashcardHistory = (state = {}, action) => {
    switch (action.type) {
      case 'DISPLAY_HISTORY':
      console.log('history payload', action.payload)
        return action.payload;
      default:
        return state;
    }
  };


  export default flashcardHistory;