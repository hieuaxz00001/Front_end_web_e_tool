import { combineReducers } from 'redux'
import TypeMapActiveReducer from './TypeMapActiveReducer'
import BaseMapReducer from './BaseMapReducer'
import TypeMapReducer from './TypeMapReducer'
import UserReducer from './UserReducer'
import ListDiaDiemReDucer from './ListDiaDiemReducer'
import BaseReducer from './BaseReducer'
const RootReducer = combineReducers({
  baseMap: BaseMapReducer,
  user: UserReducer,
  typeMap: TypeMapReducer,
  mapActive: TypeMapActiveReducer,
  listDiaDiem: ListDiaDiemReDucer,
  baseApp: BaseReducer
})
export default RootReducer
