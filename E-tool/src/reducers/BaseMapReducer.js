const initialState = {
  lat: '20.992903563656817',
  lon: '105.82972326668407',
  listPointKhaoSat: [],
  user:{}
}
const BaseMapReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_LOCATION': {
      return state
    }
    case 'CHANGE_LOCATION_PHIEUKHAOSAT': {
      const newList = action.listPointKhaoSat
      return {
        ...state,
        listPointKhaoSat: newList
      }
    }

    default: {
      return state
    }
  }
}
export default BaseMapReducer
