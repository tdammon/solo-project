//This reducer holds a list of mastered flashcards
const masteredCards = (state = {}, action) => {
    switch (action.type) {
      case 'SET_MASTERED':
      console.log('payload', action.payload)
        return action.payload;
      default:
        return state;
    }
  };


  export default masteredCards;