const flashcards = (state = [], action) => {
    switch (action.type) {
      case 'MAKE_FLASHCARD':
      console.log(action.payload)
        return action.payload;
      case 'UPDATE_FLASHCARD_ARRAY':
        return ({
          ...state.slice(1,state.length)
        })
      default:
        return state;
    }
  };


  export default flashcards;