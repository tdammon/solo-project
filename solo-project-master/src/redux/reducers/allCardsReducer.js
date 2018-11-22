const allcards = (state = [], action) => {
    switch (action.type) {
      case 'SET_All_CARDS':
      console.log('all cards', action.payload)
        return action.payload;
      default:
        return state;
    }
  };


  export default allcards;