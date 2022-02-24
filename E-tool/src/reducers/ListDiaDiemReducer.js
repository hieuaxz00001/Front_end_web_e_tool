const initialState = {
  listDiaDiem: { idNhom: '', tenNhom: '', active: false, list: [] }
}
const ListDiaDiemReDucer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_LIST_DIA_DIEM': {
      const newList = action
      return {...state, listDiaDiem:newList.listDiaDiem}
    }

    default: {
      return state
    }
  }
}
export default ListDiaDiemReDucer
