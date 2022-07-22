const initialState = {
  type: 'arcgis-topographic'
}

const TypeMapActiveReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGER_TYPE_MAP_ACTIVE': {
      const listType = action
      return { ...state, type: listType.mapActive }
    }

    default: {
      return state
    }
  }
}
export default TypeMapActiveReducer
