const initialState = 'arcgis-topographic'

const TypeMapActiveReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGER_TYPE_MAP_ACTIVE': {
      const listType = action
      return {
        ...state,
        mapActive: listType
      }
    }

    default: {
      return state
    }
  }
}
export default TypeMapActiveReducer
