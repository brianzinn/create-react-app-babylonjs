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

const sample = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_ROTATION':
      console.log('toggle rotation', action);
      return {
        ...state,
        clockwise: action.clockwise
      }
    case 'TOGGLE_LIGHTS':
      console.log('toggle lights:', action);
      return {
        ...state,
        lightsDim: !action.full
      }
    default:
      return state
  }
}
  
export default sample;