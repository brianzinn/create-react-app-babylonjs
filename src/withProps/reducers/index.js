export const toggleLights = (full) => ({
  type: 'TOGGLE_LIGHTS',
  full
});

export const toggleRotation = (clockwise) => ({
  type: 'TOGGLE_ROTATION',
  clockwise
});

const initialState = {
  clockwise: true,
  lightsDim: false
};

const withPropsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_ROTATION':
      return {
        ...state,
        clockwise: action.clockwise
      }
    case 'TOGGLE_LIGHTS':
      return {
        ...state,
        lightsDim: !action.full
      }
    default: // never
      return state
  }
}
  
export default withPropsReducer;