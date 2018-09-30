export const toggleSidebar = () => ({
  type: 'TOGGLE_SIDEBAR'
});

const initialState = {
  showSidebar: true
};

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        showSidebar: !state.showSidebar
      }
    default: // never
      return state
  }
}
  
export default layoutReducer;