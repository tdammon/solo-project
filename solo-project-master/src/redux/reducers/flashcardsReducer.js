const flashcards = (state = {}, action) => {
    switch (action.type) {
      case 'MAKE_FLASHCARD':
      console.log(action.payload)
        return action.payload;
      default:
        return state;
    }
  };


  export default flashcards;