//This reducer holds a list of languages
const languages = (state = [], action) => {
    switch (action.type) {
      case 'SET_LANGUAGES':
        return action.payload;
      default:
        return state;
    }
  };

// loginMode will be on the redux state at:
// state.loginMode
  export default languages;