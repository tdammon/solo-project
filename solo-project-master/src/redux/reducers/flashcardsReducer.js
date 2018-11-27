const flashcards = (state = [], action) => {
    switch (action.type) {
      case 'SET_FLASHCARD':
      console.log(action.payload)
        return action.payload;
      case 'UPDATE_FLASHCARD_ARRAY':
      console.log('updating flashcards', action.payload)
      if(state.length > 1){
        if(action.payload == 1){
          return state.slice(1,state.length)
        } else {
          let currentCard = state[0]
          return [...state.slice(1,state.length), currentCard]
          
        }  
      } else {
          return [{native_word:'Wooh complete!', translation: 'You are awesome!'}]
        }
      default:
        return state;
    }
  };


  export default flashcards;