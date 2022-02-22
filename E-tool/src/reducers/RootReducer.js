import { combineReducers } from "redux";
import TypeMapActiveReducer from "./TypeMapActiveReducer";
import BaseMapReducer from "./BaseMapReducer";
import TypeMapReducer from "./TypeMapReducer";
import UserReducer from "./UserReducer";
const RootReducer = combineReducers({
    baseMap: BaseMapReducer,
    user: UserReducer,
    typeMap: TypeMapReducer,
    mapActive:TypeMapActiveReducer
})
export default RootReducer; 