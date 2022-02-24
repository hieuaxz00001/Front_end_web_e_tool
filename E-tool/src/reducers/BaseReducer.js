const initialState = {
  visibleFormKhaoSat: false,
  idFormKhaoSat: null
}
const BaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_VISIBLE_FORM_KHAOSAT': {
      return { ...state, visibleFormKhaoSat: action.visibleFormKhaoSat }
    }
    case 'CHANGE_ID_FORM_KHAOSAT': {
      return { ...state, idFormKhaoSat: action.idFormKhaoSat }
    }

    default: {
      return state
    }
  }
}
export default BaseReducer
