const flashcards = (state = [], action) => {
    switch (action.type) {
      case 'SET_FLASHCARD':
      console.log(action.payload)
        return action.payload;
      case 'UPDATE_FLASHCARD_ARRAY':
      if(state.length > 1){
        return state.slice(1,state.length)
      } else {
        return [{native_word:'Wooh complete!', translation: 'You are awesome!'}]
      }
      default:
        return state;
    }
  };


  export default flashcards;