const sample = (state = {}, action) => {
    switch (action.type) {
      case 'SAMPLE_1':
        return {
          ...state,
          x: 'sample_1'
        }
      default:
        return state
    }
  }
  
  export default sample