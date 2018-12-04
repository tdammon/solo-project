//This reducer holds the response from the API request
const api = (state = [], action) => {
    switch (action.type) {
      case 'SET_API':
      console.log('api_payload', action.payload)
        return action.payload;
      default:
        return state;
    }
  };


  export default api;