const initialState = {
    user:{}
  }
  const UserReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CHANGE_USER': {
        const user = action.user
        return {
          ...state,
          user: user
        }
      }
      
      default: {
        return state
      }
    }
  }
  export default UserReducer